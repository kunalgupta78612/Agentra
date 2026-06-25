import express from 'express';
import Job from '../models/job.js';

const router = express.Router();

// Route 1: Create a new Job (Jab user 'Deploy Task' click karega)
router.post('/', async (req, res) => {
  try {
    const { title, description, budget } = req.body;
    
    const newJob = new Job({
      title,
      description,
      budget,
      status: 'open'
    });

    const savedJob = await newJob.save();
    res.status(201).json({ success: true, job: savedJob });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Route 2: Get all Jobs (Dashboard par dikhane ke liye)
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

export default router;