import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import createReduxStore from './store';
import ShoppingItemList from './containers/ShoppingItemList';

const { store, persistor } = createReduxStore();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ShoppingItemList></ShoppingItemList>
      </PersistGate>
    </Provider>
  );
}

export default App;
