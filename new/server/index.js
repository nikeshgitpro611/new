const express = require("express");
const server = express();
const bodyParse = require("body-parser");
const cors = require("cors");
const mySql = require("mysql2");

//mySQl Connection
const db = mySql.createPool({
  host: "localhost",
  user: "root",
  password: "Nikesh@123",
  database: "crud_contact",
});

//Middleware Using

server.use(cors());
server.use(express.json());
server.use(bodyParse.urlencoded({ extended: true }));

//API POST


//Creating API route for Dispaly frnend table component

server.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM contact_db";
  db.query(sqlGet, (err, result) => {
    console.log();
    res.send(result);
  });
});



server.post("/api/post", (req, res) => {
    const { name, email, contact } = req.body;
    const sqlInser = "INSERT INTO contact_db (name,email,contact) VALUES(?,?,?)";
    db.query(sqlInser, [name, email, contact], (err, result) => {
      if (err) {
        console.log(err);
      }
    });
  });

  //Delet Operation ..

  server.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params;
    const sqlRemove= "DELETE FROM contact_db WHERE id=?";
    db.query(sqlRemove, id, (err, result) => {
      if (err) {
        console.log(err);
      }
    });
  });

  //edit

server.get("/api/get/:id", (req, res) => {
  const {id}= req.params;
  const sqlGet = "SELECT * FROM contact_db WHERE id= ?";
  db.query(sqlGet,id, (err, result) => {
    if (err) {
      console.log(err);
    }
    
    res.send(result);
  });
});

//update API from Put Methord
server.put("/api/update/:id", (req, res) => {
  const {id}= req.params;
  const {name,email,contact} = req.body;
  const sqlUpdate = "UPDATE contact_db SET name=?, email=?,contact=? WHERE id=?";
  db.query(sqlUpdate,[name,email,contact,id], (err, result) => {
    if (err) {
      console.log(err);
    }
    
    res.send(result);
  });
});

//define Route
// server.get("/", (req, res) => {
  //mysql
  // const sqlInsert =
  // "INSERT INTO contact_db (name,email,contact) VALUE('Nikesh kumar','nikesh@123.com',2294234884)";
  // db.query(sqlInsert,(err,result)=>{
  //  console.log("error",err);
  //  console.log("result",result);
  //  res.send("Default Pages");
  // })
// });

//define port
server.listen(3001, () => {
  console.log("Running Server");
});
