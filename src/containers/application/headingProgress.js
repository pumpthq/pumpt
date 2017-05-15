import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { H1 } from './../../components/main/heading'
import Button from './../../components/main/button'

import SESSION from '../../constants/session';
@connect(
    function mapStateToProps(state, ownProps) {
        const { isNotApproved } = state.authorization
        return {
            isNotApproved
        }
    }
)
class HeadingProgress extends Component {
    handleClick = () => {
        push('candidate/matches/all');
    };

    render() {
        const {
            isNotApproved,
            isFilled,
            onClickGetMatches
        } = this.props;

        // const isApproved = SESSION[0].user && SESSION[0].user.isApproved;
        //if profile is approved & filled. Button "Get Matches" is visible & active
        if (!isNotApproved && isFilled) {
            return (
                <div>
                    <H1 class="heading heading_type_four  heading_button_true ">
                        Welcome to Pumpt!
                        <Button
                            class="invisible-mobile"
                            type='submit'
                            typeColored
                            buttonSize='l'
                            onClick={onClickGetMatches}
                        >
                            Get Matches
                        </Button>
                    </H1>
                    <p class="text text_after_big-head text_size_xs">
                        We'll let you know when we find a match for you.
                    </p>
                    <Button
                        class="invisible-mobile"
                        type='submit'
                        typeColored
                        buttonSize='l'
                        onClick={onClickGetMatches}
                    >
                        Get Matches
                    </Button>
                </div>
            )
        }
        //if profile is approved and NOT filled. Button "Get Matches" is visible and DISABLED
        else if (!isNotApproved && !isFilled) {
            return (
                <div>
                    <H1 class="heading heading_type_four  heading_button_true ">
                        Your application is approved!
                        <Button
                            class="invisible-mobile"
                            type='submit'
                            typeColored
                            buttonSize='l'
                            onClick={onClickGetMatches}
                        >
                            Get Matches
                        </Button>
                    </H1>
                    <p class="text text_after_big-head text_size_xs">
                        Improve your match results by completing your profile.
                    </p>
                    <Button
                        class="invisible-desktop"
                        type='submit'
                        typeColored
                        buttonSize='l'
                        onClick={onClickGetMatches}
                    >
                        Get Matches
                    </Button>
                </div>
            )
        }
        // Default view. if profile is NOT approved & NOT filled. There is no button "Get Matches".
        return (
            <div>
                <H1 noGutter typeFour class='row'>Thanks for your application!</H1>
                <p class="text text_after_big-head text_size_xs">
                    We carefully consider the Candidates we bring on to our platform to
                    ensure relevant job matches. We’ll review your background and email you as soon as
                    possible to let you know
                    whether you're an appropriate fit for Pumpt.
                </p>
            </div>
        )
    }
}

HeadingProgress.propTypes = {
    isNotApproved : PropTypes.bool,
    isFilled : PropTypes.bool,
    onClickGetMatches : PropTypes.func
}

HeadingProgress.defaultProps = {
    isNotApproved : false,
    isFilled : false
}

export default HeadingProgress
