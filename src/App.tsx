import { Outlet } from 'react-router-dom'; // Remove Router, Routes, Route imports
import Nav from './components/Nav';

function App() {
  return (
    <>
      <Nav />
      <main>
        <Outlet /> {/* Outlet for nested routes defined in main.tsx */}
      </main>
    </>
  );
}

export default App;
