let products = JSON.parse(localStorage.getItem('products')) || [];

fetch('assets/scripts/data/items.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        products = data;
        localStorage.setItem('products', JSON.stringify(products));
    })
    .catch(err => {
        console.error('Fetch error:', err);
    });

$(document).ready(function() {
    loadProducts();
    $('#filter__all').on('click', function() {
        loadProducts();
    });
    $('#filter__phones').on('click', function() {
        loadProducts('phone');
    });
    $('#filter__laptops').on('click', function() {
        loadProducts('laptop');
    });
    $('#filter__peripherals').on('click', function() {
        loadProducts('peripherals');
    }); 
});

function renderCardHTML(product) {
    let cardHTML = '<div class="card">';
    cardHTML += `<img class="card-img-top" src="${product.img}">`;
    cardHTML += `<div class="card-body">`;
    cardHTML += `<h5 class="card-title">Name: ${product.name}</h5>`;
    cardHTML += `<hr class="my-1">`;
    cardHTML += `<p class="card-text price">Price: ${product.price}$</p>`;
    cardHTML += `<a class="btn btn-primary" id="purchase_btn" name="purchase_btn">BUY</a>`
    cardHTML += '</div>';
    cardHTML += '</div>';
    return cardHTML;
}

function loadProducts(category) {
    let filterFunction;
    filterFunction = category ? (product) => product.category === category : () => true;
    
    let productsFiltered = products.filter(filterFunction);
    
    let productsHtml1 = '';
    let productsHtml2 = '';

    for (let i = 0; i < productsFiltered.length; i++) {
        i % 2 === 0 ? productsHtml1 += renderCardHTML(productsFiltered[i]) : productsHtml2 += renderCardHTML(productsFiltered[i]);
    }


    let productsContainer1 = document.getElementById('product_container1');
    let productsContainer2 = document.getElementById('product_container2');
    productsContainer1.innerHTML = productsHtml1;
    productsContainer2.innerHTML = productsHtml2;
}





