// all paths 
const allPaths = ["home-link", "posts-link", "post-2254-link", "post-2255-link"];

// script.js
document.addEventListener('DOMContentLoaded', () => {

    const app = document.getElementById('app');
    const pages = document.querySelectorAll('.page');
    const postElement = document.getElementById('post');
    const allPostsElement = document.getElementById('posts');
    const postIdElement = document.getElementById('post-id');
    const allPosts = document.getElementById("all-posts");

    // Function to handle navigation
    function navigate(event) {
        event.preventDefault();
        const path = event.target.getAttribute('href');
        window.history.pushState({}, path, window.location.origin + path);
        updatePage(path);
    }

    // Function to update the page based on the path
    function updatePage(path) {
        const allSearchParams = window.location.search.split("?")?.[1]?.split("&");

        let searchObj = {};
        allSearchParams?.forEach(s => {
            const arr = s.split("=");
            searchObj[`${arr[0]}`] = arr[1];
        })

        console.log({ searchObj });

        pages.forEach(page => page.classList.add('hidden'));

        if (path === '/' || path === '') {
            document.getElementById('home').classList.remove('hidden');
        }
        else if (searchObj?.post === 'all') {
            allPostsElement.classList.remove('hidden');
            // allPostsElement.innerHTML = `
            // <p>Hi there..</p>
            // `
            allPosts.innerHTML = `
            <div class="single-post">
                    <img src="/public/assets/menu/soup-bg.jpg" alt="">
                    <div>
                        <div>
                            <p>Price: $50</p>
                            <p>Ratings: *****</p>
                        </div>
                        <a href="/?post=1" onclick="navigate">View Details</a>
                    </div>
                </div>`
        }
        else if (searchObj?.post !== 'all') {
            postElement.classList.remove('hidden');
            postIdElement.textContent = searchObj?.post;

        }
        else {
            document.getElementById('home').classList.remove('hidden');
        }
    }

    // Attach event listeners to links
    allPaths.forEach(path => document.getElementById(path).addEventListener('click', navigate))


    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        updatePage(window.location.search);
    });

    // Initialize the page
    updatePage(window.location.search || '/');


});
