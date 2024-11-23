import Navbar from './components/Navbar/Navbar.tsx';
import { Route, Routes } from 'react-router-dom';
import Categories from './Categories/Categories.tsx';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Categories />} />
      </Routes>

    </div>
  );
};

export default App;