import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import mapStoreToProps from '../../../redux/mapStoreToProps';

class MyProfile extends Component {
	state = {
		profile: {
			photo: '',
			first_name: 'Simon',
			last_name: 'Germscheid',
			email: 'email@email.com',
			phone: '999-999-9999',
			rate: 0,
			linkedin: 'linkedin.site/profilename',
			career: [{
				start_date: '05-20-18',
				end_date: '05-20-20',
				title: 'Legit Title'
			}],
			education: [{
				graduation_date: '01-15-21',
				degree: 'Fullstack Software Engineering',
			}],
			certification: [{
				graduation_date: '',
				certification: ''
			}],
			skills: [
				{
					label: 'React',
					proficiency: 5
				},
				{
					label: 'JavaScript',
					proficiency: 5
				}
			],
			availability: [{

			}]
		}
	};
	

	render() {
		return (
			<div className="myProfileWrap">
				<div className="left-ProfileColumn">
					<div>
						Hello, {this.state.profile.first_name} {this.state.profile.last_name}
					</div>
					<div className="profileImg">

					</div>
					<div>
						contact Info: 
						<p>{this.state.profile.email}</p>
						<p>{this.state.profile.phone}</p>
						<p>{this.state.profile.linkedin}</p>
					</div>
					<div>
						Career History: 
						{this.state.profile.career.map( career => {
							return <p>{JSON.stringify(career)}</p>
						})}
					</div>
					<div>
						Education: 
						{this.state.profile.education.map( school => {
							return <p>{JSON.stringify(school)}</p>
						})}
					</div>
					<div>
						Certifications: 
						{this.state.profile.certification.map( cert => {
							return <p>{JSON.stringify(cert)}</p>
						})}
					</div>
				</div>
				<div className="rightProfileColumn">
				<div>
						Skills: 
						{this.state.profile.skills.map( skill => {
							return <p>{JSON.stringify(skill)}</p>
						})}
				</div>
				</div>
			</div>
		
		);
	}
}

export default withRouter(connect(mapStoreToProps)(MyProfile));
