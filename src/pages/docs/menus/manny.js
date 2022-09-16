const menuCfg = [
  {
    label: 'Getting Started',
    to: 'getting-started',
  },
  {
    label: 'Configuration',
    to: 'configuration',
  },
  {
    label: 'Using Animation',
    to: 'using-animation',
  },
  {
    label: 'Adding Controls',
    to: 'adding-controls',
  },
  {
    label: 'Hooks',
    subPath: 'hooks',
    subMenu: [
      {
        label: 'useManny',
        to: 'use-manny',
      },
      {
        label: 'useAnimations',
        to: 'use-animations',
      },
    ],
  },
  {
    label: 'Constants',
    subPath: 'constants',
    subMenu: [
      {
        label: 'MANNY_MODEL',
        to: 'manny-model',
      },
      {
        label: 'MANNY_TEXTURE',
        to: 'manny-texture',
      },
      {
        label: 'CLIPS_HOST',
        to: 'clips-host',
      },
    ],
  },
];

export default menuCfg;
