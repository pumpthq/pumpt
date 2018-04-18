import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import uuid from 'uuid';
import List from './../../../../../components/main/list';
import {findById} from '../../../../../constants/dropdownData';
import {saveApplicationData, showSetUpPasswordStep,} from './../../../../../actions/candidateOnboarding';
import {StepListLink} from '../../../renderHelpers';

@connect(
    (state) => {
        const { application } = state.candidateOnboarding;
        const activeItem = findById({
            id: application? application.id : null,
            data: [], 
        });

        return {
            activeItem,
        };
    },
    (dispatch) => {
        const nextStep = ({ id, value }) => {
            dispatch(saveApplicationData({
                experience: {
                    id,
                    value,
                },
            }));
            dispatch(showSetUpPasswordStep());
        };

        return {
            dispatch,
            nextStep,
        };
    }
)
class ApplicationForm extends Component {
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

ApplicationForm.propTypes = {
    nextStep: PropTypes.func,
    listItems: PropTypes.arrayOf(PropTypes.string),
    activeItem: PropTypes.object,
};
ApplicationForm.defaultProps = {
    listItems: [],
};

export default ApplicationForm;
