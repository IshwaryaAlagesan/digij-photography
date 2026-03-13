const Customer = require('../models/Customer');
module.exports = require('./crud')(Customer, ['first', 'last', 'email', 'phone', 'address']);
