import logo from './logo.svg';
import './App.css';
import Calendar from './components/Calendar';
import Header from './components/Header';
function App() {
  return (
    <div style={{marginLeft:"10px",marginRight:"10px"}}>
      <Header/>
      <Calendar/>
    </div>
  );
}

export default App;
