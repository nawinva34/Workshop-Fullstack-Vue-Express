const User = require('../models/user_models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  const { username, password, role } = req.body
  try {
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Username already exists',
      })
    }

    const user = new User({ username, password, role })
    await user.save()
    res.status(201).json({
      status: 201,
      success: true,
      message: 'registered successfully',
      data: [user],
    })
  } catch (err) {
    res.status(400).json({ status: 400, success: false, message: err.message })
  }
}

exports.login = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid')
    }
    if (!user.approved) {
      throw new Error('Account not approved')
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })
    res.status(200).json({
      status: 200,
      success: true,
      message: 'Login successful',
      data: [user],
      token,
    })
  } catch (err) {
    res.status(401).json({ status: 401, success: false, message: err.message })
  }
}

exports.approveUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      throw new Error('User not found')
    }

    user.approved = true
    await user.save()
    res.status(200).json({
      status: 200,
      success: true,
      message: 'User approved successfully',
      data: [user],
    })
  } catch (err) {
    res.status(400).json({ status: 400, success: false, message: err.message })
  }
}
