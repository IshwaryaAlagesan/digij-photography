const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  first:   { type: String, required: true, trim: true },
  last:    { type: String, required: true, trim: true },
  company: { type: String, default: '' },
  email:   { type: String, default: '' },
  phone:   { type: String, default: '' },
  source:  { type: String, default: '' },
  status:  { type: String, enum: ['New', 'Contacted', 'Qualified', 'Lost'], default: 'New' },
  notes:   { type: String, default: '' },
  created: { type: String, default: () => new Date().toISOString().slice(0, 10) },
  userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

leadSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.userId;
    return ret;
  },
});

module.exports = mongoose.model('Lead', leadSchema);
