require('dotenv').config()

export const {
  APP_PORT = process.env.APP_PORT,
  NODE_ENV = process.env.NODE_ENV,

  MDB_URI = process.env.MDB_URI,
  MDB_USER_REPLACE = process.env.MDB_USER_REPLACE,
  MDB_PASS_REPLACE = process.env.MDB_PASS_REPLACE,
  MDB_USER = process.env.MDB_USER,
  MDB_PASS = process.env.MDB_PASS,

  HASH_SALT = process.env.HASH_SALT
} = process.env

export const IN_PROD = NODE_ENV === 'production'
