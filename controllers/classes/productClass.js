class Product{
    constructor(name){
        this.name = name
    }
}

class ProductBuilder{
    constructor(name){
        this.category = new Product(name)
    }
    setImg(img){
        this.product.image = img
        return this
    }
    setStock(count){
        this.product.countInStock = count
        return this
    }
    build(){
        return this.product
    }
}

module.exports = ProductBuilder