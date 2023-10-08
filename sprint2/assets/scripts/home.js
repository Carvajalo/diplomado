const useState = (initialValue) => {
    let state = initialValue;
    const setState = (newValue) => {
        state.innerHTML = newValue;
    }
    const getState = () => state.innerHTML;
    return [getState, setState];
}


const productActions = {
    increase: (id, quantity = 1) => {
        products.find((product) => product.id === id).quantity += quantity;
    },
    decrease: (id, quantity = 1) => {
        if (products.find((product) => product.id === id).quantity === 0) return true;
        console.log(products.find((product) => product.id === id).quantity)
        products.find((product) => product.id === id).quantity -= quantity;
        return false;
    },
}

const addButtons = document.querySelectorAll('.button-add');
const cart = document.querySelector('.cart-product-list');
const [cartNumber, setCartNumber] = useState(document.querySelector('.cart-number'));
const [cartTotal, setCartTotal] = useState(document.querySelector('.cart-total'));
const openCartButton = document.querySelector('.btn-openCart');
const listProducts = document.querySelector('.product-list');
const btnPay = document.querySelector('.btn-pay');
let isToast = true;



// read products from products.js file

// !Not used:
const emptyCartTemplate = () => {
    cart.innerHTML = `
    <div class="cart-empty">
        <div class="cart-empty-image">
            <img src="assets/empty-cart.svg" alt="Empty cart">
        </div>
        <div class="cart-empty-text">
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added any items to the cart yet.</p>
        </div>
    </div>
    `;
}


// !Not used: 
openCartButton.addEventListener('----', () => {
    const cartChildrens = cart.children;
    if (cart.children.querySelector('.cart-total')) return;
    if (cart?.children.length > 1) {
        const li = document.createElement('li');
        li.classList.add('row', 'd-flex');
        li.innerHTML = `
            <div class="row">
                <span class="col-6">
                    Total:
                </span>
                <p class="card-text">
                    <strong>$<spam class="cart-total">${cartTotal()}</spam></strong>
                </p>
            </div>
        `;


        return cart.insertBefore(li, cart.children[cart.children.length - 1]);
    };

    emptyCartTemplate();
});


const newCartProduct = (name, price, description, imgSrc, id) => {
    // need the cart>li nodes
    if (productActions['decrease'](id)) {
        console.log(isToast)
        if (isToast) {
            console.log("aaaaaaaaaaaaaaa")
            Toastify({
                text: `El producto ${name} no está disponible`,
                duration: 1600,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                style: {
                    background: "linear-gradient(to right, #ff1a60, #ff5f6d)",
                },
            }).showToast();
            isToast = false;
            setTimeout(() => isToast = true, 2000);
        }
        return;
    }

    const cartChildrens = cart.querySelectorAll('li');
    const existingProduct = Array.from(cartChildrens).find(child => child.id === id.toString());
    if (existingProduct) {
        const quantity = existingProduct.querySelector('.item-quantity');
        quantity.value = parseInt(quantity.value) + 1;
        setCartTotal(parseFloat(cartTotal()) + parseFloat(price))

        return;
    }


    const newProduct = document.createElement('li');
    newProduct.classList.add('row');
    id && newProduct.setAttribute('id', id);
    newProduct.innerHTML = `
    <div class="row g-0">
        <div class="d-flex col-md-1">
            <button class="btn erase-button">x</button>
        </div>
        <div class="col-md-3">
            <img src="${imgSrc}" class="card-img-top img-fluid"
                alt="Product 1" style="max-width: 540px;">
        </div>
        <div class="col-md-8">
            <div class="ms-2">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${description}</p>
            </div>
        </div>
    </div>

    <div class="d-flex justify-content-between align-items-center mt-4">
        <p class="card-text">
            <strong>$<spam class="product-price">${price}</spam></strong>
        </p>
        <div class="d-flex col-md-6">
            <div class="input-group mb-3">
                <button class="btn btn-sm btn-primary input-group-number decrease-quantity">
                    <i class="bi bi-dash custom-icon"></i>
                </button>
                <input type="number" class="form-control item-quantity" value="1">
                <button class="btn btn-sm btn-primary input-group-number increase-quantity"
                    id="increase-product2">
                    <i class="bi bi-plus custom-icon"></i>
                </button>
            </div>
        </div>
    </div>
    <hr>
`;
    setCartTotal(parseFloat(cartTotal()) + parseFloat(price))

    const decreaseButton = newProduct.querySelector('.decrease-quantity');
    const increaseButton = newProduct.querySelector('.increase-quantity');
    const itemQuantity = newProduct.querySelector('.item-quantity');
    const productPrice = newProduct.querySelector('.product-price');
    const eraseButton = newProduct.querySelector('.erase-button');

    decreaseButton.addEventListener('click', () => {
        if (itemQuantity?.value > 1) {
            productActions['increase'](id);
            itemQuantity.value = parseInt(itemQuantity?.value) - 1;
            setCartTotal(parseFloat(cartTotal()) - parseFloat(productPrice?.innerHTML))

        }
    });

    increaseButton.addEventListener('click', () => {
        if (productActions['decrease'](id)) return Toastify({
            text: `El producto ${name} no está disponible`,
            duration: 2000,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            style: {
                background: "linear-gradient(to right, #ff1a60, #ff5f6d)",
            },
        }).showToast();
        itemQuantity.value = parseInt(itemQuantity.value) + 1;
        setCartTotal(parseFloat(productPrice?.innerHTML) + parseFloat(cartTotal()))
    });

    eraseButton.addEventListener('click', () => {
        setCartTotal(parseFloat(cartTotal()) - (parseFloat(productPrice?.innerHTML) * parseFloat(itemQuantity?.value)));
        setCartNumber(parseInt(cartNumber()) - 1);
        productActions['increase'](id, parseInt(itemQuantity?.value));
        newProduct.remove();
    });

    setCartNumber(parseInt(cartNumber()) + 1);
    cart.insertBefore(newProduct, cart.children[cart.children.length - 1]);
    return

}



addButtons.forEach((button) => {
    const closestPrice = button.closest('.product-info').querySelector('.product-price').innerText;
    const closestName = button.closest('.product-info').querySelector('.product-name').innerText;
    const closestDescription = button.closest('.product-info').querySelector('.product-description').innerText.slice(1, 37);
    const closestImage = button.closest('.product-card').querySelector('.product-image').src;
    const closestId = button.closest('.product-card').id;
    const fullDescription = `${closestDescription} ${closestDescription.length > 37 ? '...' : ''}`
    return button.addEventListener('click', () => {
        newCartProduct(closestName, closestPrice, fullDescription, closestImage, closestId);
    });
});


const createProducts = (name, price, description, imgSrc, id) => {
    const div = document.createElement('div');
    div.classList.add('col-md-4', 'mb-4');
    div.innerHTML = `
    <div class="card product-card" id=${id}>
    <img src="${imgSrc}" class="card-img-top img-fluid product-image"
        style="max-height: 20vh;" alt="Product 1">
        <div class="card-body product-info">
            <h5 class="card-title product-name">${name}</h5>
            <p class="card-text product-description">${description}</p>
            <div class="d-flex justify-content-between align-items-center">
                <p class="card-text">
                    <strong>$<spam class="product-price">${price}</spam></strong>
                </p>
                <button class="btn btn-primary button-add">Buy Now</button>
            </div>
        </div>
    </div>
    `;

    const button = div.querySelector('.button-add');
    button.addEventListener('click', () => {
        newCartProduct(name, price, description, imgSrc, id);
    });

    return listProducts.appendChild(div);
}


products && products.forEach((product) => {
    createProducts(product?.name, product?.price, product?.description, product?.imgSrc, product?.id);
});


btnPay.addEventListener('click', () => {
    if (cart.children.length > 1) {
        const cartChildrens = cart.querySelectorAll('li');
        Array.from(cartChildrens).forEach((child, i) => {
            if (i === cartChildrens.length - 1) return;
            child.remove();
        });
        setCartTotal(0);


        return Toastify({
            text: `Gracias por su compra`,
            duration: 2000,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            style: {
                background: "linear-gradient(to right, #ff1a60, #ff5f6d)",
            },
        }).showToast();
    }
});