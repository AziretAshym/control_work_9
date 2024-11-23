import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Categories from './containers/Categories/Categories';
import Transactions from './containers/Transactions/Transactions';

const App: React.FC = () => {
  return (<>
      <Navbar />
      <Routes>
        <Route path="/" element={<Transactions />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
  </>
);
};

export default App;
