import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import './AdminPage.css'
import { DataGrid } from '@material-ui/data-grid';

class AdminPage extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_USERS' })
        
    }

    deleteUser = (userId, type) => {
        console.log("hello", userId, type)
        let userData = {
          id: userId,
          user_type: type
        }
        this.props.dispatch({
          type: 'DELETE_USERS',
          payload: userData
        })
    }  

    render() {
        return (
            <div className="adminViewWrap">
            <div className='adminInformation' style={{ height: 450, width: '100%' }}>
                <h1>Administrative Services</h1>
                <div className='adminDataGrid'>
                    <DataGrid
                        columns={[
                                { field: 'first_name', headerName: 'First Name', width: 200 },
                                { field: 'last_name', headerName: 'Last Name', width: 200 },
                                { field: 'company', headerName: 'Company', width: 200 },
                                { field: 'user_type', headerName: 'User Type', width: 200 },
                                { field: 'id', headerName: 'ID #', width: 150 },
                                {
                                    field: 'delete',
                                    headerName: 'Delete',
                                    width: 200,
                                    renderCell: (params) => (
                                        <IconButton aria-label="delete" onClick={() => this.deleteUser(params.row.id, params.row.user_type)}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    )
                                }
                            ]}
                        rows={this.props.store.admin}
                    />
                </div>
            </div>
            </div>
        );
    }
}

const AdminPageWithRouter = withRouter(AdminPage);
export default connect(mapStoreToProps)(AdminPageWithRouter);

