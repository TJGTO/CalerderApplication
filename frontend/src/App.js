import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Combinecompo from './components/Combinecompo';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/Classroom' component={Combinecompo} />
      </Switch>
    </Router>
  );
}

export default App;
