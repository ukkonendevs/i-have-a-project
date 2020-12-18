import React, {Component} from 'react';
import {HashRouter as Router, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './Manager.css';

// Import components
import NavButton from './ManagerHomeComponents/NavButton';
import Dashboard from './ManagerHomeComponents/Dashboard';
import Calendar from './ManagerHomeComponents/Calendar';
import ContractRequests from './ManagerHomeComponents/ContractRequests';
import MyDesigners from './ManagerHomeComponents/MyDesigners';
import FindDesigners from './ManagerHomeComponents/FindDesigners';

class ManagerHomeView extends Component {
    
    state = {

    }

    render () {
        const pages = [
            {
                path: '/ManagerHomeView/Dashboard', 
                label: 'Dashboard'
            },
            {
                path: '/ManagerHomeView/Designers', 
                label: 'My Designers'
            },
            {
                path: '/ManagerHomeView/Calendar', 
                label: 'Calendar'
            },
            {
                path: '/ManagerHomeView/Requests', 
                label: 'Contract Requests'
            },
            {
                path: '/ManagerHomeView/Search',
                label: 'Find Designers'
            },
        ];

        return (
            <>
                <div className='topSection'>
                    <h1 className='header'>Welcome to Your Home View</h1>
                    <button className='accountButton'>Account Settings</button>
                </div>
                <Router>
                    <div className='managerNavBar'>
                        {pages.map((page, index) => {
                            return <NavButton key={index} page={page} />
                        })}
                    </div>
                    {/* Routes to each component */}
                    
                    <Route 
                        exact
                        path={`/ManagerHomeView/Dashboard`}
                        component={Dashboard}
                    />
                    <Route
                        exact
                        path={`/ManagerHomeView/Designers`}
                        component={MyDesigners}
                    />
                    <Route 
                        exact
                        path={`/ManagerHomeView/Calendar`}
                        component={Calendar}
                    />
                    <Route 
                        exact
                        path={`/ManagerHomeView/Requests`}
                        component={ContractRequests}
                    />
                    <Route
                        exact
                        path={`/ManagerHomeView/Search`}
                        component={FindDesigners}
                    />
                </Router>
            </>
        );
    }
}

export default withRouter(connect(mapStoreToProps)(ManagerHomeView));