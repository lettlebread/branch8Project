exports.e = (controller) => {
  return async (req, res) => {
    try {
      await controller(req, res);
    } catch (e) {
      res.status(500).json({ error: e.toString(), stack: e.stack });
    }
  };
};