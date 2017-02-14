import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

const propTypes = {
    skillsAndRequirements: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.array,
    ]),
};

const defaultProps = {
    skillsAndRequirements: '',
};

@connect(
    (state) => {
        const { skillsAndRequirements } = state.companyJobs.newJob;
        return {
            skillsAndRequirements,
        };
    }
)
export default class AddSkillsAndRequirementsFilled extends Component {
    render() {
        const { skillsAndRequirements } = this.props;
        return (
            <div
                className="list__item-general"
                style={{
                    whiteSpace: 'pre',
                }}
            >
                {skillsAndRequirements}
            </div>
        );
    }
}

AddSkillsAndRequirementsFilled.propTypes = propTypes;
AddSkillsAndRequirementsFilled.defaultProps = defaultProps;
