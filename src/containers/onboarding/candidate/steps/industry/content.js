import React, {Component, PropTypes} from 'react'
import _ from 'lodash'
import {connect} from 'react-redux'
import List from './../../../../../components/main/list'
import uuid from 'uuid'
import {findById} from '../../../../../constants/dropdownData'
import {apiEnumToListData} from './../../../../../utils'

import {
    gotoFieldOfExpertiseStep,
    saveIndustryData,
    showFieldOfExpertiseStep,
} from './../../../../../actions/candidateOnboarding'

import {StepListCheckLink} from '../../../renderHelpers'
import {INDUSTRY_DROPDOWN_DATA} from './../../../../../constants/candidateOnboarding'

@connect(
    function mapStateToProps(state, ownProps) {
        const { industries } = state.candidateOnboarding

        let activeItems = [];

        if(industries) {
            for(var industry of industries) {
                let v = findById({
                    id: industry.id,
                    data: INDUSTRY_DROPDOWN_DATA
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
                    dispatch(saveIndustryData({
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
            dispatch(saveIndustryData({
                industries : ownProps.activeItems
            }))

        }

        const nextStep = ({ id, industry }) => {
					dispatch(showFieldOfExpertiseStep())
					dispatch(gotoFieldOfExpertiseStep())
        }

        return {
            dispatch,
            nextStep,
            select
        }
    }
)
class IndustryForm extends Component {

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

IndustryForm.propTypes = {
    nextStep : PropTypes.func,
    select : PropTypes.func,
    listItems : PropTypes.arrayOf(PropTypes.string),
    activeItems : PropTypes.array
}
IndustryForm.defaultProps = {
    activeItems: [],
    listItems : INDUSTRY_DROPDOWN_DATA
}

export default IndustryForm
