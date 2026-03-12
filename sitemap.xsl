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
                        background: linear-gradient(180deg, #020617 0%, #0f172a 60%, #111827 100%);
                        color: #e2e8f0;
                    }
                    .shell { max-width: 1200px; margin: 0 auto; padding: 1rem; }
                    .hero {
                        border: 1px solid rgba(148, 163, 184, 0.35);
                        border-radius: 1rem;
                        background: rgba(15, 23, 42, 0.8);
                        padding: 1rem;
                    }
                    h1 { margin: 0; color: #e0e7ff; }
                    p { color: #cbd5e1; }
                    a { color: #93c5fd; }
                    table { width: 100%; border-collapse: collapse; margin-top: 0.9rem; }
                    th, td { text-align: left; padding: 0.55rem 0.65rem; border-bottom: 1px solid rgba(148, 163, 184, 0.32); }
                    th { color: #c7d2fe; }
                </style>
            </head>
            <body>
                <div class="shell">
                    <section class="hero">
                        <h1>CS Course Atlas XML Sitemap</h1>
                        <p>Styled XML view for sitemap inspection.</p>
                    </section>
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
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
