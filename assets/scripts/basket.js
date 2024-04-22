let basket = JSON.parse(localStorage.getItem('basket')) || [];

$(document).ready(function() {
    $('#modal__basket').on('click', function() {
        $('#modal__basket__container').css('display', 'block');
        loadBasket();
    });

    $(document).on('click', '#purchase_btn', function() {
        let title = $(this).closest('.card').find('.card-title').text();
        let price = $(this).closest('.card').find('.price').text();

        let category = '';

        fetch('assets/scripts/data/items.json').then(
            response => { 
                return response.json()
            }
            ).then(data => {
                category = data.filter(item => item.name === title.split(':')[1].slice(1))[0].category;
                let count = 1;

                let obj = {
                    title: title.split(':')[1].slice(1),
                    price: price.split(':')[1].slice(1, -1),
                    count: count,
                    category: category
                }
                addProductToBasket(obj); 
                
            }
            ).catch(err => {
                console.log(err)
            }
        )  
    });

    $(document).on('click', '#add__to__basket', function() {
        let price = $(this).closest('.added-item').find('.added-item-cost').text();
        obj = basket.filter(item => item.price === price)[0];

        addProductToBasket(obj); 
    });

    $(document).on('click', '#remove__from__basket', function() {
        let price = $(this).closest('.added-item').find('.added-item-cost').text();
        obj = basket.filter(item => item.price === price)[0];   

        removeProductFromBasket(obj);
    });

    $(document).on('click', '.close', function() {
        let price = $(this).closest('.added-item').find('.added-item-cost').text();
        obj = basket.filter(item => item.price === price)[0];   
        
        
        basket = basket.filter(item => item.price !== price);
        localStorage.setItem('basket', JSON.stringify(basket));

        loadBasket();
    }); 

    $(document).on('click', '#filter__by__price', function() {
        loadBasket('price');
    });

    $(document).on('click', '#filter__by__sum', function() {
        loadBasket('sum');
    });

    $(document).on('click', '#filter__by__name', function() {
        loadBasket('name');
    });
});

basket = JSON.parse(localStorage.getItem('basket')) || [];

function loadBasket(custom_filter='none') {
    if (custom_filter === 'price') {
        basket.sort((a, b) => a.price - b.price);
    } else if (custom_filter === 'sum') {
        basket.sort((a, b) => a.price * a.count - b.price * b.count);
    } else if (custom_filter === 'name') {
        basket.sort((a, b) => a.title.localeCompare(b.title));
    }
    let basket_container = document.getElementById('modal__basket__container');
    let basketHtml = '';

    basket.forEach(product => {
        basketHtml += renderBasketHTML(product);
    });


    basketHtml += '<ul class="navbar-nav me-auto mb-2 mb-lg-0">\
    <li class="nav-item dropdown">\
      <a class="basket_filter nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"\
       style="cursor: pointer; font-size: 20px;">\
        Filters\
      </a>\
      <ul class="dropdown-menu" aria-labelledby="navbarDropdown">\
        <li><a class="dropdown-item" id="filter__by__name" >name</a></li>\
        <a class="dropdown-item" id="filter__by__price">price</a>\
        <li><a class="dropdown-item" id="filter__by__sum">total sum</a></li>\
      </ul>\
    </li>\
  </ul>';

    basketHtml += `
     <div class="buy_btn">
        <button type="button" class="btn btn-success">${(basket.reduce((acc, item) => acc + item.price * item.count, 0)).toFixed(2)}$</button>
     </div>`
    basket_container.innerHTML = basketHtml;
}

function renderBasketHTML(product) {
    let basketHTML = '<div class="added-item">';
    basketHTML += `<div class="added-item-title" id="basket_title" name="basket_title">${product.title}`;
    basketHTML += `<div class="amount-and-cost">`;
    basketHTML += `<span class="added-item-cost" id="basket_price">${product.price}</span>`;
    basketHTML += `<p class="added-item-amount" id="basket_count">Count: ${product.count}</p>`;
    basketHTML += '</div>';
    basketHTML += '</div>';
   

    basketHTML += '<div class="manipulation__btns"><div class="btn-group" role="group" aria-label="Basic example">\
    <button type="button" class="btn btn-secondary" id="add__to__basket">+</button>\
    <button type="button" class="btn btn-secondary" id="remove__from__basket">-</button>\
                  </div>'
    basketHTML += '<button type="button" class="close" aria-label="Close">\
    <span aria-hidden="true">&times;</span>\
                    </button></div>'
    basketHTML += '</div>';

    return basketHTML;
}

function addProductToBasket(product) {
    let productIndex = basket.findIndex(item => item.title === product.title);
    if (productIndex >= 0) {
        basket[productIndex].count++;
    } else {
        basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    loadBasket();
}

function removeProductFromBasket(product) {
    let productIndex = basket.findIndex(item => item.title === product.title);
    if (productIndex >= 0) {
        basket[productIndex].count--;
        if (basket[productIndex].count === 0) {
            basket.splice(productIndex, 1);
        }
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    loadBasket();
}

