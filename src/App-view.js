import './styles/fonts.css';
import './styles/index-view.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Viewer, Plaque } from './pages';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Switch>
        <Route path="/plaque/:gamer">
          <Plaque />
        </Route>
        <Route path="/view/:tokenId">
          <Viewer />
        </Route>
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
