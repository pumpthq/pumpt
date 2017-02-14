import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

const propTypes = {
    responsibilities: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.array,
    ]),
};

const defaultProps = {
    responsibilities: '',
};

@connect(
    (state) => {
        const { responsibilities } = state.companyJobs.newJob;
        return {
            responsibilities,
        };
    }
)
export default class AddResponsibilitiesFilled extends Component {
    render() {
        const { responsibilities } = this.props;
        return (
            <div
                className="list__item-general"
                style={{
                    whiteSpace: 'pre',
                }}
            >
                {responsibilities}
            </div>
        );
    }
}

AddResponsibilitiesFilled.propTypes = propTypes;
AddResponsibilitiesFilled.defaultProps = defaultProps;
