import React, { Component, Fragment } from 'react';
import {Meteor} from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Location from '../components/Location'
import Main from '../components/Main'
import {Funnels, Categories, Industries} from '../../api/funnels/methods'


// App component - represents the whole app
class MainLayout extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    const location = {
      path: ['Home', 'Funnels'],
      title: 'List of funnels'
    };
    return (
      <Fragment>
        <Location location={location} />
         <Main funnels={this.props.funnels} />
      </Fragment>
    )
  }
}

export default withTracker((props)=>{
  Meteor.subscribe('funnels');
  Meteor.subscribe('industries');
  Meteor.subscribe('categories');
  const industries = props.params.industries,
  categories = props.params.categories,
  listc=categories.split('-'),
  listi=industries.split('-');
  let queryc = {},
  queryi={},
  listIdi=[],
  listIdc=[];
  if(categories !='all') queryc={name:{$in:listc}};
  if(industries !='all') queryi={name:{$in:listi}};
  if (categories != 'all'){
      Categories.find(queryc).forEach((elt) => {
        listIdc.push(elt._id);
      });
  }
  if(industries!='all'){
     Industries.find(queryi).forEach((elt) => {
       listIdi.push(elt._id);
     });
  }
  let rc = ri = {};

   if(categories !='all') rc = {category:{$in:listIdc}};
    if(industries !='all') ri = {industry:{$in:listIdi}};
    return {
    funnels: Funnels.find({$or:[rc,ri]}).fetch()
  }
})(MainLayout)