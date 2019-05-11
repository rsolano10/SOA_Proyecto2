const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat } = graphql

const ProductType = new GraphQLObjectType({
    name:'Product',
    fields: () => ({
        code: { type: GraphQLString },
        price: { type: GraphQLFloat },
        quantity: { type: GraphQLInt }
    })
})

module.exports = ProductType
