import { createContentLoader } from 'vitepress';
import { isDev } from '../../.vitepress/config';

export default createContentLoader('src/blog/*.md', {
    transform(rawData) {
        return rawData
            .filter(item => (isDev ? true : !item.frontmatter.wip) && !item.url.endsWith('index.html'))
            .map(item => {
            // console.log(item);
            
            const r = {
                ...item,
                title: item.frontmatter.title + (item.frontmatter.wip && isDev ? ' 🚧' : ''),
                url: item.url.replace(/^\/src/, ''),
            }
            
            return r
        })
    },
})