import React, {PropTypes} from 'react';

const SubmitButton = props => (
    <button
        className="mdl-button button button_type_colored button_size_s"
        disabled={props.isDisabled}
        type="submit"
    >
        Change
    </button>
);

SubmitButton.propTypes = {
    isDisabled: PropTypes.bool,
};

export default SubmitButton;
