const express = require('express');
const Order = require('../db/models/order-schema');
const router = express.Router();

router
  .post('/order', async (req, res) => {
    try {
      const { body } = req;
      const dbResponse = await Order.create(body);

      return res.status(200).json(dbResponse);
    } catch (e) {
      return res.status(500).json({ message: e.message, error: true });
    }
  })
  .delete('/order/:orderId', async (req, res) => {
    try {
      const { orderId } = req.params;
      await Order.findByIdAndDelete(orderId);
      return res.status(200).json({ message: 'Order deleted' });
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ message: e.mesage, error: true });
    }
  }).get("/order",async(req,res)=>{
    try{


        const dbResponse=await Order.find().populate(["bookId","userId"]);;
        res.status(200).json(dbResponse);

    }catch (e) {
      console.log(e.message);
      return res.status(500).json({ message: e.mesage, error: true });
    }
  })

module.exports = router;
