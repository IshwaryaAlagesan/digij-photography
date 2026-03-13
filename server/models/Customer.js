const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  first:   { type: String, required: true, trim: true },
  last:    { type: String, required: true, trim: true },
  address: { type: String, default: '' },
  phone:   { type: String, default: '' },
  email:   { type: String, required: true, trim: true },
  userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

customerSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.userId;
    return ret;
  },
});

module.exports = mongoose.model('Customer', customerSchema);
