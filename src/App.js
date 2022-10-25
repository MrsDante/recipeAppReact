import React, { useState, useEffect } from 'react';
import Recipe from './Recipe';
import './App.css';

function App() {

  const APP_ID = '1d24896f';
  const APP_KEY = 'f722fdd072f9e636fb7ec070fc6e0180';

  //const exampleRequest = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect( () => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
//console.log(data.hits)
    setRecipes(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return (
    <div className="App">
      <form onSubmit={getSearch} className='search-form'>
        <input 
          value={search} 
          onChange={updateSearch}
          className="search-bar" 
          type="text" />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe 
          key={recipe.recipe.label}
          title={recipe.recipe.label} 
          calories={recipe.recipe.calories} 
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
}

export default App;
