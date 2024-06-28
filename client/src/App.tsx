import { useState } from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import './App.css';
import PlansPage from './pages/PlansPage';
import BrowsePage from './pages/BrowsePage';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <BrowsePage />
      </div>
    </>
  );
}

export default App;
