const { sign, verify } = require('jsonwebtoken')

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = require('./config')

export function createAccessToken (user) {
  return sign({ id: user.id, email: user.email }, JWT_ACCESS_SECRET, {
    expiresIn: '15m'
  })
}

export function createRefreshToken (user) {
  return sign({ id: user.id, email: user.email }, JWT_REFRESH_SECRET, {
    expiresIn: '7d'
  })
}

export function createTokens (user) {
  const accessToken = createAccessToken(user)
  const refreshToken = createRefreshToken(user)
  return { accessToken, refreshToken }
}

export function verifyAccessToken (token) {
  return verify(token, JWT_ACCESS_SECRET)
}

export function verifyRefreshToken (token) {
  return verify(token, JWT_REFRESH_SECRET)
}
