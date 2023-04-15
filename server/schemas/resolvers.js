      
const eventResolvers = require('./eventResolvers');
const userResolvers = require('./userResolvers');
const taskResolvers = require('./taskResolver');

const resolvers = {
    //     ...userResolvers,
    // ...eventResolvers,
    // ...taskResolvers

    Query:{
            ...userResolvers.Query,
            ...eventResolvers.Query,
            ...taskResolvers.Query
        },
        Mutation:{
            ...userResolvers.Mutation,
            ...eventResolvers.Mutation,
            ...taskResolvers.Mutation
        }
   
};

module.exports = resolvers;
// Query:{
//     ...userResolvers.Query,
//     ...eventResolvers.Query,
//     ...taskResolvers.Query
// },
// Mutation:{
//     ...userResolvers.Mutation,
//     ...eventResolvers.Mutation,
//     ...taskResolvers.Mutation
// }