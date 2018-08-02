import React, {Component} from 'react'
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import Button from 'components/main/button'

@connect(
    function mapStateToProps(state, ownProps) {
        const { isNotApproved, isFinished } = state.authorization
        return {
            isNotApproved, isFinished
        }
    }
)
class HeadingProgress extends Component {
    onClickGetMatches = () => {
        push('candidate/matches/all');
    };

    render() {
        const {
            isNotApproved,
            isFilled,
            isFinished,
            dispatch
        } = this.props;

        // const isApproved = SESSION[0].user && SESSION[0].user.isApproved;
        //if profile is approved & filled. Button "Get Matches" is visible & active
        if (!isNotApproved && isFilled) {
            return (
                <div>
                    <h2>
                        Welcome to Pumpt!
                        <Button
                            class="invisible-mobile"
                            type='submit'
                            typeColored
                            buttonSize='l'
                            onClick={this.onClickGetMatches}
														href="http://app.pumpthq.com/#/candidate/matches/all"
                        >
                            Get Matches
                        </Button>
                    </h2>
                    <p class="text text_after_big-head text_size_xs">
                        We'll let you know when we find a match for you.
                    </p>
                    <Button
                        class="invisible-mobile"
                        type='submit'
                        typeColored
                        buttonSize='l'
                        onClick={this.onClickGetMatches}
														href="http://app.pumpthq.com/#/candidate/matches/all"
                    >
                        Get Matches
                    </Button>
                </div>
            )
        }
        //if profile is approved and NOT filled. Button "Get Matches" is visible and DISABLED
        else if (!isNotApproved && !isFilled) {
            return (
                <div class="text-center">
                    <h2>
                        Your application is approved!
                    </h2>
                    <p class="text text_after_big-head text_size_xs">
                        Improve your match results by completing your profile.
                    </p>
                    <Button
                        type='submit'
                        typeColored
                        buttonSize='l'
                        onClick={this.onClickGetMatches}
														href="http://app.pumpthq.com/#/candidate/matches/all"
                    >
                        Get Matches
                    </Button>
                </div>
            )
        }

        else if (isFinished && isNotApproved) {
	        return (
	            <div className="text-center">
	                <h2>Your application is under review</h2>
	                <p class="text text_after_big-head text_size_xs">
			You can continue to update your background information below.
        	    	</p>
           	    </div>
       		)

	}

        return (
            <div className="text-center">
                    <h2>Just a few more steps</h2>
                    <p class="text text_after_big-head text_size_xs">
			Please take this opportunity to tell us more about your background.
                    </p>
            </div>
        )
    }
}

export default HeadingProgress
