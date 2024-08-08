export const navbar = () => {
    const existingCart = localStorage.getItem('ak-travelers-cart');
    let quantity = 0;
    const cart = JSON.parse(existingCart);
    if (cart?.length > 0) {
        quantity = cart?.reduce((accumulator, currentValue) => {
            return accumulator + currentValue?.person;
        }, 0);
    }

    return `<div class="content-1">
    <a href="/">Logo</a>
</div>
<div class="content-2">
    <a href="/" id="home-link">Home</a>
    <a href="/destination/all.html" id="destinations-link">Destinations</a>
    <a href="/destination/search.html?query=all" id="destinations-link">Activities</a>
    <a href="/?post=all" id="posts-link">Posts</a>
</div>
<div class="content-3 shopping-cart-div">
    <input type="checkbox" id="shopping-icon" />
    <label for="shopping-icon" class="shopping-cart">
        <ion-icon name="cart"></ion-icon>
        <span id="nav-quantity">${quantity}</span>
    </label>
    <div class="shopping-cart-content" style="display: none;">
        <!-- Shopping cart details here -->
    </div>
    <a href="/auth/login.html" class="btn-solid">Login</a>
</div>`
}
