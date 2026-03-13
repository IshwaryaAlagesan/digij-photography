const auth = require('../middleware/auth');

// Creates a standard CRUD router for a Mongoose model
module.exports = function createCrudRouter(Model, searchFields) {
  const router = require('express').Router();

  // GET /  — list all (filtered by userId, optional ?q= search)
  router.get('/', auth, async (req, res) => {
    try {
      const filter = { userId: req.userId };
      if (req.query.q) {
        const regex = new RegExp(req.query.q, 'i');
        filter.$or = searchFields.map((f) => ({ [f]: regex }));
      }
      const items = await Model.find(filter).sort({ createdAt: -1 });
      res.json(items);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST /  — create
  router.post('/', auth, async (req, res) => {
    try {
      const item = await Model.create({ ...req.body, userId: req.userId });
      res.status(201).json(item);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // PUT /:id  — update
  router.put('/:id', auth, async (req, res) => {
    try {
      const item = await Model.findOneAndUpdate(
        { _id: req.params.id, userId: req.userId },
        req.body,
        { new: true, runValidators: true }
      );
      if (!item) return res.status(404).json({ error: 'Not found' });
      res.json(item);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // DELETE /:id  — delete
  router.delete('/:id', auth, async (req, res) => {
    try {
      const item = await Model.findOneAndDelete({ _id: req.params.id, userId: req.userId });
      if (!item) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'Deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
