function makeSubResourceController(Model, { sortKey = "created_at", sortDir = -1 } = {}) {
  return {
    list: async (req, res) => {
      const filter = {};
      if (req.query.client_id) filter.client_id = req.query.client_id;
      const docs = await Model.find(filter).sort({ [sortKey]: sortDir });
      res.json(docs);
    },
    listForClient: async (req, res) => {
      const docs = await Model.find({ client_id: req.params.clientId }).sort({ [sortKey]: sortDir });
      res.json(docs);
    },
    create: async (req, res) => {
      const payload = { ...req.body };
      if (req.params.clientId) payload.client_id = req.params.clientId;
      const doc = await Model.create(payload);
      res.status(201).json(doc);
    },
    update: async (req, res) => {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!doc) return res.status(404).json({ message: "Not found" });
      res.json(doc);
    },
    remove: async (req, res) => {
      const doc = await Model.findByIdAndDelete(req.params.id);
      if (!doc) return res.status(404).json({ message: "Not found" });
      res.json({ ok: true });
    },
  };
}

module.exports = makeSubResourceController;
