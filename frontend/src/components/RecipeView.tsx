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
      <Divider />
      <SectionTitle>Ingredients</SectionTitle>
      <List>
        {recipe.ingredients.map((ingredient, index) => (
          <ListItem key={index}>
            <Bullet>•</Bullet>
            {ingredient}
          </ListItem>
        ))}
      </List>
      <Divider />
      <SectionTitle>Steps</SectionTitle>
      <List>
        {recipe.steps.map((step, index) => (
          <ListItem key={index}>
            <StepNumber>{index + 1}.</StepNumber>
            {step}
          </ListItem>
        ))}
      </List>
    </ViewContainer>
  );
};

export default RecipeView;

const ViewContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  max-width: 600px;
  width: 100%;
  border: 3px solid #ed8936;
  position: relative;
  max-height: 80vh;
  overflow-y: auto;
`;

const Title = styled.h2`
  font-size: 2.2rem;
  color: #2c3e50;
  margin-bottom: 20px;
  font-weight: 700;
  text-align: center;
  text-transform: capitalize;
`;

const Divider = styled.hr`
  border: none;
  border-top: 2px solid #ed8936;
  margin: 20px 0;
`;

const SectionTitle = styled.h3`
  font-size: 1.4rem;
  color: #4a5568;
  margin-top: 20px;
  margin-bottom: 15px;
  font-weight: 600;
`;

const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

const ListItem = styled.li`
  margin-bottom: 12px;
  color: #2d3748;
  font-size: 1.1rem;
  line-height: 1.5;
  display: flex;
  align-items: flex-start;
`;

const Bullet = styled.span`
  color: #ed8936;
  font-size: 1.2rem;
  margin-right: 10px;
  line-height: 1.5;
`;

const StepNumber = styled.span`
  font-weight: 600;
  color: #ed8936;
  margin-right: 10px;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: #4a5568;
  transition: color 0.3s ease;

  &:hover {
    color: #ed8936;
  }
`;