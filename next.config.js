module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/",
        has: [{type: "host", value: "card.cyan.pink"}],
        destination: "/card"
      }
    ];
  }
}
