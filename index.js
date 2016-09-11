var readability = require('readability-api')

readability.configure({
  consumer_key: process.env.READABILITY_KEY,
  consumer_secret: process.env.READABILITY_SECRET
})

readability.xauth(
  process.env.READABILITY_USER,
  process.env.READABILITY_PASSWORD,
  function (error, tokens) {
    var page = 0
    var reader = new readability.reader({
      access_token: tokens.oauth_token,
      access_token_secret: tokens.oauth_token_secret
    })
    printPage(1)
    function printPage (page) {
      reader.bookmarks({
        page: page,
        per_page: 50
      }, function (error, bookmarks) {
        if (error) {
          console.error(error)
          process.exit(1)
        } else {
          console.error('Read page ' + page)
          console.log(JSON.stringify(bookmarks))
          var pages = bookmarks.meta.num_pages
          if (page === pages) {
            process.exit(0)
          } else {
            printPage(page + 1)
          }
        }
      })
    }
  }
)

