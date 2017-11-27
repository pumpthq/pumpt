import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import List from './../../../../../components/main/list';
import { findById } from '../../../../../constants/dropdownData';
import {
    saveExperienceData,
    showCompanySizeStep,
		gotoCompanySizeStep,
} from './../../../../../actions/candidateOnboarding';
import { StepListLink } from '../../../renderHelpers';
import { EXPERIENCE_DROPDOWN_DATA } from './../../../../../constants/candidateOnboarding';

@connect(
    (state) => {
        const { experience } = state.candidateOnboarding;
        const activeItem = findById({
            id: experience ? experience.id : null,
            data: EXPERIENCE_DROPDOWN_DATA,
        });

        return {
            activeItem,
        };
    },
    (dispatch) => {
        const nextStep = ({ id, value }) => {
            dispatch(saveExperienceData({
                experience: {
                    id,
                    value,
                },
            }));
            dispatch(showCompanySizeStep());
            dispatch(gotoCompanySizeStep());
        };

        return {
            dispatch,
            nextStep,
        };
    }
)
class ExperienceForm extends Component {
    render() {
        const { listItems, nextStep, activeItem } = this.props;

        return (
            <List type="onboarding">
                {listItems.map(item => {
                    return (
                        <StepListLink
                            {...{
                                key: uuid.v4(),
                                item,
                                activeItem,
                                onClick: nextStep,
                            }}
                        />
                    );
                })}
            </List>
        );
    }
}

ExperienceForm.propTypes = {
    nextStep: PropTypes.func,
    listItems: PropTypes.arrayOf(PropTypes.string),
    activeItem: PropTypes.object,
};
ExperienceForm.defaultProps = {
    listItems: EXPERIENCE_DROPDOWN_DATA,
};

export default ExperienceForm;
