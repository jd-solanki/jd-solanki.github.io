---
title: SEO - My Findings
description: A summary of my findings and best practices for SEO.
date: 2025-11-19
---

## Best Practices

- Do note include your admin & sign in protected pages in your sitemap.xml & disallow them in robots.txt
- Handle canonical URLs properly to avoid duplicate content issues
- Use descriptive and keyword-rich title tags and meta descriptions
- Optimize images with alt text and appropriate file names
- Ensure your website is mobile-friendly and responsive
- Improve page load speed by optimizing images, leveraging browser caching, and minimizing code
- Use header tags (H1, H2, H3) to structure your content effectively
- Don't include URLs which are redirected to your sitemap.xml
- Add `noindex` (meta robots or `X-Robots-Tag`) on auth-related pages
- Do not rely on `robots.txt` alone for de-indexing (it can block crawling but not guaranteed indexing)
- Optionally use `nofollow` on internal auth links if you want lower bot priority

## Auth Pages & Indexing

Use `noindex` for sign-in, sign-up, and password-recovery pages in most cases.

- These pages are usually thin/duplicate and can hurt search quality if indexed.
- They can hijack branded queries (showing a login page instead of useful content).
- Keep crawl focus on valuable public pages.

Exception: If your product is login-first (web app), indexing the main login page can be acceptable, but keep sign-up/reset pages as `noindex`.

Reference: <https://developers.google.com/search/docs/crawling-indexing/block-indexing>

## Checklist

- [ ] Title & Description Meta Tags
- [ ] Favicon/Icon
- [ ] `/sitemap.xml`
- [ ] `/robots.txt`
- [ ] OGImage
- [ ] OG Tags
- [ ] Schema.org (if applicable)
- [ ] Submit your site to search engines
  - [ ] Google Search Console
  - [ ] Yandex
  - [ ] Bing
