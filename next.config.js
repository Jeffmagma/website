module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        has: [{type: "host", value: "card.cyan.pink"}],
        destination: "/card"
      }
    ];
  }
}
