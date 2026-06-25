import express from 'express';
import { ChatOpenAI } from '@langchain/openai';
import Job from '../models/job.js';
import Agent from '../models/Agent.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { task, budget } = req.body;

    // 1. Manager AI (LangChain + OpenAI) initialize karna
    const managerAI = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: "gpt-3.5-turbo", // Ya gpt-4o-mini use kar sakte hain fast response ke liye
      temperature: 0,
    });

    // 2. Manager AI sochega ki task ke liye kaunsi skills chahiye
    const prompt = `You are a Manager AI in a freelancer marketplace.
    The user wants this task done: "${task}".
    Extract 1 or 2 core skills required (e.g., "React", "Copywriting", "UI/UX", "Tailwind").
    Return ONLY a comma-separated list of skills, nothing else.`;

    const aiResponse = await managerAI.invoke(prompt);
    // Skills ko array mein convert kar rahe hain (e.g., ["React", "UI/UX"])
    const requiredSkills = aiResponse.content.split(',').map(s => s.trim());

    // 3. User ke task ko Database mein save karna
    const newJob = new Job({ 
      title: "Task by User", 
      description: task, 
      budget: budget || 0.01, 
      requiredSkills: requiredSkills 
    });
    await newJob.save();

    // 4. Database se un Specialists (Agents) ko dhoondhna jinki skills match karti hain
    const availableAgents = await Agent.find({ skills: { $in: requiredSkills } });

    // 5. Frontend Terminal ke liye live logs generate karna
    const logs = [
      `\n> Task received: "${task}"`,
      `> Manager AI: Analyzing requirements...`,
      `> Manager AI: Required skills identified -> [${requiredSkills.join(', ')}]`,
      `> Manager AI: Found ${availableAgents.length} matching agents in database.`,
      `> Manager AI: Broadcasting job and waiting for bids...`
    ];

    // Response wapas frontend ko bhejna
    res.status(200).json({
      success: true,
      jobId: newJob._id,
      logs: logs,
      agentsFound: availableAgents
    });

  } catch (error) {
    console.error("Orchestration Error:", error);
    res.status(500).json({ success: false, message: "AI Orchestration failed. Check API Key." });
  }
});

export default router;