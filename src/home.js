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

  specialContainer.onclick = openModal;

  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(response => response.json())
    .then(data => {
      const mealImageURL = data.meals[0].strMealThumb;
      const mealName = data.meals[0].strMeal;

      specialContainer.innerHTML = `<img src="${mealImageURL}" alt="Special Meal">`;

      specialContainer.style.height = "45vh";
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
        <p style="color: #0000000; font-size: 16px; margin-left: 10px; margin-bottom: 10px;">${instructions}</p>
      `;
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

if (backdrop) {
  backdrop.onclick = closeModal;
}


document.getElementById("home-button").addEventListener("click", function() {
  window.location.href = "index.html";
});
document.getElementById("logo").addEventListener("click", function() {
  window.location.href = "index.html";
});







const searchBox =document.querySelector('.searchBox');
const searchBtn =document.querySelector('.searchBtn');
const recipeDetailsContent =document.querySelector('.recipe-details-content');
const recipeContainer =document.querySelector('.recipe-container');


const fetchRecipes = async (query) =>{
  recipeContainer.innerHTML = "<h2>Fetching recipies....</h2>";
  try {
    const data =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response =await data.json();
    
    recipeContainer.innerHTML = "";
    response.meals.forEach(meal =>{
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3

        `
    const button =document.createElement('button');
    button.textContent = "View recipe";
    recipeDiv.appendChild(button);
    button.addEventListener('click',()=>{
      openRecipePopup(meal);
    });

    recipeContainer.appendChild(recipeDiv);
  });
  }
  catch(error){
    recipeContainer.innerHTML = "<h2>Enter a valid Input...</h2>"
    
  }
}
const fetchIngredients = (meal) => {
  let ingredientsList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      ingredientsList += `<li>${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientsList;
};



const openRecipePopup = (meal) => {
  recipeDetailsContent.innerHTML = `
      <h2 class="recipeName">${meal.strMeal}</h2>
      <h3 class="ingredientsName">  Ingredients:</h3>
      <ul class="ingredientList">${fetchIngredients(meal)}</ul>
      <div>
          <h3 class="instructionName">Instructions:</h3>
          <p class="recipeInstructions">${meal.strInstructions}</p>
      </div>     
  `
  recipeDetailsContent.parentElement.style.display = "block";
  backdrop.style.display = "block"; 
  backdrop.onclick = () => {
    recipeDetailsContent.parentElement.style.display = "none";
    backdrop.style.display = "none"; 
  };
}


// .addEventListener('click', ()=>{
//   recipeDetailsContent.parentElement.style.display ="none";
// })
searchBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  const searchInput = searchBox.value.trim();
  if(!searchInput){
    recipeContainer.innerHTML = `<h2>Type the meal in the search box.<h2/>`;
    return;
  }
  fetchRecipes(searchInput);
  // console.log("Button Clicked");
});