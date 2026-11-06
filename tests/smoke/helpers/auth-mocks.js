'use strict';

function buildSessionPayload({ authenticated = false } = {}) {
    if (!authenticated) {
        return {
            authenticated: false,
            user: null
        };
    }

    return {
        authenticated: true,
        csrfToken: 'test-csrf-token',
        sessionToken: 'test-session-token',
        provider: 'google',
        user: {
            id: 'user-test-001',
            username: 'Eddy',
            email: 'eddy@example.com',
            avatarUrl: 'https://example.com/avatar.png',
            socialHandle: 'eddydev',
            socialStatus: 'Locked in',
            messagingEnabled: true,
            goal: 'interview'
        }
    };
}

async function mockAuthAndProfileApi(page, { authenticated = false } = {}) {
    await page.route('**/api/**', async (route) => {
        const request = route.request();
        const url = new URL(request.url());
        const pathname = url.pathname;
        const method = request.method().toUpperCase();

        if (pathname.endsWith('/api/auth/session')) {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(buildSessionPayload({ authenticated }))
            });
            return;
        }

        if (pathname.endsWith('/api/auth/oauth/providers')) {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    providers: [
                        { key: 'google', label: 'Google', enabled: true },
                        { key: 'github', label: 'GitHub', enabled: true }
                    ]
                })
            });
            return;
        }

        if (pathname.endsWith('/api/profile') && method === 'GET') {
            await route.fulfill({
                status: authenticated ? 200 : 401,
                contentType: 'application/json',
                body: JSON.stringify(
                    authenticated
                        ? {
                            user: {
                                username: 'Eddy',
                                email: 'eddy@example.com',
                                goal: 'interview',
                                avatarUrl: 'https://example.com/avatar.png',
                                socialHandle: 'eddydev',
                                socialStatus: 'Locked in',
                                messagingEnabled: true
                            }
                        }
                        : { error: 'Not authenticated' }
                )
            });
            return;
        }

        if (pathname.endsWith('/api/user-state')) {
            await route.fulfill({
                status: authenticated ? 200 : 401,
                contentType: 'application/json',
                body: JSON.stringify(
                    authenticated
                        ? {
                            state: {
                                completedModules: [],
                                studyTimeMinutes: 0
                            }
                        }
                        : { error: 'Not authenticated' }
                )
            });
            return;
        }

        if (pathname.endsWith('/api/auth/oauth/google') || pathname.endsWith('/api/auth/oauth/github')) {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ authorizationUrl: 'https://example.com/oauth-start' })
            });
            return;
        }

        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: '{}'
        });
    });
}

module.exports = {
    mockAuthAndProfileApi
};

