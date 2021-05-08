const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { db } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    
    // data.forEach(element => {
    //   console.log ("Showed title before inserting: ",element.title);
    //   Recipe.create (element);
    // });
    Recipe.insertMany(data)

  })
  .then(()=>{
    Recipe.find({})
      .then(oneRecipe => {
        console.log(oneRecipe);
      })
      .catch(error => {
        console.log('Error finding for recipes');
      });
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  