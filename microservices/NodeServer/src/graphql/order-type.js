const graphql = require('graphql')
const ProductType = require('./product-type')

const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLFloat } = graphql

const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: () => ({
    id: { type: GraphQLInt },
    userName: { type: GraphQLString },
    products: { type: new GraphQLList(ProductType) },
    date: { type: GraphQLString }
  })
})

module.exports = OrderType
