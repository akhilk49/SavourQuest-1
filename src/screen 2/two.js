document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM content loaded");

  var specialContainer = document.getElementById("special-container");
  var modal = document.querySelector('#myModal');
  var backdrop = document.querySelector('#backdrop');

  function openModal() {
    modal.style.display = 'block';
    if (backdrop) {
      backdrop.style.display = 'block';
    }
  }

  function closeModal() {
    modal.style.display = 'none';
    if (backdrop) {
      backdrop.style.display = 'none';
    }
  }

  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(response => response.json())
    .then(data => {
      const mealImageURL = data.meals[0].strMealThumb;
      const mealName = data.meals[0].strMeal;

      specialContainer.innerHTML = `<img src="${mealImageURL}" alt="Special Meal">`;

      specialContainer.style.height = "40vh";
      specialContainer.style.width = "40vw";

      const mealImage = specialContainer.querySelector("img");
      mealImage.style.width = "100%";
      mealImage.style.height = "100%";

      const dishNameElement = document.createElement("div");
      dishNameElement.textContent = mealName;
      dishNameElement.style.position = "absolute";
      dishNameElement.style.bottom = "0";
      dishNameElement.style.right = "1";
      dishNameElement.style.backgroundColor = "#b37f7f";
      dishNameElement.style.padding = "5px 10px 5px 0px ";
      dishNameElement.style.fontSize = "20px";
      specialContainer.appendChild(dishNameElement);

      const ingredients = getIngredients(data.meals[0]);
      const instructions = data.meals[0].strInstructions;

      modal.innerHTML = `
        <h3 style="color: #0000000 ; font-size: 24px; margin: 10px;">${mealName}</h3>
        <h4 style="color: #0000000; font-size: 18px; margin: 10px;">Ingredients:</h4>
        <ul style="list-style-type: disc; margin-left: 25px; color: #0000000;">${ingredients}</ul>
        <h4 style="color: #0000000; font-size: 18px; margin-left: 10px; margin-top: 10px; margin-bottom: 10px;">Instructions:</h4>
        <p style="color: #0000000; font-size: 16px; margin-left: 10px">${instructions}</p>
      `;

      openModal();
    })
    .catch(error => {
      console.error("Error fetching meal data:", error);
    });

  if (backdrop) {
    backdrop.onclick = closeModal;
  }

  function getIngredients(meal) {
    let ingredients = '';
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && measure) {
        ingredients += `<li style="margin-bottom: 5px;">${measure} ${ingredient}</li>`;
      }
    }
    return ingredients;
  }
});

var specialContainer = document.querySelector('#special-container');
var modal = document.querySelector('#myModal');
var backdrop = document.querySelector('#backdrop');

function openModal() {
  modal.style.display = 'block';
  if (backdrop) {
    backdrop.style.display = 'block';
  }
}

function closeModal() {
  modal.style.display = 'none';
  if (backdrop) {
    backdrop.style.display = 'none';
  }
}

specialContainer.onclick = openModal;
if (backdrop) {
  backdrop.onclick = closeModal;
}
document.getElementById("home-button").addEventListener("click", function() {
  window.location.href = "../../index.html";
});
