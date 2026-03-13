const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  type:    { type: String, enum: ['Call', 'Email', 'Meeting', 'Task', 'Note'], default: 'Task' },
  related: { type: String, default: '' },
  date:    { type: String, default: '' },
  subject: { type: String, required: true, trim: true },
  notes:   { type: String, default: '' },
  status:  { type: String, default: 'Open' },
  userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

activitySchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.userId;
    return ret;
  },
});

module.exports = mongoose.model('Activity', activitySchema);
