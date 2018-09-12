import React, { Component, Fragment } from 'react';
import {Link, Redirect} from 'react-router-dom'
import {Meteor} from 'meteor/meteor'
import { asyncMethodCall } from '../../utilities/shared';
// App component - represents the whole app
class Header extends Component {
  constructor(props) {
    super(props);
    this.state={redirect:false, subscribed:false};
  }
logout(e){
    e.preventDefault();
    Meteor.logout();
    this.setState({redirect: true});
}
componentWillReceiveProps(nextProps){
    const userId= nextProps.user&&nextProps.user._id;
        asyncMethodCall('checkRoles', {
                userId: userId
            }).then((result) => {
                this.setState({subscribed:true});
            }).catch(()=>{
                this.setState({
                    subscribed: false
                })
            })
}
componentDidMount() {
    const userId = this.props.user && this.props.user._id;
    asyncMethodCall('checkRoles', {
        userId: userId
    }).then((result) => {
        this.setState({
            subscribed: true
        });
    }).catch(() => {
        this.setState({
            subscribed: false
        })
    })
}
  render() {
      const {redirect, subscribed}=this.state;
         if (redirect) return <Redirect to = "/" />
         const {user}=this.props;
    return (
        <div className="row border-bottom">
            <nav className="navbar navbar-fixed-top" role="navigation" style={{marginBottom: 0, zIndex:'1045'}}>
                <div className="navbar-header">
                    {/*<span minimalize-sidebar></span>*/}
                    <Link to="/" style={{display: 'inline-block', marginLeft: '10px'}}>
                        < img src = "https://foppro.com/modules/core/client/img/assets/online%20performance%20logo.png" height="35px"
                        className = "img-responsive"
                        alt = "logo homepage"
                        />
                    </Link>
                    {/**<span  style={{marginLeft: '10px'}} className="hidden-xs hidden-sm title-heading">
                        Page Title
    </span>*/}
                    {/* Old form search
                    <form role="search" className="navbar-form-custom" method="post" action="views/search_results.html">
                        <div className="form-group">
                            <input type="text" placeholder="Search" className="form-control" name="top-search" id="top-search">
                        </div>
                    </form>
                    */}
                </div>
                <ul className="nav navbar-top-links navbar-right">
                <li>
                    {!subscribed&&<Link className="btn btn-sm" to="/pricing">
                       Subscribe Now</Link>}
                </li>
                    <li>
                       {user? <a onClick={(e)=>this.logout(e)} target="_blank"><i className="fa fa-sign-out"></i>
                       {user.profile.name} </a>:<Link to="/authentication/signin">
                       <i className="fa fa-sign-in"></i> Log In</Link>}
                    </li>
                </ul>
            </nav>
        </div>
    )
  }
}

export default Header;