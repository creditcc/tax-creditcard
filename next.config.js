/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 配置静态导出
  output: 'export',
  // 可选：配置静态资源基础路径（如果部署到非根目录）
  basePath: process.env.NODE_ENV === 'production' ? '/tax-creditcard' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/tax-creditcard/' : '',
  images: {
    unoptimized: true, // 静态导出需要
  },
  trailingSlash: true,
};

module.exports = nextConfig; 