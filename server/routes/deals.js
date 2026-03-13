const Deal = require('../models/Deal');
const auth = require('../middleware/auth');
const router = require('./crud')(Deal, ['title', 'contact', 'stage']);

// PATCH /:id/stage  — move deal in pipeline
router.patch('/:id/stage', auth, async (req, res) => {
  try {
    const deal = await Deal.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { stage: req.body.stage },
      { new: true, runValidators: true }
    );
    if (!deal) return res.status(404).json({ error: 'Not found' });
    res.json(deal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
