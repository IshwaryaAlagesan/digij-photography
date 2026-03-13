const Activity = require('../models/Activity');
module.exports = require('./crud')(Activity, ['subject', 'related', 'type', 'status']);
