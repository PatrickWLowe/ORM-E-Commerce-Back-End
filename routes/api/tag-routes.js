const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
        as: "tag_products",
      },
    ],
  })
    .then((TagData) => {
      res.status(200).json(TagData);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/:id", (req, res) => {
  Tag.findByPk(req.params.id, {
    include: [
      {
        model: Product,
        through: ProductTag,
        as: "tag_products",
      },
    ],
  })

    .then((TagData) => {
      if (!TagData) {
        res.status(404).json({ message: "Not Found" });
        return;
      }
      res.status(200).json(TagData);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/", (req, res) => {
  Tag.create(req.body)
    .then((TagData) => {
      res.status(200).json(TagData);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
  Tag.update(req.body, {
    where: { id: req.params.id },
  })

    .then((TagData) => {
      if (!TagData) {
        res.status(404).json({ message: "Not Found" });
        return;
      }
      res.status(200).json(TagData);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Tag.destroy({
    where: { id: req.params.id },
  })

    .then((TagData) => {
      if (!TagData) {
        res.status(404).json({ message: "Not Found" });
        return;
      }
      res.status(200).json(TagData);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
