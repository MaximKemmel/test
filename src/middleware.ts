import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    locales: ['en', 'ru', 'de'],
    defaultLocale: 'ru'
});

export const config = {
    matcher: ['/', '/(ru|en|de)/:path*']
};

