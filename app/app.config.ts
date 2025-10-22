export default defineAppConfig({
  app: {
    social: {
      github: 'https://github.com/jd-solanki',
      x: 'https://x.com/me_jd_solanki',
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
