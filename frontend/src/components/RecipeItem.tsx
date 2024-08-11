import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Recipe } from '../types/types';
import colors from '../styles/colors';

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
  background: ${colors.cardBackground};
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px ${colors.shadow};
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: 0 6px 8px ${colors.shadow};
    transform: translateY(-2px);
  }
`;

const Title = styled.h3`
  font-size: 1.5rem;
  color: ${colors.primaryText};
  margin-bottom: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.3s ease;
  text-transform: capitalize;
  &:hover {
    color: ${colors.titleHover};
  }
`;

const MetaInfo = styled.p`
  font-size: 0.9rem;
  color: ${colors.secondaryText};
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
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const EditButton = styled(Button)`
  background-color: ${colors.secondaryButton};
  color: white;

  &:hover {
    background-color: ${colors.secondaryButtonHover};
  }
`;

const DeleteButton = styled(Button)`
  background-color: ${colors.dangerButton};
  color: white;

  &:hover {
    background-color: ${colors.dangerButtonHover};
  }
`;