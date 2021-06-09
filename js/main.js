const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'
const API_basket = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json'

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.fetchProd = [];
        this._getBasket()
        .then(data => { //преобразованный методом.json  json-объект в JS-объект
            this.outputBaskcetRobins(data)})

        this._getProducts()
        .then(data => { //преобразованный методом.json  json-объект в JS-объект
            this.goods = [...data];
            this.render();
            this.render()
            this.getFullPrice();
            this.addToCart();       
        });
        //console.log(this);
        //this._fethProduct();
    }
     _getProducts(){
        return fetch(`${API}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    _getBasket(){
        return fetch(`${API_basket}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    outputBaskcetRobins(data){
        console.log(data); 
    }

    addToCart(){
        let buttons = document.querySelectorAll('.buy-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () =>{
                let cartItem = new CartList(btn.dataset.title, btn.dataset.price ,btn.dataset.id_product);
            })
        })
    }

/* _fethProduct(){
    this.goods = [
        {id: 1, title: 'Notebook', price: 2000},
        {id: 2, title: 'Mouse', price: 20},
        {id: 3, title: 'Keyboard', price: 200},
        {id: 4, title: 'Gamepad', price: 50},
    ];
} */

render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
        const productObj = new ProductItem(product);
        this.fetchProd.push(productObj);
        block.insertAdjacentHTML("beforeend", productObj.render());             //Z  block.innerHTML += productObj.render(); второй вариант, но более медленный

    }
}


_renderFetchBask(blockForBas){
    
}

// метод для расчета общей стоимости товаров.
getFullPrice() {
let initialValue = 0;
const fullPrice = this.fetchProd.reduce(function(inithial, total){
    return inithial + total.price;
}, initialValue)
let totalPrice =  document.querySelector(".total_price")
totalPrice.innerHTML = `<h3>All products price: <span class="full_price_figure"> ${fullPrice} </span></h3>`
}

}

class ProductItem {
    constructor(product, img='https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
        //console.log(this);
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" ali="image">
                <h3>${this.title}</h3>
                <p>$ ${this.price}</p>
                <button class="buy-btn" data-title="${this.title}" data-price="${this.price}" data-id="${this.id}"data-img="${this.img}" >Купить</button>
            </div>` 
    }
}

class CartList {
    constructor(product_name, price, id, container = '.cart-box') {
        this.title = product_name;
        this.price = price;
        this.id = id;
        //this.img = img;
        this.mass = [];
        this.container = container;
        this._addGoods(this);
        this._addMark();
        console.log(this);
    }
    

    _addGoods (item) {
        const block = document.querySelector(item.container);
        const cartItem = new CartItem(item);
        //console.log(cartItem);
        block.insertAdjacentHTML("beforeend", cartItem._render()); 
        }

    _addMark () {
            const btn_mark = document.querySelector(".btn-cart");
            btn_mark.insertAdjacentHTML("beforeend", this._renderMark ()); 
        }
    delGoods () {

    }; 

    totalPrice () {

    };

    _renderMark () {
        return `<div class="btn-cart-mark"></div>`
    }
    
};

class CartItem {
    constructor(item){
        this.title = item.title;
        this.price = item.price;
    }

    _render() {
        return `
        <div class="cart-item-text-box">
            <span class="cart-item-text" class="cart-item-title" >${this.title}</span>
            <span  class="cart-item-price" >$ ${this.price}</span>
        </div>
            ` 
    }
} 
