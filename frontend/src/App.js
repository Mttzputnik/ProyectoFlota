import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AdminRoutes } from './routes/AdminRoutes';

function App() {
  return (
    
    <BrowserRouter>
      <AdminRoutes />
    </BrowserRouter>
    
  );
}

export default App;
