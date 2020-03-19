window.handleHomeRequest = () => {
  document.body.innerHTML = `
  <html>
  <head>
   <title> Meal Shering Website </title>
   <style> 
   body {
    background-image: url("https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/7/0/6/3/783607-1-eng-GB/Big-data-Exhaustive-review-pulls-together-evidence-on-food-groups-and-diet-related-disease.jpg");
  }
  
   </style>
  </head>
<div id="mainBody">
<header>
<ul id="nav">
<li> <a href="home" data-navigo> Home </a> </li>
  <li> <a href="meals" data-navigo >Meals</a>  </li>
</ul>
</header>
<div id= "front">
<h1> Lets Eat </h1>
</div>
<footer>
<p>© 2020 Copenhagen</p>
<p> Email : meal_sharing@meals.com <p>
</footer>
  <div>

</html>

  

`;

  // if any links are added to the dom, use this function
  // make the router handle those links.
  router.updatePageLinks();
};
