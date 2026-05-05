const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Admin = require('../models/Admin');

dotenv.config({ path: path.join(__dirname, '../.env') });

const updatePermissions = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');

    const result = await Admin.updateMany(
      {}, 
      { 
        $addToSet: { 
          permissions: { $each: ['testimonials', 'packages'] } 
        } 
      }
    );
    
    console.log(`Updated ${result.modifiedCount} admin users with new permissions.`);
    process.exit();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

updatePermissions();
