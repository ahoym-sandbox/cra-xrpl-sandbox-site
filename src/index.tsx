import { css, Global } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Global
      styles={css`
        body {
          background-color: #e8ecf0;
        }
      `}
    />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
