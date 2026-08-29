// Shared visual language for the app: a StarCraft 2 style command-console UI —
// dark armoured panels, cyan holographic edges and amber unit plaques.

export const colors = {
  // Backdrop
  void: '#04101f',
  deep: '#061627',

  // Panel bodies
  panel: 'rgba(9, 28, 50, 0.88)',
  panelSolid: '#0a1f38',
  panelRaised: 'rgba(18, 48, 79, 0.92)',
  panelSunken: 'rgba(3, 12, 24, 0.75)',

  // Holographic edges and glows
  edge: '#2b7fb8',
  edgeBright: '#59c8f5',
  glow: 'rgba(35, 150, 220, 0.45)',
  glowStrong: 'rgba(89, 200, 245, 0.75)',

  // Amber / gold plating used on unit plaques and headers
  amber: '#f0b429',
  amberDeep: '#8a5108',
  amberMid: '#c07d10',

  // Text
  text: '#cfe6f5',
  textDim: '#7fa3bd',
  textBright: '#eaf6ff',

  // Semantics
  attack: '#ff5a4a',
  health: '#3fe07a',
  mineral: '#5ab6f2',
  gas: '#3fbf5a',
  danger: '#ff4d3d',
}

export const fonts = {
  display: "'Orbitron', 'PT Mono', monospace",
  body: "'Rajdhani', 'PT Mono', Arial, sans-serif",
}

// Angled corner cut, the signature shape of SC2's console frames.
export const cutCorners = (size = 10) => `
  clip-path: polygon(
    ${size}px 0,
    100% 0,
    100% calc(100% - ${size}px),
    calc(100% - ${size}px) 100%,
    0 100%,
    0 ${size}px
  );
`

// An armoured panel: dark plating, lit top edge, cool glow spilling outwards.
export const panel = `
  background: linear-gradient(160deg, ${colors.panelRaised}, ${colors.panel});
  border: 1px solid ${colors.edge};
  box-shadow: 0 0 18px ${colors.glow}, inset 0 1px 0 rgba(120, 200, 255, 0.28),
    inset 0 0 30px rgba(0, 0, 0, 0.45);
`

// Recessed well for content sitting inside a panel.
export const inset = `
  background: ${colors.panelSunken};
  border: 1px solid rgba(43, 127, 184, 0.4);
  box-shadow: inset 0 2px 12px rgba(0, 0, 0, 0.6);
`

// HUD corner brackets drawn with pseudo elements.
export const brackets = (size = 14) => `
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    border: 2px solid ${colors.edgeBright};
    opacity: 0.8;
    pointer-events: none;
  }
  &::before {
    top: -1px;
    left: -1px;
    border-right: none;
    border-bottom: none;
  }
  &::after {
    right: -1px;
    bottom: -1px;
    border-left: none;
    border-top: none;
  }
`

export const glowText = `
  text-shadow: 0 0 8px ${colors.glowStrong}, 0 1px 2px rgba(0, 0, 0, 0.9);
`

// Console button: cut corners, cool outline, charges up on hover.
export const button = `
  font-family: ${fonts.display};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${colors.textBright};
  background: linear-gradient(180deg, rgba(24, 66, 105, 0.9), rgba(7, 24, 43, 0.9));
  border: 1px solid ${colors.edge};
  cursor: pointer;
  outline: none;
  transition: background 0.15s, box-shadow 0.15s, color 0.15s;
  ${cutCorners(8)}

  &:hover {
    background: linear-gradient(180deg, rgba(41, 110, 168, 0.95), rgba(12, 40, 70, 0.95));
    box-shadow: 0 0 14px ${colors.glow};
    color: #ffffff;
  }
`
