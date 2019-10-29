const mongoose = require('mongoose')

const app = require('./app')
const {
  APP_PORT,
  MDB_URI,
  MDB_USER_REPLACE, MDB_PASS_REPLACE,
  MDB_USER, MDB_PASS
} = require('./config')

async function main () {
  // Get MongoDB URI
  var uri = MDB_URI
  uri = uri.replace(MDB_USER_REPLACE, MDB_USER)
  uri = uri.replace(MDB_PASS_REPLACE, MDB_PASS)

  try {
    await mongoose.connect(
      uri,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )

    const port = APP_PORT || 4000

    app.listen(port, () =>
      console.log(`Server is running on port: ${port}`)
    )
  } catch (err) {
    console.log(err)
  }
}

main()
  .catch((err) => console.log(err))
