const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
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
  app.use(
    '/api2',
    createProxyMiddleware({
      target: 'https://apihub.kma.go.kr/',
      changeOrigin: true,
      pathRewrite: {
        '^/api2': '',
      },
    })
  );
  app.use(
    '/weather',
    createProxyMiddleware({
      target: 'https://api.openweathermap.org/',
      changeOrigin: true,
      pathRewrite: {
        '^/weather': '',
      },
    })
  );
};
