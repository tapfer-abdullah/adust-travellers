export const navbar = () => (
    `<div class="content-1">
        <a href="/">Logo</a>
    </div>
    <div class="content-2">
        <a href="/" id="home-link">Home</a>
        <a href="/destination" id="destinations-link">Destinations</a>
        <a href="/?post=all" id="posts-link">Posts</a>
    </div>
    <div class="content-3 shopping-cart-div">
        <input type="checkbox" id="shopping-icon" />
        <label for="shopping-icon" class="shopping-cart">
            <ion-icon name="cart"></ion-icon>
            <span>5</span>
        </label>
        <div class="shopping-cart-content" style="display: none;">
            <!-- Shopping cart details here -->
        </div>
        <a href="/auth/login.html" class="btn-solid">Login</a>
    </div>`
);
