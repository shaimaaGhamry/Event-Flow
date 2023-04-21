const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");


const userResolvers = {
    Query: {
        users: async () => {
            return await User.find().populate('pendingEvents acceptedEvents ownedEvents tasks');
        },
        user: async (parent, { userId }) => {
            return await User.findOne({ _id: userId }).populate('pendingEvents acceptedEvents ownedEvents tasks');
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return await User.findOne({ _id: context.user._id }).populate('pendingEvents acceptedEvents ownedEvents tasks');
              }
              throw new AuthenticationError('You need to be logged in!');
        }
    },
    Mutation: {
        addUser: async (parent, { userName, email, password }) => {
            try {
                const user = await User.create({ userName, email, password });
                console.log(user);
                const token = signToken(user);
                console.log(token);

                return { token, user };
            } catch (error) {
                console.error(error);
            }

        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('No user with this email found');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect password!');
            }
            const token = signToken(user);
            return { token, user };
        },
    }

};
module.exports = userResolvers;