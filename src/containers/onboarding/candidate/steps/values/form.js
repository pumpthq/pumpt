import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import List from './../../../../../components/main/list'
import uuid from 'uuid'
import { findById } from '../../../../../constants/dropdownData'

import {
    saveValuesData,
    showSetUpPasswordStep,
		gotoSetUpPasswordStep,
} from './../../../../../actions/candidateOnboarding'

import { StepListCheckLink } from '../../../renderHelpers'
import { VALUE_ASSESSMENTS_DROPDOWN_DATA } from './../../../../../constants/candidateOnboarding'

@connect(
    function mapStateToProps(state, ownProps) {
        const { values } = state.candidateOnboarding

        let activeItems = [];

        if(values) {
            for(var value of values) {
                let v = findById({
                    id: value.id,
                    data: VALUE_ASSESSMENTS_DROPDOWN_DATA
                });
                v ? activeItems.push(v) : null;
            }
        }

        return {
            activeItems
        }
    },
    function mapDispatchToProps(dispatch, ownProps) {

        const select = (a) => {
            for(let i in ownProps.activeItems) {
                if(ownProps.activeItems[i].id == a.id) {
                    ownProps.activeItems.splice(i,1);
                    dispatch(saveValuesData({
                        values : ownProps.activeItems
                    }))
                    return;
                }
            }
            if(ownProps.activeItems.length == 3) {
                ownProps.activeItems.splice(0,1);
            }
            ownProps.activeItems.push({
                id: a.id,
                value: a.value
            });
            dispatch(saveValuesData({
                values : ownProps.activeItems
            }))

        }

        const nextStep = ({ id, value }) => {
          dispatch(showSetUpPasswordStep())
          dispatch(gotoSetUpPasswordStep())
        }

        return {
            dispatch,
            nextStep,
            select
        }
    }
)
class ValuesForm extends Component {

    render() {
        const { listItems, nextStep, activeItems, select } = this.props
        return (
            <div>
                <List type='onboarding' visualType='plainCheckboxes'>
                    {listItems.map(item => {
                        return (
                            <StepListCheckLink {...{
                                key : uuid.v4(),
                                item,
                                activeItems: activeItems,
                                onClick: select,
                                active: !!_.find(activeItems, function(ai) { return ai.id == item.id })
                            }} />
                        )
                    })}
                </List>
                <button class="onboarding__next mdl-button button button_type_colored button_size_l" disabled={!activeItems || activeItems.length < 3} onClick={nextStep}>Next</button>
                <div className="classsssName"></div>
            </div>
        )
    }
}

ValuesForm.propTypes = {
    nextStep : PropTypes.func,
    select : PropTypes.func,
    listItems : PropTypes.arrayOf(PropTypes.string),
    activeItems : PropTypes.array
}
ValuesForm.defaultProps = {
    activeItems: [],
    listItems : VALUE_ASSESSMENTS_DROPDOWN_DATA
}

export default ValuesForm
