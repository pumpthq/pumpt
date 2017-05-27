import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import Wrapper from './../../../components/main/wrapper';
import WallpapersSwitcher from './../../onboarding/candidate/steps/wallpapersSwitcher';
import TabBar from './parts/TabBar';
import CompanyHeader from './parts/HeaderMenu';

import ApplySuccessDialog from 'components/matches/ApplySuccessDialog'

const propTypes = {
    children : PropTypes.node,
};
const defaultProps = {};

const mapStateToProps = state => {
    return {lastApproved: state.candidateMatches.lastApproved}
}

@connect(mapStateToProps)
class MatchesContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {lastApproved:(new Date)};
    }

    openDialog = () => {
        this.setState({lastApproved:(new Date)})
    }

    render() {
        const { children } = this.props;

        return (
            <Wrapper>
                {/* <WallpapersSwitcher
                    step={'sixth'}
                    isRichWallpaperNeeded={true}
                /> */}
                <div className="container">
                    <div className="row row-padding-bigger">
                        <div className="col-xs-12">
                            <CompanyHeader />
                        </div>
                    </div>
                </div>
                <div className="container">
                    {children}
                </div>
                <TabBar />

                {/* ⚠️ temporary button to open dialog */}
                <button onClick={this.openDialog}>open apply success dialog {JSON.stringify(this.state.lastApproved)}</button>

                <ApplySuccessDialog lastApproved={this.state.lastApproved} />

            </Wrapper>
        );
    }

}

MatchesContainer.propTypes = propTypes;
MatchesContainer.defaultProps = defaultProps;

module.exports = MatchesContainer
