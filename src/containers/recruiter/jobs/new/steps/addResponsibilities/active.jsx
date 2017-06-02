import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Button from './../../../../../../components/main/button';
import Form from './../../../../../../components/main/form';
import TextArea from '../../../../../../components/main/textarea';
import {
    cancelResponsibilitiesStep,
    saveResponsibilitiesData,
} from './../../../../../../actions/companyJobs';

const propTypes = {
    fields: PropTypes.object,
    dispatch: PropTypes.func,
    handleSubmit: PropTypes.func,
};

const defaultProps = {};

@connect(
    (state) => {
        const { responsibilities } = state.companyJobs.newJob;
        return {
            initialValues: {
                responsibilities,
            },
        };
    },

    (dispatch) => ({ dispatch }),
)
@reduxForm({
    form: 'newJobAddResponsibilities',
    fields: [
        'responsibilities',
    ],
})
export default class AddResponsibilitiesActive extends Component {
    render() {
        const {
            dispatch,
            fields: {
                responsibilities,
            },
            handleSubmit,
        } = this.props;
        return (
            <Form
                className="form_indent-size_none"
                onSubmit={
                    handleSubmit((fields) => {
                        dispatch(saveResponsibilitiesData(fields));
                    })
                }
            >
                <TextArea
                    label="Provide some details, so viewers can get a quick idea of what the position involves "
                    {...responsibilities}
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
                            dispatch(cancelResponsibilitiesStep());
                        }}
                    >
                        Cancel
                    </a>
                </div>
            </Form>
        );
    }
}

AddResponsibilitiesActive.propTypes = propTypes;
AddResponsibilitiesActive.defaultProps = defaultProps;
