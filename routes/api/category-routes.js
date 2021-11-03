const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll(
      {include: Product}
    );
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id,
      {include: Product});
    if (!categoryData) {
      res.status(404).json({ message: 'No category with this id...' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    // if (!categoryData) {
    //   res.status(404).json({ message: 'No category with this id...' });
    //   return;
    // }
    res.status(200).json({ message: "Category successfully added...", data: { categoryData } });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const findData = await Category.findByPk(req.params.id);
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    if (!findData) {
      res.status(404).json({ message: 'No category with this id...' });
      return;
    }
    res.status(200).json({message: "Category successfully updated...", Old_data: findData,NewData: req.body});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const findData = await Category.findByPk(req.params.id);
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!findData) {
      res.status(404).json({ message: 'No category with this id...' });
      return;
    }
    res.status(200).json({ message: "Category deleted successfully...", Old_data: findData });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;