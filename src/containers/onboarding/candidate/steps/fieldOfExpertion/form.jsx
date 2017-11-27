import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { findById } from '../../../../../constants/dropdownData';
import { StepTopAccordion } from '../../../renderHelpers';

import {
    saveFieldOfExpertiseStep,
    showJobTitleStep,
    gotoJobTitleStep,
} from './../../../../../actions/candidateOnboarding';

import { FIELD_OF_EXPERTISE_DROPDOWN_DATA } from './../../../../../constants/candidateOnboarding';

const FieldOfExpertiseForm = ({ nextStep, listItems, activeItem }) => (
    <StepTopAccordion
        {...{
            list: listItems,
            activeItem,
            onClick: nextStep,
        }}
    />
);

FieldOfExpertiseForm.propTypes = {
    nextStep: PropTypes.func,
    listItems: PropTypes.arrayOf(PropTypes.object),
    activeItem: PropTypes.object,
};

FieldOfExpertiseForm.defaultProps = {
    listItems: FIELD_OF_EXPERTISE_DROPDOWN_DATA,
};

export default connect(
    (state) => {
        const { fieldOfExpertise } = state.candidateOnboarding;
        const activeItem = findById({
            id: fieldOfExpertise ? fieldOfExpertise.id : null,
            data: FIELD_OF_EXPERTISE_DROPDOWN_DATA,
        });

        return {
            activeItem,
        };
    },
    (dispatch) => {
        const nextStep = ({ id, value, parent }) => {
            dispatch(saveFieldOfExpertiseStep({
                fieldOfExpertise: {
                    id,
                    value,
                },
                fieldOfExpertiseHead: {
                    value: parent,
                },
            }));
            dispatch(showJobTitleStep());
            dispatch(gotoJobTitleStep());
        };
        return {
            dispatch,
            nextStep,
        };
    }
)(FieldOfExpertiseForm);
