function decodeAndVerifyJwt(token, secret) {
    try {
        // Verify the token
        const decoded = window.jwt.verify(token, secret);

        // Log the decoded payload
        console.log('Decoded JWT:', decoded);
    } catch (err) {
        // Handle token verification errors
        console.error('Token verification failed:', err.message);
    }
}


export const navbar = () => {
    const existingCart = localStorage.getItem('ak-travelers-cart');
    // const token = localStorage.getItem("ak-secret");

    // try {
    //     // Verify the token
    //     const decoded = jwt.verify(token, "2b8a6a855AK29db225c0fA7bc553e752f24d79adee34f8721a2a93e1d22d5b88");

    //     // Log the decoded payload
    //     console.log('Decoded JWT:', decoded);
    // } catch (err) {
    //     // Handle token verification errors
    //     console.error('Token verification failed:', err.message);
    // }

    // decodeAndVerifyJwt(token, "2b8a6a855AK29db225c0fA7bc553e752f24d79adee34f8721a2a93e1d22d5b88")

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
