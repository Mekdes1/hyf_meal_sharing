const express = require("express");
const app = express();
const router = express.Router();
const pool = require("./../database");

router.post("/", (request, response) => {
  const  {Title, Description, Location, When, max_reservation,Price, created_date} = request.body;
  const query = pool.query(" INSERT INTO meal SET? ", request.body, function( error,results,field) {
    if (error) {
      throw error;
    }
    response.send(` Added ${request.body.Title} to your meal`);
  });

  console.log(query.sql, query.values);
});

router.get("/:id", (request, response) => {
  const id = request.params.id;

  const query = pool.query("SELECT * From meal WHERE id = ? ", id, function( error, results, fields) {
    if (error) {
      throw error;
    }
    response.json(results);
  });
  console.log(query.sql, query.values);
});

router.put("/:id", (request, response) => {
  const id = request.params.id;

  const query = pool.query(
    "UPDATE meal SET title = 'pasta'  WHERE id = ? ",
    id,
    function(error, results, fields) {
      if (error) {
        throw error;
      }
      response.send(` Updated meal with id : ${id}`);
    }
  );
  console.log(query.sql, query.values);
});

router.delete("/:id", (request, response) => {
  const id = request.params.id;

  const query = pool.query("DELETE FROM meal WHERE id = ? ", id, function(
    error,
    results,
    fields
  ) {
    if (error) {
      throw error;
    }
    response.send(` Removed meal with id : ${id}`);
  });
  console.log(query.sql, query.values);
});

// GET api/meals/ query parameters

router.get("/", (request, response) => {
  const maxPrice = request.query.maxPrice;
  const availableReservations = request.query.availableReservations;
  const title = request.query.title;
  const createdAfter = request.query.createdAfter;
  const limit = request.query.limit;
  console.log(request.url === "/");

  if (request.url === "/") {
    const query = pool.query("select * from meal ", function(error,results,fields) {
      if (error) {
        throw error;
      }
      response.send(results);
    });
  } else if (maxPrice) {
    const query = pool.query("select * from meal where price < ? ",maxPrice, function(error, results, fields) {
        if (error) {
          throw error;
        }
        response.send(results);
      }
    );
  } else if (availableReservations) {
    if (availableReservations === "true") {
      const query = pool.query("select Meal.Id,Meal.Title, Meal.max_reservation ,sum(Reservation.number_of_guests) as total from Meal inner join Reservation on Reservation.meal_id = Meal.Id group by Meal.Id having total < max_reservation;",
        function(error, results, fields) {
          if (error) {
            throw error;
          }
          response.send(results);
        }
      );
    } else {
      response.send("can not show available reservations");
    }
  } else if (title) {
    const query = pool.query(
      "select * from meal where Title like ? ", title,function(error, results, fields) {
        if (error) {
          throw error;
        }
        response.send(results);
      }
    );
  } else if (createdAfter) {
    const query = pool.query("select * from meal where created_date > ? ", createdAfter,function(error, results, fields) {
        if (error) {
          throw error;
        }
        response.send("working");
      }
    );
  } else if (limit) {
    console.log(limit);
    const query = pool.query("select* from Meal limit ? ",parseInt(limit),function(error, results, fields) {
        if (error) {
          throw error;
        }
        response.send(results);
      }
    );
  } else {
    response.send("make sure you are in the correct path");
  }
});

module.exports = router;
