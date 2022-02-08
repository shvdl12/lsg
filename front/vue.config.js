
const path = require("path");

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  outputDir: path.resolve(__dirname, "../public"),
  devServer: {
    proxy: 'http://localhost:3000'
  }
}
