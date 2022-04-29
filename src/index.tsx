import { css, Global } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Global
        styles={css`
          body {
            background-color: #e8ecf0;
          }
        `}
      />
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
