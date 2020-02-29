import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';

import {
  NavLink,
  BrowserRouter as Router,
} from 'react-router-dom'

export const NavBar = (
  <Router>
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <NavLink activeClassName="active" to="/">
      <ListItemText primary="Dashboard" />
      </NavLink>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      {/* Not implemented */}
      <NavLink activeClassName="active" to="/reports">
      <ListItemText primary="Reports" />
      </NavLink>
    </ListItem>
  </div>
  </Router>
);

