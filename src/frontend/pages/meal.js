//  import { response } from "express";

const review = id => {
  const title = document.getElementById("title");

  const description = document.getElementById("description");

  const review = id;

  const stars = document.getElementById("stars");

  const created_date = document.getElementById("created_date");

  if (
    title.value == "" ||
    description.value == "" ||
    stars.value == "" ||
    created_date.value == ""
  ) {
    alert("please make sure you have filled the form correctly");
  } else {
    fetch(`/api/reviews/`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        Title: title.value,

        Description: description.value,

        review_meal_id: review,

        stars: stars.value,

        created_date: created_date.value
      })
    })
      .then(response => fetch(response.url))
      .then(response => response.json())
      .then(data => {
        console.log(data);
        alert(`your review has been submitted. `);
      });
  }
};

const reserv = id => {
  const name = document.getElementById("name");

  const phone = document.getElementById("phone_number");

  const email = document.getElementById("email");

  if (name.value == "" || phone.value == "" || email.value == "") {
    alert("please make sure you have filled the form correctly");
  } else {
    fetch(`/api/reservations/`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        name: name.value,

        meal_id: id,

        phonenumber: phone.value,

        email: email.value
      })
    })
      .then(response => fetch(response.url))
      .then(response => response.json())
      .then(data => {
        console.log(data);
        alert(`you have sucessfully made reservations for meal_id ${id} `);
      });
  }
};

window.handleMealRequest = params => {
  const allMeals = fetch(`/api/meals/${params.id}`)
    .then(response => response.json())
    .then(result => {
      result.forEach(item => {
        const yourMealIs = document.getElementById("yourMeal");
        const mealData = document.createElement("p");
        mealData.innerHTML = ` <h2>${item.Title}</h1> </br> Description :  ${item.Description} </br> Location : ${item.Location} 
    </br> when : ${item.When} </br> max_reservation : ${item.max_reservation} </br> Price : ${item.Price}
    <h1> Make reservations </h1>

<form id="meal_form">
<label for="name"> Name : </label>
<input type="text" id="name" name="name">
<label for="phone_number"> Phone number : </label>
<input type="number" id="phone_number" name="phone_number">
<label for="email"> Email : </label>
<input type="email" id="email" name="email">
</form>
<button id="create_reservation" onClick ="reserv(${item.Id})"> Book seat </button>



<h1> Give us your feedback </h1>
<form id = "meal_form">
<label for="title"> Title : </label>
<input type="text" id="title" name="title">
<label for="description"> Description : </label>
<input type="text" id="description" name="description">
<label for="stars"> Stars : </label>
<input type="number" id="stars" name="stars">
<label for="created_date"> Created date : </label>
<input type="date" id="created_date" name="created_date">

</form>
<button id="create_reservation" onClick ="review(${item.Id})"> Review </button>


`;
        yourMealIs.appendChild(mealData);
      });
    });
};

document.body.innerHTML = ` 

<html>
<head>
 <title> Meal Shering Website </title>
</head>
<div id="mainBody">
<header>
<style> 
 body {
  background-image: url("https://entermedia.io/wp-content/uploads/2019/05/049.jpg");
}
</style>
<ul id="nav">
<li> <a href="home" data-navigo> Home </a> </li>
<li> <a href="meals" data-navigo >Meals</a>  </li>
</ul>
<img src="http://www.ranklogos.com/wp-content/uploads/2012/09/Circle-Of-Food-Logo.jpg" alt="logo"  id= "logo">
</header>
<div id="yourMeal">
</div>

<footer>
<p>© 2020 Copenhagen</p>
<p> Email : meal_sharing@meals.com <p>
</footer>
<div>

</html> `;
