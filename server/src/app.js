const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const { User } = require('./models')
const {
  createTokens,
  verifyAccessToken,
  verifyRefreshToken
} = require('./auth')

const app = express()

app.disable('x-powered-by')

// BodyParser middleware
app.use(bodyParser.json())
app.use(cookieParser())

app.use(async (req, res, next) => {
  const refreshToken = req.cookies.rid
  const accessToken = req.cookies.aid
  if (!refreshToken && !accessToken) {
    return next()
  }

  try {
    const data = verifyAccessToken(accessToken)
    req.id = data.id
  } catch {}

  if (!refreshToken) {
    return next()
  }

  let data

  try {
    data = verifyRefreshToken(refreshToken)
  } catch {
    return next()
  }

  const user = await User.findOne({ _id: data.id })
  if (!user) {
    // Token invalid
    return next()
  }

  const { accessToken: newAccessToken, refreshToken: newRefreshToken } = createTokens(user)
  res.cookie('aid', newAccessToken)
  res.cookie('rid', newRefreshToken)
  req.id = user.id

  next()
})

module.exports = app
