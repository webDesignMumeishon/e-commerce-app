class Category{
    constructor(name){
        this.name = name
    }
}

class CategoryBuilder{
    constructor(name){
        this.category = new Category(name)

    }
    setIcon(icon){
        this.category.icon = icon
        return this
    }
    setColor(color){
        this.category.color = color
        return this
    }
    build(){
        return this.category
    }
}

module.exports = CategoryBuilder