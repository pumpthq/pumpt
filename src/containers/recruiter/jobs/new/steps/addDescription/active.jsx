import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Button from './../../../../../../components/main/button';
import Form from './../../../../../../components/main/form';
import TextArea from '../../../../../../components/main/textarea';
import {
    cancelDescriptionStep,
    saveDescriptionData,
} from './../../../../../../actions/companyJobs';

const propTypes = {
    dispatch: PropTypes.object,
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
};
const defaultProps = {};

@connect(
    (state) => {
        const { description } = state.companyJobs.newJob;
        return {
            initialValues: {
                description,
            },
        };
    },

    (dispatch) => ({ dispatch }),
)
@reduxForm({
    form: 'newJobAddDescription',
    fields: [
        'description',
    ],
})
export default class AddDescriptionActive extends Component {

    render() {
        const {
            dispatch,
            fields: {
                description,
            },
            handleSubmit,
        } = this.props;

        return (
            <Form
                className="form_indent-size_none"
                onSubmit={
                    handleSubmit((fields) => {
                        dispatch(saveDescriptionData(fields));
                    })
                }
            >
                <TextArea
                    label="Provide some details, so viewers can get a quick idea of what the position involves "
                    {...description}
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
                            dispatch(cancelDescriptionStep());
                        }}
                    >
                        Cancel
                    </a>
                </div>
            </Form>
        );
    }

}

AddDescriptionActive.propTypes = propTypes;
AddDescriptionActive.defaultProps = defaultProps;
