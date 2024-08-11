import React from 'react';
import styled from 'styled-components';
import RecipeList from './components/RecipeList';

const App: React.FC = () => {
  return (
    <AppContainer>
      <RecipeList />
    </AppContainer>
  );
};

export default App;

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f6e05e 0%, #ed8936 100%);
`;
