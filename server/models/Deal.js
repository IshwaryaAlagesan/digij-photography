const mongoose = require('mongoose');

const STAGES = ['New', 'Contacted', 'Proposal', 'Negotiation', 'Won', 'Lost'];

const dealSchema = new mongoose.Schema({
  title:     { type: String, required: true, trim: true },
  value:     { type: Number, default: 0 },
  stage:     { type: String, enum: STAGES, default: 'New' },
  contact:   { type: String, default: '' },
  closeDate: { type: String, default: '' },
  notes:     { type: String, default: '' },
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

dealSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.userId;
    return ret;
  },
});

module.exports = mongoose.model('Deal', dealSchema);
