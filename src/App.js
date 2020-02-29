import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Dashboard} exact />
        {/* Not implemented */}
        <Route path="/reports" component={Dashboard} />
      </Switch>
    </main>
  );
}

export default App;