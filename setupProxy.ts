import { createProxyMiddleware } from 'http-proxy-middleware';
import { Application } from 'express';

const setupProxy = (app: Application) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://localhost:5001',
      changeOrigin: true,
      secure: false,
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:5173',
      },
    })
  );
};

export default setupProxy;
