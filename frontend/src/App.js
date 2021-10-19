import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Main from './Components/Main';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
       <Main></Main>
      </div>
    </BrowserRouter>
  );
}

export default App;
