export default defineAppConfig({
  app: {
    social: {
      github: 'https://github.com/jd-solanki/jd-solanki.github.io',
    },
  },
  ui: {
    colors: {
      primary: 'indigo',
      neutral: 'neutral',
    },
    pageHeader: {
      slots: {
        root: 'border-none',
      },
    },
    accordion: {
      slots: {
        root: 'bg-muted border border-(--ui-border-muted) ps-4 pe-4 rounded-lg',
      },
    },
  },
})
