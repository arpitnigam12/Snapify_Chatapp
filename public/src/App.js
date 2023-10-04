
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Register from './pages/Register';
import Chat from './pages/Chat';
import Login from './pages/Login';
//import Home from './pages/Home';




export default function App() {
  return (
    <BrowserRouter>
<Routes>
  <Route path="/register" element={<Register/>} />

  <Route path="/" element={<Login/>} />

  <Route path="/Chat" element={<Chat/>} />
</Routes>
  </BrowserRouter>
  );
}

