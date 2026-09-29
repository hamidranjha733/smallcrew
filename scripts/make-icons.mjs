// Generates the site icons from the brand mark, with no dependencies.
//
//   node scripts/make-icons.mjs
//
// The mark is the one in .wordmark-mark in app/globals.css: a --signal square
// carrying an --ink L bracket, drawn by a ::after box that is inset from the
// edge and keeps only its left and bottom borders. The proportions below are
// taken from that rule rather than chosen here, so the icon and the masthead
// mark stay the same shape if the rule changes.
//
// Rerunning this overwrites app/favicon.ico, app/icon.svg, app/apple-icon.png
// and public/icon-512.png. Nothing else reads it, and the build does not run
// it, because the icons are committed.

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

// .wordmark-mark: 1.15rem square, ::after inset 3px with a 2px border.
// 1.15rem is 18.4px at the 16px root, which is where these ratios come from.
const MARK_PX = 18.4;
const INSET_RATIO = 3 / MARK_PX;
const BORDER_RATIO = 2 / MARK_PX;

const SIGNAL = [0x00, 0x85, 0x7a];
const INK = [0x1d, 0x21, 0x24];

// Every edge is axis aligned, but the inset and border rarely land on whole
// pixels at small sizes, so each pixel is sampled on a grid and averaged.
const SAMPLES = 4;

function isInk(x, y, size) {
  const inset = size * INSET_RATIO;
  const border = size * BORDER_RATIO;
  const near = inset;
  const far = size - inset;

  if (x < near || x >= far || y < near || y >= far) return false;
  const inLeftBorder = x < near + border;
  const inBottomBorder = y >= far - border;
  return inLeftBorder || inBottomBorder;
}

/** RGB pixel data, row major, for a square icon of the given size. */
function render(size) {
  const px = Buffer.alloc(size * size * 3);
  const step = 1 / SAMPLES;
  const offset = step / 2;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let ink = 0;
      for (let sy = 0; sy < SAMPLES; sy++) {
        for (let sx = 0; sx < SAMPLES; sx++) {
          if (isInk(x + offset + sx * step, y + offset + sy * step, size)) ink++;
        }
      }
      const t = ink / (SAMPLES * SAMPLES);
      const i = (y * size + x) * 3;
      for (let c = 0; c < 3; c++) {
        px[i + c] = Math.round(SIGNAL[c] * (1 - t) + INK[c] * t);
      }
    }
  }

  return px;
}

// ---------- PNG ----------

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (const byte of buf) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function png(size, rgb) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // truecolour, no alpha
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  // One filter byte per scanline, filter type 0. These images are flat colour,
  // so a smarter filter would save almost nothing.
  const stride = size * 3;
  const raw = Buffer.alloc(size * (stride + 1));
  for (let y = 0; y < size; y++) {
    raw[y * (stride + 1)] = 0;
    rgb.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

// ---------- ICO ----------

// Each entry is a bottom up 32 bit DIB rather than an embedded PNG. Both are
// legal, and the DIB form is the one every reader accepts.
function dib(size, rgb) {
  const header = Buffer.alloc(40);
  header.writeUInt32LE(40, 0);
  header.writeInt32LE(size, 4);
  header.writeInt32LE(size * 2, 8); // XOR bitmap plus AND mask
  header.writeUInt16LE(1, 12);
  header.writeUInt16LE(32, 14);
  header.writeUInt32LE(0, 16); // BI_RGB

  const xor = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) {
    const src = size - 1 - y; // DIB rows run bottom to top
    for (let x = 0; x < size; x++) {
      const s = (src * size + x) * 3;
      const d = (y * size + x) * 4;
      xor[d] = rgb[s + 2];
      xor[d + 1] = rgb[s + 1];
      xor[d + 2] = rgb[s];
      xor[d + 3] = 0xff;
    }
  }

  // Fully opaque, so the mask is all zeroes. Rows pad to four bytes.
  const maskStride = Math.ceil(size / 8 / 4) * 4;
  const mask = Buffer.alloc(maskStride * size);

  return Buffer.concat([header, xor, mask]);
}

// Sizes are listed largest first on purpose. Readers index the directory
// rather than relying on its order, but Next takes the sizes attribute it
// writes into <link rel="icon"> from the first entry alone. Ascending order
// makes it advertise 16x16 for a file that also holds 32 and 48.
function ico(sizes) {
  const images = sizes.map((size) => dib(size, render(size)));

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2); // icon
  header.writeUInt16LE(sizes.length, 4);

  const entries = Buffer.alloc(16 * sizes.length);
  let offset = 6 + 16 * sizes.length;

  sizes.forEach((size, i) => {
    const at = i * 16;
    entries[at] = size === 256 ? 0 : size;
    entries[at + 1] = size === 256 ? 0 : size;
    entries[at + 2] = 0; // palette
    entries[at + 3] = 0;
    entries.writeUInt16LE(1, at + 4); // planes
    entries.writeUInt16LE(32, at + 6); // bits per pixel
    entries.writeUInt32LE(images[i].length, at + 8);
    entries.writeUInt32LE(offset, at + 12);
    offset += images[i].length;
  });

  return Buffer.concat([header, entries, ...images]);
}

// ---------- SVG ----------

function svg() {
  // Stated as percentages so the shape is resolution independent and matches
  // the ratios the raster sizes are built from.
  const inset = (INSET_RATIO * 100).toFixed(4);
  const border = (BORDER_RATIO * 100).toFixed(4);
  const span = (100 - INSET_RATIO * 200).toFixed(4);
  const bottom = (100 - INSET_RATIO * 100 - BORDER_RATIO * 100).toFixed(4);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="Small Crew">
  <title>Small Crew</title>
  <rect width="100" height="100" fill="#00857a"/>
  <rect x="${inset}" y="${inset}" width="${border}" height="${span}" fill="#1d2124"/>
  <rect x="${inset}" y="${bottom}" width="${span}" height="${border}" fill="#1d2124"/>
</svg>
`;
}

// ---------- write ----------

const targets = [
  ['app/favicon.ico', ico([48, 32, 16])],
  ['app/icon.svg', Buffer.from(svg(), 'utf8')],
  ['app/apple-icon.png', png(180, render(180))],
  ['public/icon-512.png', png(512, render(512))],
];

for (const [file, data] of targets) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, data);
  console.log(`${file.padEnd(24)} ${String(data.length).padStart(7)} bytes`);
}
