import React, { Component, Fragment } from 'react';
import AdminCategoryLayout from '../layouts/AdminCategoryLayout';
import Header from '../GlobalComponents/Header'
// App component - represents the whole app
class AdminCategoryPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
      <Header />
        <AdminCategoryLayout />
      </Fragment>
    )
  }
}

export default AdminCategoryPage;