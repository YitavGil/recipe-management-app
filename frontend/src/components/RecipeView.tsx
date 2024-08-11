import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Recipe } from '../types/types';
import colors from '../styles/colors';

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
  background: ${colors.cardBackground};
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 4px 20px ${colors.shadow};
  max-width: 600px;
  width: 100%;
  border: 3px solid ${colors.titleHover};
  position: relative;
  max-height: 80vh;
  overflow-y: auto;
`;

const Title = styled.h2`
  font-size: 2.2rem;
  color: ${colors.primaryText};
  margin-bottom: 20px;
  font-weight: 700;
  text-align: center;
  text-transform: capitalize;
`;

const Divider = styled.hr`
  border: none;
  border-top: 2px solid ${colors.titleHover};
  margin: 20px 0;
`;

const SectionTitle = styled.h3`
  font-size: 1.4rem;
  color: ${colors.secondaryText};
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
  color: ${colors.primaryText};
  font-size: 1.1rem;
  line-height: 1.5;
  display: flex;
  align-items: flex-start;
`;

const Bullet = styled.span`
  color: ${colors.titleHover};
  font-size: 1.2rem;
  margin-right: 10px;
  line-height: 1.5;
`;

const StepNumber = styled.span`
  font-weight: 600;
  color: ${colors.titleHover};
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
  color: ${colors.secondaryText};
  transition: color 0.3s ease;

  &:hover {
    color: ${colors.titleHover};
  }
`;