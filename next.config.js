/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:["images.puma.com","static.nike.com","assets.adidas.com","localhost"]
  }
}

module.exports = nextConfig
