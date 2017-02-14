import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

const propTypes = {
    description: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.array,
    ]),
};

const defaultProps = {
    description: '',
};

@connect(
    (state) => {
        const { description } = state.companyJobs.newJob;
        return {
            description,
        };
    }
)
export default class AddDescriptionFilled extends Component {
    render() {
        const { description } = this.props;
        return (
            <div
                className="list__item-general"
                style={{
                    whiteSpace: 'pre',
                }}
            >
                {description}
            </div>
        );
    }
}

AddDescriptionFilled.propTypes = propTypes;
AddDescriptionFilled.defaultProps = defaultProps;
