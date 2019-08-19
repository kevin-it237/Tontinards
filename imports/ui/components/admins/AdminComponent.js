import React, { Component, Fragment } from 'react';
import FunnelModalForm from './../funnels/Funnel-Modal-Form';
import Input from '../../globalComponents/Input'
import Tr from '../../globalComponents/Tr';
import { Funnels } from '../../../api/collections'
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import adminFunnelListPageFr from '../../../../traduction/adminFunnelListPage/fr.json';
import adminFunnelListPageEn from '../../../../traduction/adminFunnelListPage/en.json';

// App component - represents the whole app

const monthNamesEn = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];

let lang = localStorage.getItem('lang');
let monthNames = [];
let monthNamesFr = [
    "Janvier", "Fevrier", "Mars",
    "Avril", "Mai", "Juin", "Juillet",
    "Août", "Septembre", "Octobre",
    "Novembre", "Decembre"
];
lang == 'fr'?
    monthNames = monthNamesFr
:
    monthNames = monthNamesEn


class FunnelLIstAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: '',
            projectState: 'PENDING',
            currentAmount: 0,
            onefoundRaiseAs: '',
            oneForWhoFoundsRaise: '',
            objectifAmount: '',
            phoneNumber: '',
            description: '',
            category: '',
            document: '',
            projectImage: '',
            teamName: '',
            teamImage: '',
            video: '',
            id: '',
            country: '',
            countries: [],
            messages:[],
            city: '',
            email: '',
            show: false,
            feedback: '',
            currentUser: null,
            isEditing: false
        };
        console.log(this.props.user);
        this.notificationDOMRef = React.createRef();
    }

    componentWillReceiveProps() {
        this.loadCountry();
        // const currentUser = Meteor.call('getTheCurrent', this.props.user);
        // console.log(currentUser)
        // this.setState({currentUser: currentUser});

    }

    componentDidUpdate(prevProps) {
        if(prevProps.user != this.props.user) {
            this.setState({currentUser: this.props.user})
        }
    }


    async loadCountry() {
        const countries = await axios.get('https://restcountries.eu/rest/v2/regionalbloc/au')
            .then(function (response) {
                // handle success
                return response;
                console.log(this.state.category);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
        //console.log(countries.data[0].name);
        this.setState({ countries: countries.data });
    }

    formatDate(d) {
        const date = new Date(d);
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }

    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    editFunnel(funnel) { console.log(funnel);
        this.setState({
            phoneNumber: funnel.phoneNumber,
            objectifAmount: funnel.objectifAmount,
            onefoundRaiseAs: funnel.onefoundRaiseAs,
            oneForWhoFoundsRaise: funnel.oneForWhoFoundsRaise,
            description: funnel.description,
            projectName: funnel.projectName,
            projectState: funnel.projectState,
            currentAmount: funnel.currentAmount,
            category: funnel.category,
            id: funnel._id,
            document: funnel.document,
            projectImage: funnel.projectImage,
            teamName: funnel.teamName,
            teamImage: funnel.teamImage,
            video: funnel.video,
            country: funnel.country,
            city: funnel.city,
            email: funnel.email,
            show: true,
            isEditing: true
        });
    }

    deleteFunnel = (funnel) => {
        Funnels.remove(funnel._id, function (err, id) {
            if (err) {
                return false;
            } else {
                return true;
            }
        });
    }

    closeModal() {
        this.setState({ show: false });
        this.setState({
            projectName: '',
            city: '',
            projectState: '',
            currentAmount: '',
            onefoundRaiseAs: '',
            oneForWhoFoundsRaise: '',
            objectifAmount: '',
            phoneNumber: '',
            description: '',
            category: '',
            document: '',
            projectImage: '',
            teamName: '',
            teamImage: '',
            video: '',
            errors: {},
            id: '',
            country: '',
            email: '',
            isLoading: false,
            isEditing: false
        })
    }

    addNotification = (massage) => {
        this.notificationDOMRef.current.addNotification({
          title: "PROJECT STATE",
          message: massage,
          type: "danger",
          insert: "top",
          container: "top-center",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: { duration: 2000 },
          dismissable: { click: true }
        });
    }

    addNewProject = () => {
        if(this.state.currentUser.emails) {
            this.setState({show: true})
        } else {
            this.addNotification("Please, update your profile with your email.");
        }
    }

    render() {
        let lg = adminFunnelListPageFr;
        let lang = localStorage.getItem('lang')

          lang == 'fr'?
              lg = adminFunnelListPageFr
              :
              lg = adminFunnelListPageEn;

        const { show,city, phoneNumber, objectifAmount, projectName, projectState, currentAmount, teamName, onefoundRaiseAs, oneForWhoFoundsRaise, description, id, category, document, projectImage, teamImage, email, feedback, video, country, countries, isEditing } = this.state;
        const { funnels, categories, foundRaiseAs, forWhoFoundsRaise, user } = this.props;
        //console.log(user);
        
        console.log(funnels)
        return (
            <div className="wrapper wrapper-content animated fadeInRight">
                <div className="row">
                    <ReactNotification ref={this.notificationDOMRef} />
                    <div className="col-lg-12">
                        <div className="ibox float-e-margins">
                            <div className="ibox-projectName">
                                <h5>{lg.Projects}</h5>
                            </div>
                            <div className="ibox-content">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <button type="button" className="btn btn-primary" onClick={() => this.addNewProject()} > {lg.NewProject}</button>
                                    </div>
                                    <FunnelModalForm userId={this.state.currentUser} feedback={feedback} city={city} 
                                    categories={categories} id={id} category={category} phoneNumber={phoneNumber} 
                                    description={description} user={this.state.currentUser} projectName={projectName} 
                                    projectState={projectState} currentAmount={currentAmount} teamName={teamName} 
                                    forWhoFoundsRaise={forWhoFoundsRaise} oneForWhoFoundsRaise={oneForWhoFoundsRaise} 
                                    video={video} show={show} projectImage={projectImage} teamImage={teamImage} 
                                    document={document} foundRaiseAs={foundRaiseAs} onefoundRaiseAs={onefoundRaiseAs} 
                                    email={email} objectifAmount={objectifAmount} country={country} countries={countries} isEditing={isEditing}
                                     closeModal={() => this.closeModal()} />
                                </div>
                                {funnels && funnels.length ? <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>{lg.Name}</th>
                                                <th>{lg.Category}</th>
                                                <th>{lg.PhoneNumber}</th>
                                                <th>{lg.Email}</th>
                                                <th>{lg.ObjectiveAmount}</th>
                                                <th>{lg.CurrentAmount}</th>
                                                <th>{lg.CreatedAt}</th>
                                                <th className="pull-right">{lg.Actions}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {funnels && funnels.map((funnel, index) => (
                                                <Tr key={funnel._id} funnel={funnel} 
                                                    editFunnel={(funnel) => this.editFunnel(funnel)} 
                                                    deleteFunnel={(funnel) => this.deleteFunnel(funnel)} 
                                                    formatDate={(date) => this.formatDate(date)} 
                                                />
                                            ))}

                                        </tbody>
                                    </table>
                                </div> : ''}

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default FunnelLIstAdmin;