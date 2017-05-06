import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Button from './../../../../../../components/main/button';
import Form from './../../../../../../components/main/form';
import TextArea from '../../../../../../components/main/textarea';
import {
    cancelSkillsAndRequirementsStep,
    saveSkillsAndRequirementsData,
} from './../../../../../../actions/companyJobs';

const propTypes = {
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    dispatch: PropTypes.func,
};

const defaultProps = {};

@connect(
    (state) => {
        const { skillsAndRequirements } = state.companyJobs.newJob;
        return {
            initialValues: {
                skillsAndRequirements,
            },
        };
    },

    (dispatch) => ({ dispatch }),
)
@reduxForm({
    form: 'newJobAddSkillsAndRequirements',
    fields: [
        'skillsAndRequirements',
    ],
})
export default class AddSkillsAndRequirementsActive extends Component {
    render() {
        const {
            dispatch,
            fields: {
                skillsAndRequirements,
            },
            handleSubmit,
        } = this.props;
        return (
            <Form
                className="form_indent-size_none"
                onSubmit={
                    handleSubmit((fields) => {
                        dispatch(saveSkillsAndRequirementsData(fields));
                    })
                }
            >
                <TextArea
                    label="Provide some details, so viewers can get a quick idea of what the position involves "
                    {...skillsAndRequirements}
                />
                <div className="form__actions form__actions_indent-size_m">
                    <Button
                        typeColored
                        type="submit"
                    >
                        Add
                    </Button>
                    <a
                        className="link"
                        onClick={(event) => {
                            event.preventDefault();
                            dispatch(cancelSkillsAndRequirementsStep());
                        }}
                    >
                        Cancel
                    </a>
                </div>
            </Form>
        );
    }
}

AddSkillsAndRequirementsActive.propTypes = propTypes;
AddSkillsAndRequirementsActive.defaultProps = defaultProps;
