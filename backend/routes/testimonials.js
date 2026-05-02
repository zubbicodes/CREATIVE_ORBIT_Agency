const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const auth = require('../middleware/auth');

// @route   POST api/testimonials
// @desc    Submit a testimonial (Public)
// @access  Public
router.post('/', async (req, res) => {
  const { name, jobtitle, company, text, rating, image } = req.body;

  try {
    const newTestimonial = new Testimonial({
      name,
      jobtitle,
      company,
      text,
      rating,
      image
    });

    const testimonial = await newTestimonial.save();
    res.json(testimonial);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/testimonials/approved
// @desc    Get all approved testimonials
// @access  Public
router.get('/approved', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ status: 'Approved' }).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/testimonials
// @desc    Get all testimonials (Admin)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/testimonials/:id
// @desc    Update testimonial status (Admin)
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { status } = req.body;

  try {
    let testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });

    testimonial.status = status;
    await testimonial.save();

    res.json(testimonial);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/testimonials/:id
// @desc    Delete a testimonial
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });

    await testimonial.deleteOne();
    res.json({ message: 'Testimonial removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
