import React, {Component} from 'react'
import { connect } from 'react-redux'

@connect ( state => ({ active: state.candidateMatches.candidate.active }) )
class InactiveMatchesPlaceholder extends Component {
    render() {
        const ActiveComponent = this.props.activeComponent;
        if(this.props.active) {
         return ( <ActiveComponent/> )
	} else {
         return (
         <div className="welcome-to-matches-popup">
            <h3>Your account is currently deactivated</h3>
            <div className="message">Please reactivate your account to view your matches.</div>
         </div>
         )
        }
    }
}

export default InactiveMatchesPlaceholder
