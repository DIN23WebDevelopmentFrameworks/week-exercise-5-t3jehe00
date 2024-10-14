import React from 'react';
import RecipeTag from './RecipeTag';

interface IRecipeTagListProps {
  tagList: string[];
  onSelectTag: (tagName: string) => void;
}

const RecipeTagList: React.FC<IRecipeTagListProps> = ({ tagList, onSelectTag }) => {
  return (
    <div>
      <h2>Choose a tag below</h2>
      <ul>
        {tagList.map(tag => (
          <RecipeTag key={tag} tagName={tag} onSelectTag={onSelectTag} />
        ))}
      </ul>
    </div>
  );
};

export default RecipeTagList;
