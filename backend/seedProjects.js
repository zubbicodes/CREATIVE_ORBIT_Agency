const mongoose = require('mongoose');
require('dotenv').config();
const Project = require('./models/Project');
const Client = require('./models/Client');

const projects = [
  {
    name: 'Quantum Trading Platform',
    category: 'FinTech',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    description: 'Next-generation cryptocurrency trading platform with quantum-resistant security and AI-powered trading algorithms. Processing over $10M in daily volume with sub-millisecond execution times.',
    results: ['500% ROI Increase', 'Zero Security Breaches', '10M+ Processed Transactions'],
    tags: ['React', 'Web3.js', 'Node.js', 'PostgreSQL'],
    challenge: 'Building real-time trading infrastructure that can handle 100,000 concurrent users while maintaining quantum-level security.',
    link: 'https://quantum-trading.example.com',
    budget: 150000,
    status: 'Completed',
    progress: 100,
    isFeatured: true,
    dueDate: '2024-02-15'
  },
  {
    name: 'Neural Healthcare AI',
    category: 'Health Tech',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80',
    description: 'Revolutionary AI-powered diagnostic platform that analyzes medical imaging with 99.7% accuracy, helping doctors detect diseases earlier than ever before.',
    results: ['99.7% Accuracy Rate', '50% Faster Diagnosis', '200+ Hospital Partners'],
    tags: ['Python', 'TensorFlow', 'React', 'AWS'],
    challenge: 'Training neural networks on millions of medical images while maintaining HIPAA compliance and real-time processing.',
    link: 'https://neural-healthcare.example.com',
    budget: 200000,
    status: 'Completed',
    progress: 100,
    isFeatured: true,
    dueDate: '2024-01-20'
  },
  {
    name: 'Stellar Space Navigation',
    category: 'Aerospace',
    image: 'https://images.unsplash.com/photo-1446776653964-20a1d0b8d276?auto=format&fit=crop&w=1200&q=80',
    description: 'Advanced satellite navigation system for deep space missions, providing real-time trajectory calculations and autonomous course corrections for interplanetary travel.',
    results: ['Mars Mission Ready', '99.999% Reliability', 'NASA Certified'],
    tags: ['C++', 'Rust', 'MATLAB', 'Kubernetes'],
    challenge: 'Developing algorithms that can calculate optimal trajectories through gravitational fields while accounting for real-time space debris.',
    link: 'https://stellar-navigation.example.com',
    budget: 500000,
    status: 'In Progress',
    progress: 85,
    isFeatured: true,
    dueDate: '2024-12-01'
  },
  {
    name: 'EcoSmart City Grid',
    category: 'Smart Infrastructure',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    description: 'Intelligent urban energy management system that optimizes power distribution across entire cities using IoT sensors and predictive analytics, reducing carbon emissions by 40%.',
    results: ['40% Carbon Reduction', '1M+ Citizens Served', 'Smart City Award 2024'],
    tags: ['IoT', 'Python', 'React', 'MongoDB'],
    challenge: 'Creating a scalable IoT network that can monitor and control energy usage for millions of buildings in real-time.',
    link: 'https://ecosmart-grid.example.com',
    budget: 300000,
    status: 'Completed',
    progress: 100,
    isFeatured: true,
    dueDate: '2024-03-10'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create a dummy client
    let client = await Client.findOne({ email: 'hello@nexus.com' });
    if (!client) {
      client = new Client({
        name: 'Nexus Corp',
        company: 'Nexus Industries',
        email: 'hello@nexus.com',
        status: 'Active',
        totalRevenue: 500000
      });
      await client.save();
      console.log('Dummy client created');
    }

    // Clear existing projects if needed (Optional: comment out if you want to keep existing)
    await Project.deleteMany({});
    console.log('Existing projects cleared');

    // Add projects
    for (const projectData of projects) {
      const project = new Project({
        ...projectData,
        client: client._id
      });
      await project.save();
    }

    console.log(`${projects.length} projects seeded successfully!`);
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
