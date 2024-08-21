const token = localStorage.getItem("ak-secret");

export function decodeAndVerifyJwt(token) {
    try {
        // Decode the token using jwt-decode
        const decoded = jwt_decode(token);
        return decoded;
    } catch (err) {
        // Handle token decoding errors
        console.error('Token decoding failed:', err.message);
    }
}


export const navbar = () => {
    const existingCart = localStorage.getItem('ak-travelers-cart');
    const token = localStorage.getItem("ak-secret");
    let isLogin = false;
    let role = '';
    let url = '/auth/login.html';

    if (token) {
        const result = decodeAndVerifyJwt(token);
        // console.log({ result });
        if (result?.data?.role) {
            isLogin = true;
            role = result?.data?.role;
            url = `/dashboard/index.html?role=${role}`;
        }
        else {
            localStorage.removeItem("ak-secret");
        }
    }

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
   
    <a href="${url}"  class="btn-solid">${isLogin ? "Dashboard" : "Login"}</a>
</div>`
}


export const smallNavbar = () => {
    const existingCart = localStorage.getItem('ak-travelers-cart');
    const token = localStorage.getItem("ak-secret");
    let isLogin = false;
    let role = '';
    let url = '/auth/login.html';

    if (token) {
        const result = decodeAndVerifyJwt(token);
        // console.log({ result });
        if (result?.data?.role) {
            isLogin = true;
            role = result?.data?.role;
            url = `/dashboard/index.html?role=${role}`;
        }
        else {
            localStorage.removeItem("ak-secret");
        }
    }

    let quantity = 0;
    const cart = JSON.parse(existingCart);
    if (cart?.length > 0) {
        quantity = cart?.reduce((accumulator, currentValue) => {
            return accumulator + currentValue?.person;
        }, 0);
    }
    // menu-icon

    return ` <!-- <div></div> -->
        <a href="/">Logo</a>

        <div class="content-3 shopping-cart-div">
            <input type="checkbox" id="shopping-icon" />
            <label for="shopping-icon" class="shopping-cart">
                <ion-icon name="cart"></ion-icon>
                <span id="nav-quantity">${quantity}</span>
            </label>
            <img id="smallNav-open" src="/public/assets/icon/menu.svg" alt="">
        </div>`
}

export const navSidebar = () => {
    const token = localStorage.getItem("ak-secret");
    let isLogin = false;
    let role = '';
    let url = '/auth/login.html';

    if (token) {
        const result = decodeAndVerifyJwt(token);
        // console.log({ result });
        if (result?.data?.role) {
            isLogin = true;
            role = result?.data?.role;
            url = `/dashboard/index.html?role=${role}`;
        }
        else {
            localStorage.removeItem("ak-secret");
        }
    }



    return ` <div class="content" class="">
            <div class="content-inner-div">
                <div class="nav-title-div">
                    <a href="/">AK & Travelers</a>
                    <img id="smallNav-close" src="/public/assets/icon/cross.svg" alt="" class="" />
                </div>

                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/destination/all.html" id="destinations-link">Destinations</a></li>
                    <li><a href="/destination/search.html?query=all" id="destinations-link">Activities</a></li>
                </ul>
            </div>
            <div class="bottom" id="">
                <a href="${url}"  class="btn-outline">${isLogin ? "Dashboard" : "Login"}</a>
            </div>
        </div>`
}
