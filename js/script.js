document.addEventListener('DOMContentLoaded', init);

function init() {
    attachNavLinkEvents(); // Set up event delegation on the navbar
}

// Attach click event listener to the navbar using event delegation
function attachNavLinkEvents() {
    const navbar = document.querySelector('#navbarFood');
    navbar.addEventListener('click', handleNavClick);
}

// Handle navbar clicks and filter only food category links
function handleNavClick(event) {
    const clickedLink = event.target.closest('.nav-link[food-type]');
    if (!clickedLink) return; // Exit if the click wasn't on a valid food category link

    event.preventDefault();
    const foodType = clickedLink.getAttribute('food-type');
    setActiveNavLink(clickedLink); // Highlight the selected category
    loadFoodItems(foodType);       // Fetch and display food items for the selected category
}

const navLinks = document.querySelectorAll('.nav-link[food-type]');

// Set the clicked nav link as active and remove active class from others
function setActiveNavLink(activeLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Fetch food items and update UI accordingly
function loadFoodItems(foodType) {
    clearFoodItems();
    showLoader(true); // Show loader

    fetchFoodItems(foodType)
        .then(data => displayFoodCards(data.recipes))
        .catch(error => displayError(error))
        .finally(() => showLoader(false)); // Always hide the loader
}

// Perform an API request to fetch food items for a given category
function fetchFoodItems(foodType) {
    const url = `https://forkify-api.herokuapp.com/api/search?q=${foodType}`;
    return fetch(url).then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    });
}

const foodItemsContainer = document.getElementById('food-items');

function displayFoodCards(items) {
    if (!items || items.length === 0) {
        foodItemsContainer.innerHTML = `
            <div class="alert alert-warning text-center" role="alert">
                <strong>No items found</strong> for this category. Please try another one.
            </div>
        `;
        return;
    }

    // Create a card for each food item
    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'food-item col-sm-6 col-md-4 col-lg-3';
        itemDiv.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${item.image_url}" class="card-img-top" alt="${item.title}" loading="lazy">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text text-muted">By ${item.publisher}</p>
                </div>
            </div>
        `;
        foodItemsContainer.appendChild(itemDiv);
    });
}

function clearFoodItems() {
    foodItemsContainer.innerHTML = '';
}

const loaderWrapper = document.querySelector('.loader-wrapper');

function showLoader(isVisible) {
    loaderWrapper.classList.toggle('d-none', !isVisible);
}

function displayError(error) {
    console.error('Error fetching food items:', error.message);
    foodItemsContainer.innerHTML = `
        <div class="alert alert-danger text-center" role="alert">
            <strong>Oops!</strong> Something went wrong while loading the food items.<br>
            <span class="text-muted">(${error.message})</span><br>
            Please check your internet connection or try again later.
        </div>
    `;
}
