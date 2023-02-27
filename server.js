const { response } = require('express');
const express = require('express');
const res = require('express/lib/response');
const app = express();

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Cocktail Evening API';

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});

app.get('/', (request, response) => {
  response.send('Oh hey Cocktails');
});

app.get('/api/v1/event-offerings', (request, response) => {
  const cocktails = app.locals.eventOfferings
  response.status(200).json({ cocktails })
});

app.use(express.json());

app.post('/api/v1/event-offerings', (request, response) => {
  const { glass, id, hasAlcohol, image, ingredients, instructions, name } = request.body;
  app.locals.eventOfferings = [...app.locals.eventOfferings, { glass, hasAlcohol, id, image, ingredients, instructions, name }];
  response.status(201).json({ glass, hasAlcohol, id, image, ingredients, instructions, name })
}); //NOT WORKING YET - adding to locals BUT giving back 'undefined' as data, but it is giving a 'response' of ok and 201



app.locals.eventOfferings = [
  {
    glass: "Cocktail glass",
    hasAlcohol: true,
    id: "12322",
    image: "https://www.thecocktaildb.com/images/media/drink/tqyrpw1439905311.jpg",
    ingredients: ["1/2 oz  Strawberry schnapps", "1 oz  Tequila", "1/2 oz  Triple sec", "1 oz  Lemon juice", "1 oz  Strawberries", "... Salt"],
    instructions: "Rub rim of cocktail glass with lemon juice and dip rim in salt. Shake schnapps, tequila, triple sec, lemon juice, and strawberries with ice, strain into the salt-rimmed glass, and serve.",
    name: "Strawberry Margarita"
  },
  {
    glass: "Cocktail glass",
    hasAlcohol: true,
    id: "17218",
    image: "https://www.thecocktaildb.com/images/media/drink/mtdxpa1504374514.jpg",
    ingredients: ["6 cl Gin", "1.5 cl Vodka", "0.75 cl Lillet Blanc"],
    instructions: "Shake over ice until well chilled, then strain into a deep goblet and garnish with a thin slice of lemon peel.",
    name: "Vesper"
  }
]; 
/*
  - It resets every time the server refreshes and does not persist (for true server-side data storage, we would use a database) -- then what good is it?
  - If you host this is it just always running? If it goes down for some reason, all the data is just lost?
  - Difference between this express api and a 'database'? 
  - Did someone from 2208FE do GraphQL or some other BE for their mod 3 stretch tech?
*/