const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// done
router.get("/", async (req, res) => {
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", (req, res) => {
  
  Tag.findByPk(req.params.id, {
    include: [Product],
  })
    .then((tagData) => res.status(200).json(tagData))
    .catch((err) => res.status(500).json(err));
});

router.post("/", (req, res) => {
  Tag.create(req.body)
    .then((tagData) => res.status(200).json(tagData))
    .catch((err) => res.status(500).json(err));
});

router.put("/:id", (req, res) => {
  Tag.update(req.body, { where: { id: req.params.id } })
    .then((tagData) => res.status(200).json(tagData))
    .catch((err) => res.status(500).json(err));
});

router.delete("/:id", (req, res) => {
  Tag.destroy({ where: { id: req.params.id } })
    .then((tagData) => res.status(200).json(tagData))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
