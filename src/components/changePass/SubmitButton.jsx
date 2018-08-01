import React, {PropTypes} from 'react';

const SubmitButton = props => (
    <button
        className="button_type_colored button_size_"
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
