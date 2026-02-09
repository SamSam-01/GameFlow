import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Chat from './views/Chat';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat/:slug" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
