const products = [
    {id: 1, title: 'Notebook', price: '2000'},
    {id: 2, title: 'Mouse', price: '30'},
    {id: 3, title: 'Keyboard', price: '200'},
    {id: 4, title: 'GamePad'},
];


const renderProduct = (title, price = 10) => {
         return  `<div class="cart__card" >
                        <img class= "cart__card-foto" src= "./img/iii.png" alt="image">
                        <div class="cart__order-details-box">
                            <div class="cart__order-details-title">${title}</div>
                            <div class="cart__order-details-point">price: <span class="cart__pink-price">${price} </span></div>
                            <div class="cart__order-details-point cart__order-details-quantity">quantity:</div>
                        </div>
                    </div>`
};


const randerPage = list => {
    const productsList = list.map(item => renderProduct(item.title, item.price));
    console.log(productsList);
    document.querySelector('.product').innerHTML = productsList;
}



randerPage(products);