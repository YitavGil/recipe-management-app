import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Recipe } from '../types/types';

interface Props {
  recipe: Recipe;
  onClose: () => void;
}

const RecipeView: React.FC<Props> = ({ recipe, onClose }) => {
  return (
    <ViewContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <CloseButton
        onClick={onClose}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        ×
      </CloseButton>
      <Title>{recipe.title}</Title>
      <SectionTitle>Ingredients:</SectionTitle>
      <List>
        {recipe.ingredients.map((ingredient, index) => (
          <ListItem key={index}>{ingredient}</ListItem>
        ))}
      </List>
      <SectionTitle>Steps:</SectionTitle>
      <List>
        {recipe.steps.map((step, index) => (
          <ListItem key={index}>{index + 1}. {step}</ListItem>
        ))}
      </List>
    </ViewContainer>
  );
};

export default RecipeView;

const ViewContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  border: 3px solid #ed8936;
  position: relative;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 20px;
  font-weight: 700;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  color: #4a5568;
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: 600;
`;

const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

const ListItem = styled.li`
  margin-bottom: 8px;
  color: #2d3748;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #4a5568;
`;