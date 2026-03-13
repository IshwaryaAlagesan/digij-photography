const Lead = require('../models/Lead');
module.exports = require('./crud')(Lead, ['first', 'last', 'company', 'email', 'status']);
