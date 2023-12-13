const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// since these are CRUD, shouldent thye have the api/? They alreay do in the index.
router.get("/:id", (req, res) => {
  Category.findByPk(req.params.id, {
    include: [Product],
  })
    .then((categoryData) => res.status(200).json(categoryData))
    .catch((err) => res.status(500).json(err));
});

router.post("/", (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((categoryData) => res.status(200).json(categoryData))
    .catch((err) => res.status(500).json(err));
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, { where: { id: req.params.id } })
    .then((categoryData) => res.status(200).json(categoryData))
    .catch((err) => res.status(500).json(err));
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({ where: { id: req.params.id } })
    .then((categoryData) => res.status(200).json(categoryData))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
