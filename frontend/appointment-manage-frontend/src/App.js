import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './routes/Login';
import Register from './routes/Register';
import UserDashboard from './routes/UserDashboard';
import BusinessDashboard from './routes/BusinessDashboard';
import Home from './routes/Home';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store = {store}>
      <BrowserRouter>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/user-dashboard' component={UserDashboard}/>
            <Route path='/business-dashboard' component={BusinessDashboard}/>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
