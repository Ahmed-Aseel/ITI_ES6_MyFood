document.addEventListener('DOMContentLoaded', init);

function init() {
    attachNavLinkEvents();
}

const navLinks = document.querySelectorAll('.nav-link[food-type]');

function attachNavLinkEvents() {
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
}

function handleNavClick(event) {
    event.preventDefault();
    const foodType = event.target.getAttribute('food-type');
    setActiveNavLink(event.target);
    loadFoodItems(foodType);
}

function setActiveNavLink(activeLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

function loadFoodItems(foodType) {
    clearFoodItems();
    showLoader(true);

    fetchFoodItems(foodType)
        .then(data => {
            showLoader(false);
            displayFoodCards(data.recipes);
        })
        .catch(error => {
            showLoader(false);
            displayError(error);
        });
}

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
        throw new Error('No results found.');
    }

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
