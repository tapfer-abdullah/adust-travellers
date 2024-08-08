
const cartComponent = () => {
    // updating shopping-cart-subtotal
    const existingCart = localStorage.getItem('ak-travelers-cart');
    let subTotal = 0;
    const cart = JSON.parse(existingCart);
    const condition = cart?.length > 0;
    if (condition) {
        subTotal = cart?.reduce((accumulator, currentValue) => {
            return accumulator + (currentValue?.person * currentValue?.price);
        }, 0);
    }

    return (
        `<div class="content">
                <div class="cart-title-div">
                    <h3>Booking Cart</h3>
                    <label for="shopping-icon">
                        <img src="/public/assets/icon/cross.svg" alt="" class="" />
                    </label>
                </div>
                <div class="cart-container" id="cartContainerAK">
                    <div class="single-cart">
                        <img class="single-cart-image"
                            src="https://www.shutterstock.com/image-photo/beautiful-landscape-cloudy-sky-chimbuk-600nw-1824355007.jpg"
                            alt=""/>
                        <div class="single-cart-info">
                            <h4>Sajek</h4>
                            <p>$50.00</p>
                            <div class="quantity">
                                <button class="quantity-btn quantity-btn-minus">
                                    <img src="/public/assets/icon/minus.svg" alt="" class="icon-img"/>
                                </button>
                                <input value="1" type="number" name="actual-quantity" id="actual-quantity" min="1"/>
                                <button class="quantity-btn quantity-btn-plus">
                                    <img src="/public/assets/icon/plus-2.svg" alt="" class="icon-img"/>
                                </button>
                            </div>
                        </div>

                        <button class="remove-from-cart-btn">
                            <img src="/public/assets/icon/cross-2.svg" alt="" class="" />
                        </button>

                    </div>
                    
                </div>
                <div class="cart-footer">
                    <div class="divider"></div>
                    <div class="subtotal-div">
                        <p>Subtotal:</p>
                        <h3>$<span id="shopping-cart-subtotal">${subTotal.toFixed(1)}</span></h3>
                    </div>
                    
                    <div id="cart-btn">
                     <a href="${condition ? '/checkout/index.html' : '#'}" class="cart-submit-btn ${condition ? '' : 'unavailable disabled'}">${condition ? "Checkout" : "Cart is empty"}</a>
                    </div>
                    </div>
            </div>`
    );
};

{/* <div class="cart-footer">
                    <div class="divider"></div>
                    <div class="subtotal-div">
                        <p>Subtotal:</p>
                        <h3>$150</h3>
                    </div>
                    <p class="subtotal-label">Use discount code here:</p>
                    <form>
                        <input type="text" name="cart-discount" id="cart-discount-field"
                            placeholder="Enter discount code">
                        <input type="submit" value="Apply" />
                    </form>
                    <a href="/checkout" class="cart-submit-btn">Checkout</a>
                </div> */}

export default cartComponent;

