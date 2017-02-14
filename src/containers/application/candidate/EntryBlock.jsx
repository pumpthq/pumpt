import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Panel from './../../../components/main/panel';
import StepProgress from '../../../components/application/stepProgress';
import Footer from './../../../components/main/footer/footer';
import ApplicationCandidate from './accordion';
import ProgressChartSidebar from './sidebar';
import { fetchLinkedInData } from './../../../actions/applicationCandidate';
import {
    IMPORT_STARTED,
    IMPORT_COMPLETED,
} from './../../../constants/applicationCandidate';
import HeadingProgress from './../headingProgress';

import SummaryHead from './summaryHead';
import { push } from 'react-router-redux';
import {
    ROUTE_CANDIDATE_MATCHES_ALL,
} from './../../../constants/routes';

import ResendEmailText from '../../../components/ResendEmailText.jsx';

@connect(
    (state) => {
        const {
            importFromLinkedIn,
            progress,
        } = state.applicationCandidate;

        return {
            isImportStarted: importFromLinkedIn === IMPORT_STARTED &&
                importFromLinkedIn !== IMPORT_COMPLETED,
            progress: progress.length === 7,
        };
    },
    (dispatch) =>
         ({
             dispatch,
         })

)
class EntryBlock extends Component {

    componentDidMount() {
        const { dispatch, isImportStarted } = this.props;

        if (isImportStarted) {
            dispatch(fetchLinkedInData());
        }
    }

    render() {
        const {
            progress,
            dispatch,
        } = this.props;

        return (
            <div class="content__wrapper">
                <div class="content">
                    <div class="container">
                        <div class="row row-padding-bigger">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 column__wrapper">
                                <section class="column column_size_xl">
                                    <Panel className="panel_type_card">
                                        <HeadingProgress
                                            isFilled={progress}
                                            onClickGetMatches={() => {
                                                dispatch(push(ROUTE_CANDIDATE_MATCHES_ALL));
                                            }}
                                        />
                                        <StepProgress isFilled={progress} />
                                        <br />
                                        <ResendEmailText />
                                    </Panel>
                                    <Panel paddingFalse>
                                        <SummaryHead />
                                        <ApplicationCandidate />
                                    </Panel>
                                </section>
                                <ProgressChartSidebar isFilled={progress} />
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}

EntryBlock.propTypes = {
    dispatch: PropTypes.func,
    isImportStarted: PropTypes.bool,
    progress: PropTypes.bool,
};

export default EntryBlock;
