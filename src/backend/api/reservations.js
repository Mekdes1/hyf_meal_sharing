const express = require("express");
const app = express();
const router = express.Router();
const pool = require("../database");

router.get("/", (request, response) => {
  
    const query = pool.query("SELECT * FROM reservation ", function(error,results,field) {
      if (error) {
        throw error;
      }
      response.send(results);
    });
  
  });

router.post("/", (request, response) => {
  const  {name, meal_id, phonenumber, email} = request.body;

  const query = pool.query(" INSERT INTO reservation SET? ", request.body, function(error, results, fields) {
    if (error) {
      throw error;
    }
    response.send(` Added meal id : ${request.body.meal_id} to your reservation`);
  });


});

router.get("/:id", (request, response) => {
  const id = request.params.id;

  const query = pool.query("SELECT * From reservation WHERE id = ? ", id, function(
    error,
    results,
    fields
  ) {
    if (error) {
      throw error;
    }
    response.json(results);
  });
  
});

router.put("/:id", (request, response) => {
  const id = request.params.id;
  const  {number_of_guests, meal_id, created_date} = request.body;
  console.log(request.body)

  const query = pool.query( ` UPDATE reservation SET number_of_guests = ${request.body.number_of_guests} WHERE id = ?`  , id, function(error, results, fields) {
      if (error) {
        throw error;
      }
      response.send(` Updated reservation with id : ${id}`);
    }
  );
 
});

router.delete("/:id", (request, response) => {
  const id = request.params.id;

  const query = pool.query("DELETE FROM reservation WHERE id = ? ", id, function( error, results, fields ) {
    if (error) {
      throw error;
    }
    response.send(` Removed reservation with id : ${id}`);
  });
  console.log(query.sql, query.values);
});


module.exports = router;
