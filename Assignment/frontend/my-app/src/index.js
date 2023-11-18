import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import './pages/instruction/styles.scss'
import App from './App';
import "react-toastify/dist/ReactToastify.css";

// import '../node_modules/@mdi/font/css/materialdesignicons.min.css';
// import '../node_modules/materialize-css/dist/css/materialize.min.css';
// import '../node_modules/materialize-css/dist/js/materialize.min.js';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
// import { render } from 'react-dom';
// const container = document.getElementById('app');
// render(<App tab="home" />, container);

// After
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);