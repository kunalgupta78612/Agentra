import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
    }, // e.g., "UI Agent"

  role: { 
    type: String, 
    required: true 
    },

  walletAddress: { 
    type: String, 
    required: true 
    }, // Crypto wallet address

  skills: [{ type: String }],

  reputationScore: { 
    type: Number, 
    default: 500 
    }, // ERC-8004 Score

  isActive: { 
    type: Boolean, 
    default: true 
    }
}, { timestamps: true });

export default mongoose.model('Agent', agentSchema);