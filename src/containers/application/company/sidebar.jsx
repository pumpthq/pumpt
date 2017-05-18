import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
    PROFILE_PHOTO_STEP,
    LOCATION_STEP,
    DESCRIPTION_STEP,
    QUOTE_OR_MOTTO_STEP,
    PHOTO_STEP,
    STARTUP_COMPLETED_STEPS,
} from '../../../constants/applicationCompany';
import {
    showLocationStep,
    showDescriptionStep,
    showQuoteOrMottoStep,
    showAddPhotoStep
} from '../../../actions/applicationCompany'
import CircleProgressBar from './../../../components/application/circleProgressBar'
import ProgressChartSidebarPrototype from './../sidebarPrototype'
import ImportFromLinkedInButton from './parts/ImportFromLinkedInButton'

const propTypes = {
    isFilled: PropTypes.bool,
};

const defaultProps = {
    isFilled: 'false',
};

@connect(
    function mapStateToProps(state) {
        const { active, progress, accordion } = state.applicationCompany

        return {
            active : active.slice(),
            filled : progress.slice(),
            isStarted : accordion
        }
    },
    function mapDispatchToProps(dispatch, ownProps) {
        return {
            dispatch
        }
    }
)
class ProgressChartSidebar extends ProgressChartSidebarPrototype {

    render() {
        const { isStarted, isFilled, dispatch } = this.props
        return (
            <aside class="column column_size_xs invisible-tablet">
                <CircleProgressBar title="Profile" text="Completed" {...this.setLevel(STARTUP_COMPLETED_STEPS)} />
                { isStarted ? [
                    <p class="text text_color_invert text_leading_normal">
                        {isFilled ? '100% complete! Congrats!' : 'Tell us more about your company to get more matches.'}
                    </p>,
                    <nav class="navigation navigation_vertical navigation_color_invert">
                        <a class={this.makeClasses({ constant : PROFILE_PHOTO_STEP })}
                           href="" style={{pointerEvents: 'none', cursor: 'default'}} onClick={(event) => {
                            event.preventDefault()
                        }}>Profile Photo {this.renderOkIcon({ constant : PROFILE_PHOTO_STEP })}</a>

                        <a class={this.makeClasses({ constant : LOCATION_STEP })}
                           href="" style={{pointerEvents: 'none', cursor: 'default'}} onClick={(event) => {
                            event.preventDefault()
                            dispatch(showLocationStep())
                        }}>Additional Locations {this.renderOkIcon({ constant : LOCATION_STEP })}</a>

                        <a class={this.makeClasses({ constant : DESCRIPTION_STEP })}
                           href="" style={{pointerEvents: 'none', cursor: 'default'}} onClick={(event) => {
                            event.preventDefault()
                            dispatch(showDescriptionStep())
                        }}>Description {this.renderOkIcon({ constant : DESCRIPTION_STEP })}</a>

                        <a class={this.makeClasses({ constant : QUOTE_OR_MOTTO_STEP })}
                           href="" style={{pointerEvents: 'none', cursor: 'default'}} onClick={(event) => {
                            event.preventDefault()
                            dispatch(showQuoteOrMottoStep())
                        }}>Quote or Motto {this.renderOkIcon({ constant : QUOTE_OR_MOTTO_STEP })}</a>

                        <a class={this.makeClasses({ constant : PHOTO_STEP })}
                           href="" style={{pointerEvents: 'none', cursor: 'default'}} onClick={(event) => {
                            event.preventDefault()
                            dispatch(showAddPhotoStep())
                        }}>Photos {this.renderOkIcon({ constant : PHOTO_STEP })}</a>
                    </nav>,
                    ] :
                    null
                }
            </aside>
        )
    }
}

ProgressChartSidebar.propTypes = propTypes;
ProgressChartSidebar.defaultProps = defaultProps;

export default ProgressChartSidebar;
