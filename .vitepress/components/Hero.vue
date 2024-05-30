<script setup lang="ts">
const projects = [
    {
        img: '',
        emoji: '⚙️',
        title: 'ThemeSelection & PixInvent Tools',
        desc: 'Built with FastAPI and VueJS to provide a seamless experience to our customers',
        link: 'https://tools.themeselection.com/',
    },
    {
        img: '',
        emoji: '🗃️',
        title: 'ResourceRoot',
        desc: 'Collection of handpicked resources for developers and designers built using Django & DRF',
        link: '',
    },
    {
        img: '',
        emoji: '🎨',
        title: 'Theme Generator',
        desc: 'Built with Flask to generate themes with custom configurations',
        link: '',
    },
    {
        img: 'https://cdn.jsdelivr.net/gh/pixinvent/pi-assets/vuexy/admin-template/logo/logo.svg',
        emoji: '',
        title: 'Vuexy Admin',
        desc: 'Best selling VueJS admin template of all time on ThemeForest',
        link: 'https://pixinvent.com/vuexy-vuetify-vuejs-admin-template/',
    },
    {
        img: 'https://cdn.jsdelivr.net/gh/themeselection/ts-assets/materio/logo/logo.svg',
        emoji: '',
        title: 'Materio Admin',
        desc: 'Admin Template with Elegant Material Design available on ThemeSelection',
        link: 'https://themeselection.com/item/materio-vuetify-vuejs-admin-template/',
    },
    {
        img: 'https://cdn.jsdelivr.net/gh/pixinvent/pi-assets/materialize/admin-template/logo/logo.svg',
        emoji: '',
        title: 'Materialize Admin',
        desc: '#1 Material design VueJS admin template available on ThemeForest',
        link: 'https://pixinvent.com/materialize-vuetify-vuejs-admin-template/',
    },
    {
        img: 'https://cdn.jsdelivr.net/gh/themeselection/ts-assets/sneat/logo/logo.svg',
        emoji: '',
        title: 'Sneat Admin',
        desc: 'Most Powerful & Clean Admin Template available on ThemeSelection',
        link: 'https://themeselection.com/item/sneat-vuetify-vuejs-admin-template/',
    },
    {
        img: 'https://anu-vue.netlify.app/logo.svg',
        emoji: '',
        title: 'Anu - VueJS UI Framework',
        desc: 'DX focused utility based Vue component library',
        link: 'https://anu-vue.netlify.app/',
    },
    {
        img: '',
        emoji: '🧛🏻',
        title: 'Dracula theme for slidev',
        desc: 'One the best dark theme meets slidev. Listed on official slidev themes.',
        link: 'https://github.com/jd-solanki/slidev-theme-dracula',
    },
]
</script>


<template>
    <div class="container">
        <section class="hero">
            <!-- Left Col -->
            <div class="details">
                <h1>Hi, I am JD Solanki.</h1>
                <ul>
                    <li>Experienced full-stack developer and team lead, skilled in Python, Vue.js, Cloud Services, and GenAI.</li>
                    <li>Crafting the future of technology with a passion for AI.</li>
                    <li>Open source enthusiast.</li>
                </ul>
            </div>
            <img src="https://github.com/jd-solanki/jd-solanki.github.io/assets/47495003/74bd5e0b-47ec-4e94-aa98-03a14fa4fd71" alt="Hero Image">
        </section>
        <p>As a team lead at CleVision, my main goal is crafting cutting-edge 🚀 full-stack applications and admin templates. With a strong foundation as a full-stack developer, I lead teams in developing comprehensive applications, offering mentorship, and actively contributing to research tasks 🔬. While currently immersed in the world of full stack, I am eagerly craving the exciting challenges of AI development 🤖, ready to explore and innovate ✨.</p>
        <p>In the technical domain, my toolkit encompasses a robust array of Python 🐍 technologies, including expertise in Python, Pydantic, FastAPI, SQLAlchemy, SQLmodel, mypy, pytest, typer, and various other renowned libraries in the web 🕸️ development sphere such as requests, httpx, etc. Delving into the realm of automation 🛰️, I've harnessed the power of Python libraries like scrapy and beautifulsoup. On the frontend 🎨 landscape, I command proficiency in Vue, Nuxt, TypeScript, Vite, Node, and other essential utilities. Notably, I've contributed to the community by developing the open source 🫶 UI library, Anu, and crafting GitHub actions. Eagerly diving into the world of AI 🤖, I'm actively learning and exploring associated libraries to expand my technical repertoire.</p>
        <section class="projects">
            <h2>Carefully Crafted Projects 🫶</h2>
            <div class="card-grid">
                <Component :is="project.link ? 'a' : 'div'" :href="project.link" target="_blank" ref="noreferrer" class="card" v-for="project in projects" :key="project.title">
                        <img :src="project.img" :alt="project.title" v-if="project.img">
                        <span class="emoji" v-else>{{ project.emoji }}</span>
                        <h3>{{ project.title }}</h3>
                        <p class="desc">{{ project.desc }}</p>
                </Component>
            </div>
        </section>
    </div>
</template>

<style scoped lang="scss">
.container {
    max-width: 64rem;
    padding: 2rem 1.5rem;
    margin-inline-end: auto;
    margin-inline-start: auto;
    width: 100%;
    min-width: 20rem;

    font-size: 18px;
    line-height: 1.75;

    @media (min-width: 475px) {
        padding: 2rem;
    }
    @media (min-width: 640px) {
        padding: 3rem;
    }
    @media (min-width: 768px) {
        padding: 5rem 3rem;
    }

    > p {
        margin: 2rem 0;
    }
}
.hero {
    justify-content: space-between;

    margin: 0 auto;
    max-width: 1152px;
    display: flex;
    flex-direction: column-reverse;
    row-gap: 2rem;
    column-gap: 5rem;
    margin-bottom: 5rem;

    @media (min-width: 960px) {
        align-items: center;
        flex-direction: row;
    }

    h1 {
        font-size: 2.25rem;
        font-weight: 600;
        line-height: 1.75;
        // white-space: nowrap;

        @media (min-width: 768px) {
            font-size: 2.75rem;
        }
    }

    img {
        border-radius: 0.5rem;
        width: 100%;
        max-width: 432px;
        height: auto;
    }

    ul {
        font-size: 1.25rem;
        line-height: 1.65;
        list-style: disc;
        padding-inline-start: 1rem;

        li {
            margin-block: 1rem;
            color: hsla(var(--a-base-c), var(--a-text-emphasis-high-opacity));
        }
    }
}

.projects {
    margin: 4rem auto;
    h2 {
        font-size: 2rem;
        line-height: 1.75;
        font-weight: 600;
        margin-bottom: 2rem;
    }
}

.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    grid-gap: 2rem;


    .card {
        display: flex;
        flex-direction: column;
        border: thin solid hsla(var(--a-base-c), var(--a-border-opacity));
        padding: 1.5rem;
        border-radius: 0.5rem;

        .emoji {
            font-size: 28px;
        }

        img {
            width: 42px;
            height: auto;
        }

        h3 {
            font-size: 1.15rem;
            font-weight: 500;
            margin-top: 0.5rem;
            margin-bottom: 0.75rem;
        }

        .desc {
            font-size: 1rem;
        }
    }
}
</style>
