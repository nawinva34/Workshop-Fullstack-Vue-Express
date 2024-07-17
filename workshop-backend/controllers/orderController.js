const Order = require('../models/order_models')
const Product = require('../models/product_models')

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('productId', 'name price amount')
    const formattedOrders = orders.map((order) => ({
      orders_ID: order._id,
      quantity: order.quantity,
      productDetail: {
        products_id: order.productId._id,
        name: order.productId.name,
        price: order.productId.price,
        // amount: order.productId.amount,
      },
      createdAt: order.createdAt,
    }))
    res.status(200).json({ status: 200, success: true, data: formattedOrders })
  } catch (err) {
    res.status(500).json({ status: 500, success: false, message: err.message })
  }
}

// Get orders by
exports.getOrdersByProductId = async (req, res) => {
    const productId = req.params.id;
    try {
      const orders = await Order.find({ productId }).populate('productId', 'name price amount');
      if (!orders.length) {
        return res.status(404).json({ status: 404, success: false, message: 'No orders found for this product' });
      }
  
      const formattedOrders = orders.map((order) => ({
        orders_ID: order._id,
        quantity: order.quantity,
        productDetail: {
          products_id: order.productId._id,
          name: order.productId.name,
          price: order.productId.price,
        //   amount: order.productId.amount,
        },
        quantity: order.quantity,
        createdAt: order.createdAt,
      }));
  
      res.status(200).json({
        status: 200,
        success: true,
        data: formattedOrders,
      });
    } catch (err) {
      res.status(500).json({ status: 500, success: false, message: err.message });
    }
  };
  

// Create new order 
exports.createOrder = async (req, res) => {
  const { productId } = req.params
  const { quantity } = req.body

  try {
    const product = await Product.findById(productId)
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' })
    }
    if (quantity > product.amount) {
      return res.status(400).json({
        success: false,
        message: 'Requested quantity exceeds available amount',
      })
    }

    product.amount -= quantity
    // console.log(product)
    await product.save()
    const newOrder = new Order({ productId, quantity })
    console.log("newOrder",newOrder)
    await newOrder.save()
    const updatedProduct = await Product.findById(productId)

    res.status(201).json({
      status: 201,
      success: true,
      message: 'Order created successfully',
      data: {
        updatedProduct: {
          id_orders: newOrder._id,
          name: updatedProduct.name,
          price: updatedProduct.price,
          quantity: newOrder.quantity,
          balance_product: updatedProduct.amount,
        },
      },
    })
  } catch (err) {
    res.status(400).json({ status: 400, success: false, message: err.message })
  }
}
