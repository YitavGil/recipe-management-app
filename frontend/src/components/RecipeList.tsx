// src/components/RecipeList.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import RecipeItem from './RecipeItem';
import RecipeForm from './RecipeForm';
import RecipeView from './RecipeView';
import { Recipe } from '../types/types';
import { getAllRecipes, createRecipe, updateRecipe, deleteRecipe } from '../services/api';
import colors from '../styles/colors';

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [viewingRecipe, setViewingRecipe] = useState<Recipe | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    const fetchedRecipes = await getAllRecipes();
    setRecipes(fetchedRecipes);
  };

  const handleCreateRecipe = async (recipe: Omit<Recipe, 'id'>) => {
    await createRecipe(recipe);
    fetchRecipes();
    setIsFormVisible(false);
  };

  const handleUpdateRecipe = async (recipe: Omit<Recipe, 'id'>) => {
    if (editingRecipe) {
      await updateRecipe(editingRecipe.id, recipe);
      fetchRecipes();
      setEditingRecipe(null);
    }
  };

  const handleDeleteRecipe = async (id: string) => {
    await deleteRecipe(id);
    fetchRecipes();
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Container>
      <Title>My Recipe Collection</Title>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <AddButton
          onClick={() => setIsFormVisible(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add New Recipe
        </AddButton>
      </SearchContainer>
      <AnimatePresence>
        {isFormVisible && (
          <ModalOverlay>
            <RecipeForm
              onSave={handleCreateRecipe}
              onCancel={() => setIsFormVisible(false)}
            />
          </ModalOverlay>
        )}
      </AnimatePresence>
      <Grid>
        <AnimatePresence>
          {filteredRecipes.map(recipe => (
            <RecipeItem
              key={recipe.id}
              recipe={recipe}
              onEdit={setEditingRecipe}
              onDelete={handleDeleteRecipe}
              onView={setViewingRecipe}
            />
          ))}
        </AnimatePresence>
      </Grid>
      {editingRecipe && (
        <ModalOverlay>
          <RecipeForm
            recipe={editingRecipe}
            onSave={handleUpdateRecipe}
            onCancel={() => setEditingRecipe(null)}
          />
        </ModalOverlay>
      )}
      {viewingRecipe && (
        <ModalOverlay>
          <RecipeView
            recipe={viewingRecipe}
            onClose={() => setViewingRecipe(null)}
          />
        </ModalOverlay>
      )}
    </Container>
  );
};

export default RecipeList;

const Container = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(135deg, ${colors.backgroundGradientStart} 0%, ${colors.backgroundGradientEnd} 100%);
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${colors.primaryText};
  text-align: center;
  margin-bottom: 30px;
  font-weight: 700;
  text-shadow: 1px 1px 2px ${colors.shadow};

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  padding: 12px;
  border: 1px solid ${colors.border};
  border-radius: 6px;
  font-size: 1rem;
  width: 100%;
  max-width: 300px;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 2px 4px ${colors.shadow};

  @media (max-width: 768px) {
    max-width: none;
  }
`;

const AddButton = styled(motion.button)`
  padding: 12px 20px;
  background-color: ${colors.primaryButton};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
  font-size: 1rem;
  box-shadow: 0 2px 4px ${colors.shadow};

  &:hover {
    background-color: ${colors.primaryButtonHover};
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;