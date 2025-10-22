export default defineAppConfig({
  app: {
    author: {
      name: 'JD Solanki',
      avatar: '/images/jd-solanki-avatar.jpeg',
      social: {
        github: 'https://github.com/jd-solanki',
        x: 'https://x.com/me_jd_solanki',
        youtube: 'https://www.youtube.com/@me_jd_solanki',
        linkedin: 'https://www.linkedin.com/in/jd-solanki',
      },
    },
  },
  ui: {
    colors: {
      primary: 'indigo',
      neutral: 'neutral',
    },
    card: {
      slots: {
        root: 'py-4 sm:py-6',
        header: 'py-0!',
        body: 'py-0!',
        footer: 'py-0!',
      },
      variants: {
        variant: {
          outline: {
            root: 'divide-none gap-6 flex flex-col',
          },
        },
      },
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
