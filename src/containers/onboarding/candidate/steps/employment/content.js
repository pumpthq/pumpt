import React, {Component, PropTypes} from 'react'
import _ from 'lodash'
import {connect} from 'react-redux'
import List from './../../../../../components/main/list'
import uuid from 'uuid'
import {findById} from '../../../../../constants/dropdownData'
import {apiEnumToListData} from './../../../../../utils'

import {
    gotoValuesStep,
    saveEmploymentData,
    showValuesStep,
} from './../../../../../actions/candidateOnboarding'

import {StepListCheckLink} from '../../../renderHelpers'
import {EMPLOYMENT_DROPDOWN_DATA} from './../../../../../constants/candidateOnboarding'

@connect(
    function mapStateToProps(state, ownProps) {
        const { industries } = state.candidateOnboarding

        let activeItems = [];

        if(items) {
            for(var item of items) {
                let v = findById({
                    id: industry.id,
                    data: EMPLOYMENT_DROPDOWN_DATA
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
          // if it's already selected, unselect it
            for(let i in ownProps.activeItems) {
                if(ownProps.activeItems[i].id == a.id) {
                    ownProps.activeItems.splice(i,1);
                    dispatch(saveEmploymentData({
                        industries : ownProps.activeItems
                    }))
                    return;
                }
            }
          // add it
            ownProps.activeItems.push({
                id: a.id,
                value: a.value
            });
            dispatch(saveEmploymentData({
                industries : ownProps.activeItems
            }))

        }

        const nextStep = ({ id, industry }) => {
					dispatch(showValuesStep())
					dispatch(gotoValuesStep())
        }

        return {
            dispatch,
            nextStep,
            select
        }
    }
)
class EmploymentForm extends Component {

    render() {
        const { listItems, nextStep, activeItems, select } = this.props

        return (
            <div>
                <List type='onboarding' visualType='plainCheckboxes'>
                    {listItems[0].items.map(item => {
												//something weird happening here

                        return (
                            <StepListCheckLink {...{
                                key : uuid.v4(),
                                item,
                                activeItems: activeItems,
                                onClick: select,
                                active: !!_.find(activeItems, function(ai) { return ai.id == item.id })
                            }} />
                        )
											})
										}
                </List>
                <button class="onboarding__next mdl-button button button_type_colored button_size_l" disabled={!activeItems || activeItems.length < 1} onClick={nextStep}>Next</button>
            </div>
        )
    }
}

EmploymentForm.propTypes = {
    nextStep : PropTypes.func,
    select : PropTypes.func,
    listItems : PropTypes.arrayOf(PropTypes.string),
    activeItems : PropTypes.array
}
EmploymentForm.defaultProps = {
    activeItems: [],
    listItems : EMPLOYMENT_DROPDOWN_DATA
}

export default EmploymentForm
