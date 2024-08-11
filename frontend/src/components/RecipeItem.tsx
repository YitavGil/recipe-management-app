import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Recipe } from '../types/types';

interface RecipeItemProps {
  recipe: Recipe;
  onEdit: (recipe: Recipe) => void;
  onDelete: (id: string) => void;
  onView: (recipe: Recipe) => void;
}

const RecipeItem: React.FC<RecipeItemProps> = ({ recipe, onEdit, onDelete, onView }) => {
  return (
    <StyledRecipeItem
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Title onClick={() => onView(recipe)}>{recipe.title}</Title>
      <MetaInfo>{recipe.ingredients.length} ingredients • {recipe.steps.length} steps</MetaInfo>
      <ButtonContainer>
        <EditButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onEdit(recipe)}
        >
          Edit
        </EditButton>
        <DeleteButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onDelete(recipe.id)}
        >
          Delete
        </DeleteButton>
      </ButtonContainer>
    </StyledRecipeItem>
  );
};

export default RecipeItem;

const StyledRecipeItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h3`
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.3s ease;
  text-transform: capitalize;
  &:hover {
    color: #ed8936;
  }
`;

const MetaInfo = styled.p`
  font-size: 0.9rem;
  color: #718096;
  margin-bottom: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled(motion.button)`
  padding: 8px 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
`;

const EditButton = styled(Button)`
  background-color: #4299e1;
  color: white;

  &:hover {
    background-color: #3182ce;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #f56565;
  color: white;

  &:hover {
    background-color: #e53e3e;
  }
`;