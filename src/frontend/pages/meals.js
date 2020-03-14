// import { response } from "express";

const addMeal = () => {
  const title = document.getElementById("title");

  const description = document.getElementById("description");

  const location = document.getElementById("location");

  const when = document.getElementById("when");

  const max_reservation = document.getElementById("max_reservation");

  const price = document.getElementById("price");

  const date = document.getElementById("created_date");

  if (
    title.value == "" ||
    description.value == "" ||
    price.value == "" ||
    date.value == "" ||
    when.value == "" ||
    max_reservation.value == "" ||
    location.value == ""
  ) {
    alert("please make sure you have filled the form correctly");
  } else {
    fetch(`/api/meals/`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        Title: title.value,

        Description: description.value,

        Location: location.value,

        When: when.value,

        max_reservation: max_reservation.value,

        price: price.value,

        created_date: date.value
      })
    })
      .then(response => fetch(response.url))
      .then(response => response.json())
      .then(data => {
        console.log(data);
        alert(`you have added  ${title.value} to your meals`);
      });
  }
};
const deletIs = id => {
  fetch(`/api/meals/${id}`, {
    method: "DELETE"
  })
    .then(response => response.json())
    .then(result => console.log(result));
};
window.handleMealsRequest = () => {
  const allMeals = fetch("/api/meals")
    .then(response => response.json())
    .then(result => {
      const ulIs = document.getElementById("mealList");
      console.log(result);
      result.forEach(item => {
        const listIs = document.createElement("li");
        listIs.setAttribute("id", "mealsUl");
        listIs.innerHTML = ` ${item.Title} <a href="meal/${item.Id}" data-navigo>  Details </a>   <button id="remove" onClick="deletIs(${item.Id})"> Delet </button>`;
        ulIs.appendChild(listIs);
        console.log(item.Title);
      });
    });

  document.body.innerHTML = `

  <html>
  <head>
   <title> Meal Shering Website </title>
  </head>
<div id="mainBody">
<header>
<style> 
   body {
    background-image: url("https://www.rachnas-kitchen.com/wp-content/uploads/2015/03/Kadai-paneer.jpg");
  }
  </style>
<ul id="nav">
<li> <a href="home" data-navigo> Home </a> </li>
<li> <a href="meals" data-navigo >Meals</a>  </li>
</ul>
<img src="http://www.ranklogos.com/wp-content/uploads/2012/09/Circle-Of-Food-Logo.jpg" alt="logo"  id= "logo">
</header>

<div id="allMeal">
<h1> Create your meal </h1>
<form>
<label for="title"> Title : </label>
<input type="text" id="title" name="title">
<label for="description"> Description : </label>
<input type="text" id="description" name="description">

<label for="location"> Location: </label>
<input type="text" id="location" name="location">

<label for="when"> when: </label>
<input type="datetime" id="when" name="when">

<label for="max_reservation"> max_reservation : </label>
<input type="number" id="max_reservation" name="max_reservation">

<label for="price"> Price : </label>
<input type="number" id="price" name="price">
<label for="created_date"> Created date : </label>
<input type="date" id="created_date" name="created_date">

<button id="create_reservation" onClick ="addMeal()"> Create Meal</button>
</form>
<h1 id="sub"> All Meals </h1>
<ul id="mealList">
</ul>

</div>
<footer>
<p>© 2020 Copenhagen</p>
<p> Email : meal_sharing@meals.com <p>
</footer>
  <div>

</html>
</div> `;
};
