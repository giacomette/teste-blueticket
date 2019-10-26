import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('Cria a aplicação se dar erro', async () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
