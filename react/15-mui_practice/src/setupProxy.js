const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  console.log(app);
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://www.smartfarmkorea.net/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};
