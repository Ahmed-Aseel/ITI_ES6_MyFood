const navLinks = document.querySelectorAll('.nav-link[food-type]');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior
        const foodType = e.target.getAttribute('food-type');
        loadFoodItems(foodType);
    });
});

const loaderWrapper = document.querySelector('.loader-wrapper');
const foodItemsContainer = document.getElementById('food-items');

function loadFoodItems(foodType) {
    foodItemsContainer.innerHTML = ''; // Clear previous items
    loaderWrapper.classList.remove('d-none'); // Show loader

    const url = `https://forkify-api.herokuapp.com/api/search?q=${foodType}`; // Replace with actual API URL
    fetch(url)
        .then(response => response.json())
        .then(data => {
            loaderWrapper.classList.add('d-none'); // Hide loader
            data.recipes.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'food-item col-md-4';
                itemDiv.innerHTML = `
                    <img src="${item.image_url}" class="w-100" alt="${item.title}">
                    <h4>${item.title}</h4>
                    <h5>${item.publisher}</h5>
                `;
                foodItemsContainer.appendChild(itemDiv);
            });
        })
        .catch(error => {
            loaderWrapper.classList.add('d-none'); // Hide loader on error
            console.error('Error fetching food items:', error);
            foodItemsContainer.innerHTML = '<p class="text-danger">Error loading food items. Please try again later.</p>';
        });
    
}