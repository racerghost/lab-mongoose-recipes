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
    return Recipe.insertMany(data)

  })
  .then(()=>{
    return Recipe.find({})
      .then(allRecipes => {
        (allRecipes.forEach(recipe=>{
          return (console.log('Platos: ',recipe.title));
        }));
      })
      .catch(error => {
        console.log('Error finding for recipes');
      });
  })
  .then(()=>{
    let filter={title:"Rigatoni alla Genovese"};
    let update={duration:100};
    return Recipe.findOneAndUpdate (filter,update)
      
  })
  .then(()=>{
    let filter={title:"Rigatoni alla Genovese"};
    let update={duration:100};
    return Recipe.findOneAndUpdate (filter,update)
      
  })
  .then(()=>{
    filter={title:"Carrot Cake"};
    return Recipe.deleteOne (filter);
    
  })
  .then(()=>{
        // console.log(mongoose.connection.readyState); 
      mongoose.connection.close()
      .then(() => {
        console.log('disconnected!');
      })
      .catch(() => {
        console.log('error disconnected');
      })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  