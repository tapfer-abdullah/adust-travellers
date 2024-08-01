import cartComponent from "./sharedScript/cartComponent.js";
import footer from "./sharedScript/footer.js";
import { navbar } from "./sharedScript/navbar.js";

window.addEventListener('load', () => {
    document.getElementById("nav").innerHTML = navbar();
    document.getElementById("footer").innerHTML = footer();
    document.getElementById("shopping-cart").innerHTML = cartComponent();


    // shopping cart 
    const existingCart = localStorage.getItem('ak-travelers-cart');
    const cart = JSON.parse(existingCart);

    if (cart?.length > 0) {
        const cartContainer = document.getElementById("cartContainerAK");
        const checkoutCartContainer = document.getElementById("checkoutCartContainer");

        const checkoutPageSubtotal = document.getElementById("checkout-page-subtotal");
        if (checkoutPageSubtotal) {
            const subTotal = cart?.reduce((accumulator, currentValue) => {
                return accumulator + (currentValue?.person * currentValue?.price);
            }, 0);
            document.getElementById("checkout-page-subtotal").innerText = subTotal.toFixed(1) || 0;
        }

        if (cartContainer)
            cartContainer.innerHTML = '';

        if (checkoutCartContainer)
            checkoutCartContainer.innerHTML = '';

        cart?.map(sp => {
            const div = document.createElement('div');
            div.classList.add("single-cart");

            div.innerHTML = `
                        <img class="single-cart-image"
                            src="${sp?.img}"
                            alt=""/>
                        <div class="single-cart-info">
                            <h4>${sp?.name} x ${sp?.person}</h4>
                            <p>$${sp?.person * sp.price}</p>
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
    `;

            if (cartContainer) { }
            cartContainer.appendChild(div);


            if (checkoutCartContainer) {
                const div2 = document.createElement('div');
                div2.classList.add("single-cart");

                div2.innerHTML = `
                <img class="single-cart-image"
                    src="${sp?.img}"
                    alt=""/>
                <div class="single-cart-info">
                    <h4>${sp?.name} x ${sp?.person}</h4>
                    <p>$${sp?.person * sp.price}</p>
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
`;

                checkoutCartContainer.appendChild(div2);
            }
        })
    }
    else {
        const cartContainer = document.getElementById("cartContainerAK");
        const checkoutCartContainer = document.getElementById("checkoutCartContainer");

        if (cartContainer)
            cartContainer.innerHTML = `<div class="single-cart">
                        <div id="empty-div">
                            <img class="empty-cart"
                            src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt=""/>
                            <p>Cart is empty!</p>
                        </div>
                    </div>`;

        if (checkoutCartContainer)
            checkoutCartContainer.innerHTML = `<div class="single-cart">
                        <div id="empty-div">
                            <img class="empty-cart"
                            src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt=""/>
                            <p>Cart is empty!</p>
                        </div>
                    </div>`;
    }


    document.getElementById('shopping-icon').addEventListener('change', toggleShoppingCart);
});

export function toggleShoppingCart() {
    if (this.checked) {
        document.getElementById('shopping-cart').classList.remove('visible');
    } else {
        document.getElementById('shopping-cart').classList.add('visible');
    }
}
