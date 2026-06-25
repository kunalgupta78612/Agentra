import mongoose from 'mongoose';

const bidSchema = new mongoose.Schema({
  jobId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Job', required: true 
},

  agentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Agent', required: true 
},

  proposedPrice: { 
    type: Number, required: true 
    },

  deliveryTime: { 
    type: Number 
    }, // in hours

  coverLetter: { 
    type: String 
    }, // AI generated proposal

  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending' 
  }
}, { timestamps: true });

export default mongoose.model('Bid', bidSchema);