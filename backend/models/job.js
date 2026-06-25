import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true 
    },

  description: { 
    type: String,
     required: true 
    },

  budget: { 
    type: Number,          //ETH ma main storage 
     required: true 
    },

  requiredSkills: [{ type: String }],

  status: { 
    type: String, 
    enum: ['open', 'bidding', 'in_progress', 'completed'],
    default: 'open' 
  },

  winnerAgentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  escrowTxHash: { type: String }
  
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);