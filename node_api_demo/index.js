const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const mongoDB = 'mongodb://localhost:27017/dog_api'
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

const objectIdString = new mongoose.Types.ObjectId().toString();
console.log(objectIdString);

const dogSchema = new mongoose.Schema({
    name: String,
    breed: String,
    age: Number
})

const Dog = mongoose.model('Dog', dogSchema)

const app = express()
const port = 4567

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/* 

const dogs = [
    {name:"AAA", breed:"QWERT"},
    {name:"BBB", breed:"ASDFG"},
    {name:"CCC", breed:"POIUY"},
    {name:"DDD", breed:"LKJHG"}
]


 */

app.get("/", (req, res) => {
    Dog.find()
      .exec()
      .then((dogs) => {
        res.json(dogs);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "An error occurred" });
      });
  });
  
  


  app.get("/dogs/:id", (req, res) => {
    Dog.findById(req.params.id)
      .exec()
      .then((dog) => {
        if (!dog) {
          return res.status(404).json({ error: "Dog not found" });
        }
        res.json(dog);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "An error occurred" });
      });
  });
  
  


app.post("/dogs", (req, res) => {
    console.log(req.body)
    res.json({message: "ok"})

})

app.put("/dogs/:id", (req, res) => {
    console.log(req.params.id)
    console.log(req.body)
    res.json({message: `updated dog ${req.params.id}`})

})


app.delete("/dogs/:id", (req, res) => {
    console.log(req.params.id)
    res.json({message: `deleting dog ${req.params.id}`})

})



app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

