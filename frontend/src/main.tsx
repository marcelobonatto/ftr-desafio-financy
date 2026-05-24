import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './global.css';
import App from './App.tsx';
import { apolloClient } from '@/lib/graphql/apollo.ts';
import { ApolloProvider } from '@apollo/client/react';

// Renderiza a aplicação no elemento 'root'.
// <StrictMode>StrictMode</StrictMode> é usado para detectar problemas potenciais no código.
// <ApolloProvider> Envolve a aplicação com o provider do Apollo Client para gerenciamento de estado global.
// <BrowserRouter> Envolve a aplicação com o BrowserRouter para gerenciamento de rotas.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
)
