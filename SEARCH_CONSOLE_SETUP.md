# Google Search Console Setup

1. Open Google Search Console and add this property:
`https://eddyarriaga00.github.io/CS-Course-Atlas/`
2. Choose HTML meta-tag verification.
3. Replace this placeholder content in site pages:
`<meta name="google-site-verification" content="REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_TOKEN">`
4. Deploy.
5. In Search Console, submit:
`https://eddyarriaga00.github.io/CS-Course-Atlas/sitemap.xml`

## Rebuild SEO outputs before each release

Run:

```bash
npm run build:seo
```

This refreshes crawlable route/module pages, `sitemap.xml`, and `robots.txt`.
