module.exports = {
  resolve: {
    // react hooks aren't officially supported atm
    // TODO remove alias when react hooks are supported
    alias: {
      "react-dom": "@hot-loader/react-dom"
    }
  }
}
