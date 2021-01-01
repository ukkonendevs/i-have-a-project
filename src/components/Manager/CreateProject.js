import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import mapStoreToProps from '../../redux/mapStoreToProps';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import AddDesignerToProject from '../Modals/AddDesignerToProject'

class CreateProject extends Component {
	state = {
		newProject: {
			project_name: '',
			status: '',
			due_date: '',
			notes: '',
			start: '',
			TeamDesigners: [

			]
		},
		status: [
			'Active',
			'New',
			'Complete',
		]
	};
	addSelectedDesigners = (designers) => {
		this.setState({
			newProject: {
				...this.state.newProject,
				TeamDesigners: designers
			}
		})
	}

	handlechange = (event, keyname) => {
		this.setState({
			newProject: {
				...this.state.newProject,
				[keyname]: event.target.value
			}
		});
	}
	handleSubmit = () => {
		this.props.dispatch({
			type: "CREATE_PROJECT",
			payload: this.state.newProject
		})
	}
	componentDidMount = () => {
		this.props.dispatch({
			type: "FETCH_DESIGNERS"
		})
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<TextField 
						id="outlined-basic" 
						label="Project Name" 
						variant="outlined" 
						onChange={(event) => this.handlechange(event, 'project_name')}
					/>
					<TextField
						id="date"
						label="Start Date"
						type="date"
						InputLabelProps={{
						shrink: true,
						}}
						onChange={(event) => this.handlechange(event, 'start')}
					/>
					<TextField
						id="date"
						label="Due Date"
						type="date"
						InputLabelProps={{
						shrink: true,
						}}
						onChange={(event) => this.handlechange(event, 'due_date')}
					/>
					<TextField
						id="notes"
						label="Short Description"
						multiline
						rows={4}
						onChange={(event) => this.handlechange(event, 'notes')}
						helperText="Enter Quick Description of Project"
					/>
					<TextField
						id="project-status"
						select
						label="Status"
						onChange={(event) => this.handlechange(event, 'status')}
						helperText="Select Project Status"
						>
						{this.state.status.map((option) => (
							<MenuItem  value={option}>
							{option}
							</MenuItem>
						))}
					</TextField>
					<AddDesignerToProject 
						addSelectedDesigners={this.addSelectedDesigners} 
						SelectedDesigners={this.state.newProject.TeamDesigners}
					/>
							{this.state.newProject.TeamDesigners.length > 0 ?
								this.state.newProject.TeamDesigners.map(designer => {
									return <p>{JSON.stringify(designer)}</p>
								})
								:
								<></>
								}
					<Button 
						type="submit"
						variant="contained" 
						color="primary"
					>
						Create Project
					</Button>
				</form>
			</div>
		);
	}
}

export default withRouter(connect(mapStoreToProps)(CreateProject));
