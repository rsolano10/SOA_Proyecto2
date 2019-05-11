const db = require('./db')

class Order {

  get Orders() {
    return new Promise(resolve => {
      db.query(
        'SELECT o.id AS id, o.username AS userName, o.date AS date FROM orders o',
        (err, res) => {
          let result_return = []
          res.forEach(async (element) => {
            const { id } = element
            const products = this.ProductsByOrder(id)
            element["products"] = products
            result_return.push(element)
          });
          resolve(result_return);
        })
    })
  }

  Order(id) {
    return new Promise(resolve => {
      db.query(
        'SELECT o.id AS id, o.username AS userName, o.date AS date ' +
        'FROM orders o WHERE o.id = ' + id,
        (err, res) => {
          const { id } = res[0]
          const products = this.ProductsByOrder(id)
          res[0]["products"] = products
          resolve(res[0]);
        })
    })
  }

  ProductsByOrder(id) {
    return new Promise(resolve => {
      db.query(
        'SELECT p.id_product AS code, p.price AS price, p.quantity AS quantity ' +
        'FROM product_order AS p WHERE p.id_order = ' + id,
        (err, res) => {

          resolve(res);
        })
    })
  }

  InsertOrder(order) {
    return new Promise(resolve => {
      db.query('INSERT INTO orders SET ?',
        order,
        (err, res) => {

          resolve(res)
        })
    })
  }

  InsertProduct(id, product) {

    return new Promise(resolve => {
      db.query('INSERT INTO product_order SET `id_order` = ' + id + ', ?',
        product,
        (err, res) => {

          resolve(res)
        })
    })
  }

  UpdateOrder(id, order) {

    return new Promise(resolve => {
      db.query('UPDATE orders SET ? WHERE id = ' + id,
        order,
        (err, res) => {

          resolve(res)
        })
    })
  }

  UpdateProduct(id, product) {

    return new Promise(resolve => {
      db.query('UPDATE product_order SET ? WHERE id_order = ' + id +
        ' AND id_product = \'' + product.id_product + '\'',
        product,
        (err, res) => {

          const { affectedRows } = res
          if (affectedRows >= 1) {
            resolve(res)
          } else {
            resolve(this.InsertProduct(id, product))
          }
        })
    })
  }

  DeleteOrder(id) {
    return new Promise(resolve => {
      db.query('DELETE FROM orders WHERE id = ' + id,
        (err, res) => {
          console.log(err)
          resolve(res)
        })
    })
  }

  DeleteProducts(id) {
    return new Promise(resolve => {
      db.query('DELETE FROM product_order WHERE id_order = ' + id,
        (err, res) => {
          console.log(err)
          resolve(res)
        })
    })
  }

}

module.exports = Order
