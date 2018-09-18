import React, { Component, Fragment } from 'react';
import {Categories, Industries} from '../../api/collections/'
import {checkRole} from '../../utilities/'
import {Meteor} from 'meteor/meteor'
import CustomAlert from './CustomAlert';
import DownloadComponent from './DownloadComponent'
import ModalSubscription from './ModalSubscription';
// App component - represents the whole app
class FunnelDetails extends Component {
    constructor(props) {
        super(props);
        this.state={
            url:'',
            message:'',
            type:'danger',
            show:false,
            field: ''
        }
    }
    clearMessage(){
        this.setState({message:''});
    }
    closeModal(){
        this.setState({show:false});
    }
    downloadFile(f){
    const {funnel, user}= this.props;
    const userId = Meteor.userId();
    let roles = ['admin'];
    if (f == 'image' || !Number(funnel&&funnel.price)) {
        roles = ['all'];
    } else {
        roles.push('paid');
    }
    const isAuthorized = checkRole(roles, userId);
    if(f) this.setState({field:f});
    if(!isAuthorized) return this.setState({show:true});
    let field = f||this.state.field;
    if (funnel[field]) {
        const file_path = funnel[field],
            a = document.createElement('A');
        a.href = file_path;
        a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
   
    }
    render() {
        const {funnel,user}= this.props;
        const {message,type, url, show}=this.state;
        const industry = Industries.findOne({_id:funnel&&funnel.industry}),
            category = Categories.findOne({_id:funnel&&funnel.category});
        return (
    <div className="wrapper wrapper-content animated fadeInRight">

    <div className="row">
         <div className="col-lg-12">
            <ModalSubscription downloadFile={()=>this.downloadFile()} userId={user&&user._id} show={show} closeModal={()=>this.closeModal()} />
            <div className="ibox product-detail">
                <div className="ibox-content">

                    <div className="row">
                        <div className="col-md-5">
                                    <div className={funnel&&!funnel.image?'image-imitation':''}>
                                        {funnel&&funnel.image ? <img width='100%' src={funnel&&funnel.image} /> : '[ Image ]'}
                                    </div>
                        </div>
                        <div className="col-md-7">

                            <h2 className="font-bold m-b-xs">
                                {funnel&&funnel.title}
                            </h2>
                            {/**<div className="m-t-md">
                                <h2 className="product-main-price">${funnel&&funnel.price} <small className="text-muted">Exclude Tax</small> </h2>
                            </div>*/}
                            <hr/>

                            <dl className="small m-t-md">
                                <dt>Industry: {industry&&industry.name||'No industry'} </dt>
                                <dd>A description list is perfect for defining terms.</dd>
                                <dt>Category: {category&&category.name||'No category'} </dt>
                                <dd>A description list is perfect for defining terms.</dd>
                            </dl>

                            <h4>Description</h4>

                            <div className="small text-muted">
                               {funnel&&funnel.description}
                            </div>
                            
                            <hr />

                            <div style={{position: 'absolute', bottom:'0px'}} >
                                <div className="btn-group">
                                    <button style={{margin:'1px'}} type="button" onClick={()=>this.downloadFile('image')} className="btn btn-primary btn-sm"><i className="fa fa-download"></i> IMAGE</button>
                                    <button style={{margin:'1px'}} type="button" onClick={()=>this.downloadFile('document')} className="btn btn-primary btn-sm "><i className="fa fa-download"></i> PDF</button>
                                    <button style={{margin:'1px'}} type="button" onClick={()=>this.downloadFile('video')} className="btn btn-primary btn-sm "><i className="fa fa-download"></i> VIDEO</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="ibox-footer">
                            <span className="pull-right">
                               FOP Swipe - <i className="fa fa-clock-o"></i> September, 2018
                            </span>
                   The best funnels of the market
                </div>
                {/**message&&<CustomAlert clearMessage={()=> this.clearMessage()} text={message} type={type} ttl={5} />*/}
            </div>

        </div>
        </div>
        </div>
        )
    }
}

export default FunnelDetails;