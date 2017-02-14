import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import ExperiencedInputDropdown from '../../../components/parts/experiencedInputDropdown';

const propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
};

const defaultProps = {};

class JobsFieldsetDropdown extends Component {
    componentWillMount() {
        this.inputId = uuid.v4();
    }
    render() {
        const {
            label,
            value,
        } = this.props;
        return (
            <fieldset className="form__row row">
                <div className="col-lg-2">
                    <label
                        className="text text_size_xs text_color_invert text_opacity_half text_helper text_helper_s"
                        htmlFor={this.inputId}
                    >
                        {label}
                    </label>
                </div>
                <div className="col-lg-3">
                    <div className="mdl-textfield mdl-js-textfield textfield dropdown__wrapper dropdown__wrapper_type_select dropdown__wrapper_select_two textfield_size_m textfield_color_invert is-dirty is-upgraded">
                        <input
                            className="mdl-textfield__input textfield__input"
                            type="type"
                            value={value}
                        />
                        <span className="mdl-textfield__label textfield__label" />
                        <div className="dropdown dropdown_size_m" />
                    </div>
                </div>
            </fieldset>
        );
    }
}

JobsFieldsetDropdown.propTypes = propTypes;

JobsFieldsetDropdown.defaultProps = defaultProps;

export default JobsFieldsetDropdown;
