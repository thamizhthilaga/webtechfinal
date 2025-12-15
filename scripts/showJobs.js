require('dotenv').config();
const connectDB = require('../src/config/db');
const Job = require('../src/models/Job');

(async () => {
  try {
    const conn = await connectDB();
    const jobs = await Job.find().lean().limit(50);
    console.log(`Found ${jobs.length} jobs:`);
    jobs.forEach((j, i) => {
      console.log(`\n--- Job #${i + 1} ---`);
      console.log(`Title: ${j.title}`);
      console.log(`Company: ${j.company}`);
      console.log(`Location: ${j.location}`);
      console.log(`Description: ${j.description.substring(0, 200)}${j.description.length > 200 ? '...' : ''}`);
    });
    await conn.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    process.exit(1);
  }
})();
