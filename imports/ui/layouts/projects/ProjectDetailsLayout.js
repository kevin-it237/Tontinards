import React, { Component, Fragment } from 'react';
import ProjectDetails from '../../components/projects/ProjectDetails';
import { withTracker } from 'meteor/react-meteor-data';

// App component - represents the whole app
class ProjectDetailsLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const{user}=this.props;
    return (
        <Fragment>
            <ProjectDetails user={user}  />
        </Fragment>
    )
  }
}

export default withTracker((props)=>{
    return {
        user: Meteor.user()
    }
})(ProjectDetailsLayout)