# 🍽️ My Food

A responsive and interactive food menu web application built using **HTML**, **CSS (Bootstrap)**, and **JavaScript**.  
It dynamically fetches and displays food recipes based on selected categories using the [Forkify API](https://forkify-api.herokuapp.com/).

---

## 🚀 Features

- ✅ Sticky Bootstrap 5 navbar
- ✅ Dynamic loading of food items via API
- ✅ Animated custom loader during fetch
- ✅ Responsive grid layout
- ✅ Error handling for failed requests or empty API responses 

---

## 📸 Demo

> Click on a food category (e.g., **Pizza**, **Salad**) to fetch recipes from the API.  
> Recipes are displayed as cards showing images, titles, and publisher names.

---

## 🛠️ Technologies Used

| Technology     | Purpose                      |
|----------------|------------------------------|
| **HTML5**       | Page structure               |
| **CSS3**        | Styling and layout           |
| **Bootstrap 5** | Responsive design framework  |
| **JavaScript**  | Interactivity and API logic  |
| **Forkify API** | Source for recipe data       |

---

## ⚙️ How It Works

1. The navbar contains clickable food categories: `Pizza`, `Salad`, `Beef`, `Pasta`.
2. When clicked, the app fetches recipes using the Forkify API.
3. A custom animated loader is shown while fetching.
4. Recipes are rendered dynamically in a card-based responsive grid.
5. If no items are found or a network error occurs, an error alert is shown.

---

## ⚙️ How to Run Locally

1. Clone the repo:
   ```bash
   git clone https://github.com/Ahmed-Aseel/ITI_ES6_MyFood.git
   cd ITI_ES6_MyFood
2. Open index.html in any browser.
3. Click on a food category.