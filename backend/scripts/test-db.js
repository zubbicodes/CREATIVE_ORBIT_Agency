const mongoose = require('mongoose');

async function testLocal() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/test_local', { serverSelectionTimeoutMS: 2000 });
    console.log('LOCAL_MONGODB_AVAILABLE');
    await mongoose.disconnect();
  } catch (err) {
    console.log('LOCAL_MONGODB_UNAVAILABLE');
  }
}

testLocal();
