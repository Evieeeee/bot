const KeyvSqlite = require('@keyvhq/sqlite')
const Keyv = require('@keyvhq/core')

const keyv = new Keyv({
  store: new KeyvSqlite('sqlite://path/to/database.sqlite')
})