const { AuthenticationError } = require('apollo-server-express');
const { User, Event, Task } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    
}

module.exports = resolvers;