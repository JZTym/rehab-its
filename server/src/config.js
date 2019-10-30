require('dotenv').config()

export const {
  APP_PORT = process.env.APP_PORT,
  NODE_ENV = process.env.NODE_ENV,

  MDB_URI = process.env.MDB_URI,
  MDB_USER_REPLACE = process.env.MDB_USER_REPLACE,
  MDB_PASS_REPLACE = process.env.MDB_PASS_REPLACE,
  MDB_USER = process.env.MDB_USER,
  MDB_PASS = process.env.MDB_PASS,

  HASH_SALT_CYCLES = process.env.HASH_SALT_CYCLES,
  JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET
} = process.env

export const IN_PROD = NODE_ENV === 'production'
