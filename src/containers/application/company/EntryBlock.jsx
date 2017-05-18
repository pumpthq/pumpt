import React, { Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Panel from '../../../components/main/panel';
import StepProgress from '../../../components/application/stepProgress';
import SummaryHead from './summaryHead';
import Footer from './../../../components/main/footer/footer';
import ApplicationCompany from './steps';
import ProgressChartSidebar from './sidebar';
import { fetchLinkedInData } from './../../../actions/applicationCompany';
import {
    IMPORT_STARTED,
    IMPORT_COMPLETED,
    STARTUP_COMPLETED_STEPS,
} from './../../../constants/applicationCompany';
import HeadingProgress from './../headingProgress';
import { push } from 'react-router-redux';
import {
    ROUTE_COMPANY_JOBS_OPEN
} from './../../../constants/routes';

@connect(
    (state) => {
        const {
            importFromLinkedIn,
            progress,
        } = state.applicationCompany;

        return {
            isImportStarted: importFromLinkedIn === IMPORT_STARTED &&
                importFromLinkedIn !== IMPORT_COMPLETED,
            progress: progress.length === STARTUP_COMPLETED_STEPS,
        };
    },
    (dispatch) => ({ dispatch })
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
            dispatch
        } = this.props;

        return (
            <div className="content__wrapper">
                <div className="content">
                    <div className="container">
                        <div className="row row-padding-bigger">
                            <div className="col-lg-12 column__wrapper">
                                <section className="column column_size_xl">
                                    <Panel className="panel_type_card">
                                        <HeadingProgress
                                            isFilled={progress}
                                            onClickGetMatches={() => {
                                                dispatch(push(ROUTE_COMPANY_JOBS_OPEN));
                                            }}
                                        />
                                    </Panel>
                                    <Panel paddingFalse>
                                        <SummaryHead />
                                        <ApplicationCompany />
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
