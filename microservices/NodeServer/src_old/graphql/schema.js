const graphql = require('graphql')

const OrderType = require('./order-type')
const OrderMySQL = require('../models/mysql/order')

const OrderSQLModel = new OrderMySQL();

const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat
} = graphql

const OrderQuery = new GraphQLObjectType({
  name: 'OrderQueries',
  fields: {
    orders: {
      type: new GraphQLList(OrderType),
      args: {},
      resolve: async () => {

        const data = await OrderSQLModel.Orders

        return data
      }
    },
    order: {
      type: OrderType,
      args: { id: { type: GraphQLInt } },
      resolve: async (args) => {
        const { id } = args
        let data = await OrderSQLModel.Order(id)
        return data
      }
    }
  }
})

const ProductInputType = new GraphQLInputObjectType({
  name: 'ProductInput',
  fields: () => ({
    id_product: { type: GraphQLString },
    price: { type: GraphQLFloat },
    quantity: { type: GraphQLInt }
  })
})

const OrderMutation = new GraphQLObjectType({
  name: 'OrderMutations',
  fields: {
    addOrder: {
      type: OrderType,
      args: {
        userName: { type: GraphQLString },
        products: { type: new GraphQLList(ProductInputType) }
      },
      resolve: async (parent, args) => {
        const { userName, products } = args

        const order = { username: userName, date: new Date() };

        const addOrder = await OrderSQLModel.InsertOrder(order)
        const { insertId } = ret
        for (const product of products) {
          await OrderSQLModel.InsertProduct(insertId, product)
        }

        return addOrder;
      }
    },
    updateOrder: {
      type: OrderType,
      args: {
        id: { type: GraphQLInt },
        userName: { type: GraphQLString },
        products: { type: new GraphQLList(ProductInputType) }
      },
      resolve: async (args) => {
        const { id, userName, products } = args

        const updatedOrder = await OrderSQLModel.UpdateOrder(id, { userName })
        for (const product of products) {
          await OrderSQLModel.UpdateProduct(id, product)
        }

        return updatedOrder;
      }
    },
    deleteOrder: {
      type: OrderType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve: async (args) => {
        const { id } = args

        await OrderSQLModel.DeleteProducts(id)
        const deletedOrder = await OrderSQLModel.DeleteOrder(id)

        return deletedOrder;
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: OrderQuery,
  mutation: OrderMutation
})
