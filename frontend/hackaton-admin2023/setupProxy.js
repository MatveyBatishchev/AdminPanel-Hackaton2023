const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            // 👇️ make sure to update your target
            target: 'http://94.139.255.120',
            changeOrigin: true,
        }),
    );
};
