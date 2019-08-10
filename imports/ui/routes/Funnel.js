import React, { Fragment} from 'react';
import { Switch, Route } from 'react-router-dom';
import FunnelList from '../pages/funnels/FunnelList';
import AdminDashboard from '../pages/admins/AdminDashboard';
import HeaderLayout from '../globalComponents/layouts/HeaderLayout';
import Footer from '../globalComponents/Footer';
import FunnelDetailsPage from '../pages/funnels/FunnelsDetailsPage';
import AdminPage from '../pages/admins/AdminPage';
import ProjectDetails from '../components/funnels/ProjectDetails'

// The Roster component matches one of two different routes
// depending on the full pathname
const Funnel = () => (
  <Switch>
    <Fragment>
      <HeaderLayout />
        <Route exact path='/project/:industries/:categories' component={FunnelList}/>
        {/* <Route exact path='/project/:all' component={FunnelDetailsPage}/> */}
      <Footer/>  
    </Fragment>
  </Switch>
)

export default Funnel;
