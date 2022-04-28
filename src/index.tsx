import { css, Global } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { XrplClientsProvider } from './contexts/XrplClientsContext';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Global
      styles={css`
        body {
          background-color: #e8ecf0;
        }
      `}
    />
    <XrplClientsProvider>
      <App />
    </XrplClientsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
