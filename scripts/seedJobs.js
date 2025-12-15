require('dotenv').config();
const connectDB = require('../src/config/db');
const Job = require('../src/models/Job');

(async () => {
  try {
    // Connect to DB
    const conn = await connectDB();

    // Sample jobs array (at least 3 objects). Fields matched to Job model.
    const sampleJobs = [
      {
        title: 'Cloud Engineer',
        company: 'Nimbus Solutions',
        careerPath: 'Cloud Engineer',
        description: 'Design, deploy and maintain cloud infrastructure using AWS/GCP.',
        requirements: ['AWS/GCP experience', 'Docker', 'Kubernetes'],
        salary: '80000-100000',
        location: 'Remote',
        jobType: 'Full-time',
        applicationLink: 'https://nimbus.example.com/apply',
      },
      {
        title: 'Frontend Developer',
        company: 'Bright UI',
        careerPath: 'Frontend Developer',
        description: 'Build responsive web interfaces with React and modern CSS.',
        requirements: ['React', 'HTML/CSS', 'JavaScript'],
        salary: '60000-80000',
        location: 'New York, NY',
        jobType: 'Full-time',
        applicationLink: 'https://brightui.example.com/careers/frontend',
      },
      {
        title: 'Data Analyst',
        company: 'Insight Analytics',
        careerPath: 'Data Analyst',
        description: 'Analyze datasets and produce actionable insights using SQL and Python.',
        requirements: ['SQL', 'Python', 'Data Visualization'],
        salary: '55000-75000',
        location: 'Austin, TX',
        jobType: 'Contract',
        applicationLink: 'https://insight.example.com/jobs/data-analyst',
      },
    ];

    // Insert many
    const result = await Job.insertMany(sampleJobs);
    console.log(`Inserted ${result.length} jobs successfully.`);

    // Close connection
    await conn.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
})();
