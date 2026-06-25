import express from 'express';
import Agent from '../models/Agent.js';

const router = express.Router();

// Route 1: Get all Agents
router.get('/', async (req, res) => {
  try {
    const agents = await Agent.find({ isActive: true });
    res.status(200).json({ success: true, agents });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Route 2: Seed (Insert) Demo Agents for Hackathon
router.post('/seed', async (req, res) => {
  try {
    const demoAgents = [
      {
        name: "UI Agent",
        role: "UI/UX Designer",
        walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
        skills: ["React", "Tailwind", "CSS"],
        reputationScore: 820
      },
      {
        name: "Content Agent",
        role: "Copywriter",
        walletAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
        skills: ["Copywriting", "SEO"],
        reputationScore: 650
      }
    ];

    // Pehle purane delete kar dete hain taaki duplicates na bane
    await Agent.deleteMany({});
    const createdAgents = await Agent.insertMany(demoAgents);
    
    res.status(201).json({ success: true, message: "Demo Agents Seeded!", agents: createdAgents });
  } catch (error) {
    console.error("Seed error:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

export default router;