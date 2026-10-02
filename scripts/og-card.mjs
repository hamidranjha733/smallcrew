// The share card, as an element tree.
//
// Written with React.createElement rather than JSX so that the generator script
// can import it directly with no build step. It is the only definition of the
// card: nothing in the app draws one, because the images are files on disk by
// the time a page is served.

import { createElement as h } from 'react';

// Straight from app/globals.css. Nothing here is a new colour.
const SIGNAL = '#00857a';
const INK = '#1d2124';
const PAPER = '#ffffff';
const MUTE = '#5f6663';
const RULE = '#dde1df';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

// At 62px bold Archivo about twenty nine characters fit across 1000px, so a
// title needing a fourth line drops a size rather than running into the rule
// at y=506.
const THREE_LINES = 85;

export function ogCard(title) {
  const size = title.length > THREE_LINES ? 54 : 62;

  return h(
    'div',
    {
      style: {
        width: OG_WIDTH,
        height: OG_HEIGHT,
        display: 'flex',
        position: 'relative',
        background: PAPER,
        fontFamily: 'Archivo',
      },
    },
    // Left signal band, full height
    h('div', {
      style: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 18,
        height: OG_HEIGHT,
        background: SIGNAL,
      },
    }),

    // Masthead: brand mark, then wordmark
    h(
      'div',
      {
        style: {
          position: 'absolute',
          left: 72,
          top: 62,
          display: 'flex',
          alignItems: 'center',
        },
      },
      h(
        'div',
        {
          style: {
            width: 44,
            height: 44,
            background: SIGNAL,
            display: 'flex',
            position: 'relative',
          },
        },
        // The L bracket: left and bottom edges only, as .wordmark-mark draws it
        h('div', {
          style: {
            position: 'absolute',
            left: 10,
            top: 10,
            right: 10,
            bottom: 10,
            borderLeft: `6px solid ${INK}`,
            borderBottom: `6px solid ${INK}`,
          },
        }),
      ),
      h(
        'div',
        {
          style: {
            marginLeft: 16,
            fontSize: 30,
            fontWeight: 700,
            color: INK,
            letterSpacing: '-0.01em',
          },
        },
        'Small Crew',
      ),
    ),

    // Title
    h(
      'div',
      {
        style: {
          position: 'absolute',
          left: 72,
          top: 190,
          width: 1000,
          display: 'flex',
          fontSize: size,
          fontWeight: 700,
          color: INK,
          lineHeight: 1.15,
        },
      },
      title,
    ),

    // Hairline rule, x=72 to x=1128
    h('div', {
      style: {
        position: 'absolute',
        left: 72,
        top: 506,
        width: 1056,
        height: 1,
        background: RULE,
      },
    }),

    // Footing
    h(
      'div',
      {
        style: {
          position: 'absolute',
          left: 72,
          top: 536,
          display: 'flex',
          flexDirection: 'column',
        },
      },
      h(
        'div',
        { style: { fontSize: 24, color: MUTE } },
        'Real prices at 1, 3 and 10 staff · Every figure dated',
      ),
      h(
        'div',
        {
          style: {
            marginTop: 8,
            fontSize: 24,
            color: SIGNAL,
            fontFamily: 'IBMPlexMono',
          },
        },
        'smallcrewsoftware.com',
      ),
    ),
  );
}
