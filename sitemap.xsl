<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">
    <xsl:output method="html" encoding="UTF-8" indent="yes" />
    <xsl:template match="/">
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>CS Course Atlas XML Sitemap</title>
                <style>
                    * { box-sizing: border-box; }
                    body {
                        margin: 0;
                        min-height: 100vh;
                        font-family: 'Pixelify Sans', 'Silkscreen', 'DotGothic16', monospace;
                        background:
                            radial-gradient(circle at 7% -10%, rgba(37, 99, 235, 0.28), transparent 42%),
                            radial-gradient(circle at 95% -14%, rgba(124, 58, 237, 0.26), transparent 44%),
                            linear-gradient(180deg, #030712 0%, #0f172a 58%, #111827 100%);
                        color: #e2e8f0;
                    }
                    .shell { max-width: 1180px; margin: 0 auto; padding: 0.95rem; }
                    .top {
                        border: 1px solid rgba(165, 180, 252, 0.42);
                        border-radius: 1rem;
                        background: linear-gradient(95deg, #2563eb, #4f46e5, #7c3aed);
                        padding: 0.6rem 0.72rem;
                        margin-bottom: 0.85rem;
                    }
                    .top a {
                        color: #f8fafc;
                        text-decoration: none;
                        border: 1px solid rgba(255, 255, 255, 0.25);
                        border-radius: 999px;
                        padding: 0.38rem 0.62rem;
                        background: rgba(15, 23, 42, 0.45);
                        display: inline-block;
                        margin-right: 0.38rem;
                        margin-bottom: 0.34rem;
                        font-size: 0.8rem;
                    }
                    .hero {
                        border: 1px solid rgba(148, 163, 184, 0.3);
                        border-radius: 1rem;
                        background: rgba(15, 23, 42, 0.84);
                        padding: 0.9rem 0.95rem;
                    }
                    h1 { margin: 0; color: #e0e7ff; line-height: 1.2; font-size: clamp(1.25rem, 3.2vw, 1.9rem); }
                    p { color: #cbd5e1; margin: 0.4rem 0 0; }
                    .table-wrap {
                        margin-top: 0.82rem;
                        border: 1px solid rgba(148, 163, 184, 0.28);
                        border-radius: 0.88rem;
                        overflow: auto;
                        background: rgba(15, 23, 42, 0.72);
                    }
                    a { color: #bfdbfe; }
                    table { width: 100%; min-width: 640px; border-collapse: collapse; }
                    th, td { text-align: left; padding: 0.52rem 0.62rem; border-bottom: 1px solid rgba(148, 163, 184, 0.26); }
                    th { color: #c7d2fe; background: rgba(30, 41, 59, 0.78); position: sticky; top: 0; }
                    td { color: #dbeafe; }
                    @media (max-width: 640px) {
                        .shell { padding: 0.7rem 0.62rem; }
                        .top { padding: 0.54rem 0.56rem; border-radius: 0.88rem; margin-bottom: 0.68rem; }
                        .top a { font-size: 0.74rem; padding: 0.34rem 0.56rem; }
                        .hero { padding: 0.8rem 0.8rem 0.84rem; border-radius: 0.9rem; }
                    }
                </style>
            </head>
            <body>
                <div class="shell">
                    <nav class="top">
                        <a href="/CS-Course-Atlas/index.html">Interactive App</a>
                        <a href="/CS-Course-Atlas/tracks.html">Track Pages</a>
                        <a href="/CS-Course-Atlas/modules/index.html">Module Directory</a>
                        <a href="/CS-Course-Atlas/sitemap.html">HTML Sitemap</a>
                    </nav>
                    <section class="hero">
                        <h1>CS Course Atlas XML Sitemap</h1>
                        <p>Styled XML sitemap view with mobile-friendly scrolling.</p>
                    </section>
                    <div class="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th>URL</th>
                                    <th>Last Modified</th>
                                    <th>Change Frequency</th>
                                    <th>Priority</th>
                                </tr>
                            </thead>
                            <tbody>
                                <xsl:for-each select="s:urlset/s:url">
                                    <tr>
                                        <td><a href="{s:loc}"><xsl:value-of select="s:loc" /></a></td>
                                        <td><xsl:value-of select="s:lastmod" /></td>
                                        <td><xsl:value-of select="s:changefreq" /></td>
                                        <td><xsl:value-of select="s:priority" /></td>
                                    </tr>
                                </xsl:for-each>
                            </tbody>
                        </table>
                    </div>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
