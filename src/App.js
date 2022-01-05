import logo from './logo.svg';
import './App.css';
import { Products } from './Products/Products'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { ProductDetails } from './Products/ProductDetails';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Products} />
          <Route exact path="/products/:id" component={ProductDetails} />
          <Redirect to="/" />  
        </Switch>  
      </Router>
    </div>
  );
}

export default App;
