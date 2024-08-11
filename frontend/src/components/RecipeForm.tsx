import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Recipe } from '../types/types';


interface Props {
  recipe?: Recipe;
  onSave: (recipe: Omit<Recipe, 'id'>) => void;
  onCancel: () => void;
}

const RecipeForm: React.FC<Props> = ({ recipe, onSave, onCancel }) => {
  const [title, setTitle] = useState(recipe?.title || '');
  const [ingredients, setIngredients] = useState(recipe?.ingredients.join('\n') || '');
  const [steps, setSteps] = useState(recipe?.steps.join('\n') || '');

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title);
      setIngredients(recipe.ingredients.join('\n'));
      setSteps(recipe.steps.join('\n'));
    }
  }, [recipe]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      ingredients: ingredients.split('\n').filter(i => i.trim() !== ''),
      steps: steps.split('\n').filter(s => s.trim() !== ''),
    });
  };

  return (
    <FormContainer
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Recipe Title"
        required
      />
      <TextArea
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Ingredients (one per line)"
        rows={5}
        required
      />
      <TextArea
        value={steps}
        onChange={(e) => setSteps(e.target.value)}
        placeholder="Steps (one per line)"
        rows={5}
        required
      />
      <ButtonContainer>
        <CancelButton
          type="button"
          onClick={onCancel}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Cancel
        </CancelButton>
        <SaveButton
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Save Recipe
        </SaveButton>
      </ButtonContainer>
    </FormContainer>
  );
};

export default RecipeForm;


const FormContainer = styled(motion.form)`
  background: rgba(255, 255, 255, 0.9);
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  resize: vertical;
  font-family: 'Poppins', sans-serif;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled(motion.button)`
  padding: 10px 15px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
`;

const SaveButton = styled(Button)`
  background-color: #48bb78;
  color: white;

  &:hover {
    background-color: #38a169;
  }
`;

const CancelButton = styled(Button)`
  background-color: #e2e8f0;
  color: #4a5568;

  &:hover {
    background-color: #cbd5e0;
  }
`;