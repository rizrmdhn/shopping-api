const { default: axios } = require("axios")

class ProductsHandler {
    constructor() {

        this.getProducts = this.getProducts.bind(this)
    }

    async getProducts() {

        const products = await axios.get('https://fakestoreapi.com/products').then(res => res.data)

        return {
            status: 'success',
            data: {
                products,
            }
        }
    }
}


module.exports = ProductsHandler