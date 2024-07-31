
function updatedNavCartQuantity() {
    const existingCart = localStorage.getItem('ak-travelers-cart');
    const cart = JSON.parse(existingCart);
    if (cart?.length > 0) {
        quantity = cart?.reduce((accumulator, currentValue) => {
            return accumulator + currentValue?.person;
        }, 0);


        subTotal = cart?.reduce((accumulator, currentValue) => {
            return accumulator + (currentValue?.person * currentValue?.price);
        }, 0);

        // updating shopping-cart-subtotal
        document.getElementById("shopping-cart-subtotal").innerText = subTotal.toFixed(1) || 0;
        // updating nav - quantity
        document.getElementById("nav-quantity").innerText = quantity || 0;


        const cartContainer = document.getElementById("cartContainerAK");
        cartContainer.innerHTML = ''

        cart?.map(sp => {
            console.log({ sp })
            const div = document.createElement('div');
            div.classList.add("single-cart");

            div.innerHTML = `
                        <img class="single-cart-image"
                            src="${sp?.img}"
                            alt=""/>
                        <div class="single-cart-info">
                            <h4>${sp?.name} X ${sp?.person}</h4>
                            <p>$${sp.price} X ${sp?.person} = $${(sp?.person * sp.price).toFixed(1)}</p>
                            <div class="quantity">
                                <button onclick="decreaseQuantityOfCart('${sp?.id}')" class="quantity-btn quantity-btn-minus">
                                    <img src="/public/assets/icon/minus.svg" alt="" class="icon-img"/>
                                </button>
                                <input readOnly value="${sp?.person}" type="number" name="actual-quantity" class="actual-quantity" id="actual-${sp?.id}" min="1"/>
                                <button onclick="increaseQuantityOfCart('${sp?.id}')" class="quantity-btn quantity-btn-plus">
                                    <img src="/public/assets/icon/plus-2.svg" alt="" class="icon-img"/>
                                </button>
                            </div>
                        </div>

                        <button onclick="deleteProductFromCart('${sp?.id}')" class="remove-from-cart-btn">
                            <img src="/public/assets/icon/cross-2.svg" alt="" class="" />
                        </button>
    `

            cartContainer.appendChild(div)
        })

    }
    else {
        // updating shopping-cart-subtotal
        document.getElementById("shopping-cart-subtotal").innerText = 0.0;
        // updating nav - quantity
        document.getElementById("nav-quantity").innerText = 0;

        const cartContainer = document.getElementById("cartContainerAK");
        cartContainer.innerHTML = `<div class="single-cart">
                        <div id="empty-div">
                            <img class="empty-cart"
                            src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt=""/>
                            <p>Cart is empty!</p>
                        </div>
                    </div>`
    }
}


const handleCart = (action, data) => {
    const existingCart = localStorage.getItem('ak-travelers-cart');
    if (action == 'add') {
        if (existingCart) {
            const cart = JSON.parse(existingCart);
            const updatedCart = [];

            let flag = false;
            cart.map(product => {
                if (product?.id == data?.id) {
                    updatedCart.push(data);
                    flag = true;
                }
                else {
                    updatedCart.push(product)
                }
            })

            if (!flag) {
                updatedCart.push(data);
            }

            localStorage.setItem("ak-travelers-cart", JSON.stringify(updatedCart));
        }
        else {
            const cart = [data];
            localStorage.setItem("ak-travelers-cart", JSON.stringify(cart));
        }
    }
}


// Function to get the current value of the input field
function getCurrentQuantity() {
    const inputField = document.getElementById('actual-quantity-field');
    const currentQuantity = parseInt(inputField.value, 10);
    return currentQuantity;
}

// Function to set the value of the input field
function setCurrentQuantity(newQuantity) {
    const inputField = document.getElementById('actual-quantity-field');
    inputField.value = newQuantity;
}

// Function to increase the quantity
function increaseQuantity() {
    const currentQuantity = getCurrentQuantity();
    const newQuantity = currentQuantity + 1;
    console.log({ currentQuantity, newQuantity })
    setCurrentQuantity(newQuantity);
}

// Function to decrease the quantity
function decreaseQuantity() {
    const currentQuantity = getCurrentQuantity();
    if (currentQuantity > 1) {
        const newQuantity = currentQuantity - 1;
        console.log({ currentQuantity, newQuantity })
        setCurrentQuantity(newQuantity);
    }
}

// Function to increase the quantity of shopping cart
function increaseQuantityOfCart(id) {
    const inputField = document.getElementById(`actual-${id}`);
    const currentQuantity = parseInt(inputField.value, 10);
    const newQuantity = currentQuantity + 1;

    const existingCart = localStorage.getItem('ak-travelers-cart');
    if (existingCart) {
        const cart = JSON.parse(existingCart);

        const updatedCart = [];

        cart.map(product => {
            if (product?.id == id) {
                updatedCart.push({ ...product, person: newQuantity });
            }
            else {
                updatedCart.push(product)
            }
        })

        localStorage.setItem("ak-travelers-cart", JSON.stringify(updatedCart));
        updatedNavCartQuantity();
    }
}

// Function to decrease the quantity of shopping cart
function decreaseQuantityOfCart(id) {
    const inputField = document.getElementById(`actual-${id}`);
    const currentQuantity = parseInt(inputField.value, 10);

    if (currentQuantity > 1) {
        const newQuantity = currentQuantity - 1;

        const existingCart = localStorage.getItem('ak-travelers-cart');
        if (existingCart) {
            const cart = JSON.parse(existingCart);

            const updatedCart = [];

            cart.map(product => {
                if (product?.id == id) {
                    updatedCart.push({ ...product, person: newQuantity });
                }
                else {
                    updatedCart.push(product)
                }
            })

            localStorage.setItem("ak-travelers-cart", JSON.stringify(updatedCart));
            updatedNavCartQuantity();
        }
    }
}

// Function to decrease the quantity of shopping cart
function deleteProductFromCart(id) {
    const existingCart = localStorage.getItem('ak-travelers-cart');

    const cart = JSON.parse(existingCart);
    if (cart?.length > 0) {

        const updatedCart = [];

        cart.map(product => {
            if (product?.id != id) {
                updatedCart.push(product);
            }
        })

        localStorage.setItem("ak-travelers-cart", JSON.stringify(updatedCart));
    }
    updatedNavCartQuantity();
}

// Function to decrease the quantity
function decreaseQuantityCart(id) {
    const currentQuantity = getCurrentQuantity();
    if (currentQuantity > 1) {
        const newQuantity = currentQuantity - 1;
        setCurrentQuantity(newQuantity);
    }
}


function addToCart(id, name, price, img) {
    const currentQuantity = getCurrentQuantity();
    handleCart('add', { person: currentQuantity, id, name, price, img });

    Toastify({
        text: `Added to cart!   `,
        duration: 3000,
        close: true,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();


    updatedNavCartQuantity();
}




