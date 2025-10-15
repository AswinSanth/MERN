const express = require('express');
const Comment = require('../db/models/commet-schema');
const router = express.Router();

router.get('/comment', async (req, res) => {
  try {
    const dbResponse = await Comment.find();
    return res.status(200).json(dbResponse);
  } catch (e) {
    return res.status(500).json({ message: e.message, error: true });
  }
});
router.post('/comment', async (req, res) => {
  try {
    const { body } = req;
    const dbResponse = await Comment.create(body);

    return res.status(200).json(dbResponse);
  } catch (e) {
    return res.status(500).json({ message: e.message, error: true });
  }
});

module.exports = router;
