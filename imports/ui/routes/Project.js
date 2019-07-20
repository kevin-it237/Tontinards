import React, { Fragment} from 'react';
import { Switch, Route } from 'react-router-dom';
import ProjectsPage from '../pages/projects/ProjectsPage';
import ProjectDonation from '../pages/projects/ProjectDonation';
import HeaderLayout from '../globalComponents/layouts/HeaderLayout';
import FunnelDetailsPage from '../pages/funnels/FunnelsDetailsPage';
import AdminPage from '../pages/admins/AdminPage';

// The Roster component matches one of two different routes
// depending on the full pathname
const Project = () => (
  <Switch>
    <Fragment>
      <div>
        <HeaderLayout />
        <Route exact path='/projects/all' component={ProjectsPage}/>
        <Route exact path='/projects/donate' component={ProjectDonation}/>
      </div>
    </Fragment>
  </Switch>
)

export default Project;