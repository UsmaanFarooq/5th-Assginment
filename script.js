const mealList = () => {
    let searchBox = document.getElementById("search-box").value;
    let key;
    if(searchBox.length == 1){
        key = "f";
    }
    else{
        key = "s";
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?${key}=${searchBox}`)
        .then((response) => response.json())
        .then((data) => {
            displayFood(data.meals);
        });
};

const displayFood = (foods) => {
    let mealsCard = document.getElementById("meals-card");
    if (foods === null || foods.length < 0) {
        const mealsDiv = document.createElement("div");
        alert("Are you sure you want to search this meal");
        const foodInfo = `
            <h2 class="mealName"> "Wrong Name Please Try again."</h2>
        `;
        mealsDiv.innerHTML = foodInfo;
        mealsCard.appendChild(mealsDiv);
    } else {
        foods.forEach((food) => {
            const mealsDiv = document.createElement("div");
            mealsDiv.className = "col-md-4 my-3";
            const mealsInfo = `
            <div onclick="displayMealDetails('${food.idMeal}')" class="card" style="width: 25rem;">
            <img  class="card-img-top" src="${food.strMealThumb}" alt="">
             <div class="card-body">
             <h3 class="mealName">${food.strMeal}</h3>
             </div>
            </div>
            `;
            mealsDiv.innerHTML = mealsInfo;
            mealsCard.appendChild(mealsDiv);
        });
    }
    document.getElementById("search-box").value = "";
}

const displayMealDetails = mealDetails => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealDetails}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            mealInfo(data.meals[0]);
        });
}

const mealInfo = food => {
    const mealDetail = document.getElementById('meal-details');
    const mealIngredients = [];
    for (let i = 1; i <= 20; i++) {
        if (food[`strIngredient${i}`]) {
            mealIngredients.push(`${food[`strMeasure${i}`]}-${food[`strIngredient${i}`]}`);
        } else {
            break;
        }
    }
    mealDetail.innerHTML = `
          <div class="card card">
     <img class="card-img-top" src="${food.strMealThumb}" alt="">
     <div class="card-body card-color" >
    <h3>${food.strMeal}</h3>
        <h6>Ingredients:</h6>
        <ul>
        ${mealIngredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
         </ul>
        </div>
         </div>
      `;
}