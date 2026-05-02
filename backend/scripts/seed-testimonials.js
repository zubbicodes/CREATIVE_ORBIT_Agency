const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Testimonial = require('../models/Testimonial');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

const testimonials = [
  {
    name: "Alex Rivera",
    jobtitle: "CTO at Nexus Fintech",
    company: "Nexus",
    text: "CREATIVE ORBIT delivered our platform with sub-millisecond precision. Their architectural depth and design finesse are truly world-class.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=alex",
    status: "Approved"
  },
  {
    name: "Sophia Chen",
    jobtitle: "Founder",
    company: "Lumina Fashion",
    text: "The AR shopping experience they built for us boosted our conversion rates by 25%. They are not just developers; they are visionaries.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=sophia",
    status: "Approved"
  },
  {
    name: "Marcus Thorne",
    jobtitle: "Product Head",
    company: "HealthSync",
    text: "Integrating complex medical data into a clean, intuitive interface seemed impossible until we met this team. Exceptional work.",
    rating: 4,
    image: "https://i.pravatar.cc/150?u=marcus",
    status: "Approved"
  },
  {
    name: "Isabella Vane",
    jobtitle: "Creative Lead",
    company: "StyleCloud",
    text: "Their motion graphics and brand identity work gave us a competitive edge we didn't know we were missing. Highly recommended.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=isabella",
    status: "Approved"
  }
];

const seedTestimonials = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for testimonial seeding...');

    await Testimonial.deleteMany({});
    console.log('Cleared existing testimonials.');

    await Testimonial.insertMany(testimonials);
    console.log('Successfully seeded testimonials!');

    process.exit();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

seedTestimonials();
