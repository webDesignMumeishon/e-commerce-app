class Product{
    constructor(name){
        this.name = name
    }
}

class ProductBuilder{
    constructor(name){
        this.product = new Product(name)
    }
    setDescription(description){
        this.product.description = description
        return this
    }
    setRichDescription(rich){
        this.product.richDescription = rich
        return this
    } 
    setImg(img){
        this.product.image = img
        return this
    }
    setBrand(brand){
        this.product.brand = brand
        return this
    }
    setPrice(price){
        this.product.price = price
        return this
    }
    setCategory(category){
        this.product.category = category
        return this
    }
    setStock(count){
        this.product.countInStock = count
        return this
    }
    setRating(rating){
        this.product.rating = rating
        return this
    }
    setNumReviews(reviews){
        this.product.numReviews = reviews
        return this
    }
   
    setFeature(feature){
        this.product.isFeature = feature
        return this
    }
    build(){
        return this.product
    }
}

module.exports = ProductBuilder