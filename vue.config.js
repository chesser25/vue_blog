module.exports = {
    devServer: {
      proxy: {
        "/api/*": {
          target: "http://localhost:70/php_blog",
          secure: false
        }
      }
    }
  };