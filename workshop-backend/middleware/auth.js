const jwt = require('jsonwebtoken')
const User = require('../models/user_models')

const isAuthenticated = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  if (!token) {
    return res
      .status(401)
      .json({ status: 401, message: 'Unauthorized', success: false })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)

    if (!user || !user.approved) {
      throw new Error()
    }

    req.user = user
    next()
  } catch (err) {
    res
      .status(401)
      .json({
        status: 401,
        message: 'Unauthorized or account not approved',
        success: false,
      })
  }
}

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res
      .status(403)
      .json({ status: 403, message: 'Admin only', success: false })
  }
  next()
}

module.exports = { isAuthenticated, isAdmin }
