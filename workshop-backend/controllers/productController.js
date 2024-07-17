const Product = require('../models/product_models');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the directory exists
const imagePath = path.join(__dirname, '../public/images');
if (!fs.existsSync(imagePath)) {
  fs.mkdirSync(imagePath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagePath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage });

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      status: 200,
      success: true,
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      success: false,
      message: err.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: 'Product not found',
      });
    }
    res.status(200).json({
      status: 200,
      success: true,
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      success: false,
      message: err.message,
    });
  }
};

exports.createProduct = [
  upload.single('img'),
  async (req, res) => {
    try {
      const { name, description, price, amount } = req.body;
      if (!req.file) {
        throw new Error('Image is required');
      }
      const img = req.file.filename;
      const product = new Product({ name, description, price, amount, img });
      await product.save();
      res.status(201).json({
        status: 201,
        success: true,
        data: product,
      });
    } catch (err) {
      res.status(400).json({
        status: 400,
        success: false,
        message: err.message,
      });
    }
  }
];

exports.updateProduct = [
  upload.single('img'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, price, amount } = req.body;
      const img = req.file ? req.file.filename : undefined;
      const updateData = { name, description, price, amount };
      if (img) updateData.img = img;
      const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
      res.status(200).json({
        status: 200,
        success: true,
        data: updatedProduct,
      });
    } catch (err) {
      res.status(400).json({
        status: 400,
        success: false,
        message: err.message,
      });
    }
  }
];

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      status: 200,
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      success: false,
      message: err.message,
    });
  }
};
