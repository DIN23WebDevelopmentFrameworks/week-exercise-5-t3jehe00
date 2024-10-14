
/*
const App = () => {


  return (
    <div>
        <h1>ACME Recipe O'Master</h1>
        <div>Remove this and implement recipe tag list here. </div>
        <ul>
        <li>On start the application displays a list of recipe tags such as 'pasta', 'cookies' etc. The tag information is loaded from an API (https://dummyjson.com/recipes/tags)</li>
        <li> The user can click on a tag and the application will then hide the tag list and display a list of recipes matching the selected tag. The recipe information for the clicked tag is loaded from an API (https://dummyjson.com/recipes/tag/Pizza).</li>
        <li> User can also go back to the tag list. </li>
        <li> Each receipe is displayed as box where recipe data such as ingredients and instructions are displayed</li>
        </ul>
    </div>
  );
};

export default App;
*/

import React, { useState, useEffect } from 'react';
import RecipeTagList from './RecipeTagList';
import RecipeList from './RecipeList';
import { IRecipe } from '../types'; // Assume this file exports the IRecipe interface

const App = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch the tags when the component mounts
  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true);
      const response = await fetch('https://dummyjson.com/recipes/tags');
      const data = await response.json();
      setTags(data);
      setLoading(false);
    };

    fetchTags();
  }, []);

  // Fetch recipes based on the selected tag
  useEffect(() => {
    if (selectedTag) {
      const fetchRecipes = async () => {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/recipes/tag/${selectedTag}`);
        const data = await response.json();
        setRecipes(data.recipes);
        setLoading(false);
      };
      fetchRecipes();
    }
  }, [selectedTag]);

  return (
    <div>
      <h1>ACME Recipe O'Master</h1>
      {selectedTag ? (
        <>
          <button onClick={() => setSelectedTag(null)}>Back</button>
          {loading ? <p>Loading recipes...</p> : <RecipeList recipes={recipes} />}
        </>
      ) : (
        <>
          {loading ? <p>Loading tags...</p> : <RecipeTagList tagList={tags} onSelectTag={setSelectedTag} />}
        </>
      )}
    </div>
  );
};

export default App;


