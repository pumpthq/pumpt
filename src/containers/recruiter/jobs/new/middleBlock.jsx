import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { AccordionItem } from '../../../../components/jobs';
import AddDescriptionActive from './steps/addDescription/active';
import AddDescriptionFilled from './steps/addDescription/filled';
import AddResponsibilitiesActive from './steps/addResponsibilities/active';
import AddResponsibilitiesFilled from './steps/addResponsibilities/filled';
import AddSkillsAndRequirementsActive from './steps/addSkillsAndRequirements/active';
import AddSkillsAndRequirementsFilled from './steps/addSkillsAndRequirements/filled';
import ApplicationAccordionPrototype from './../../../application/accordionPrototype';

import {
    DESCRIPTION_STEP,
    RESPONSIBILITIES_STEP,
    SKILLS_AND_REQUIREMENTS_STEP,
} from './../../../../constants/companyJobs';
import {
    showDescriptionStep,
    cancelDescriptionStep,

    showResponsibilitiesStep,
    cancelResponsibilitiesStep,

    showSkillsAndRequirementsStep,
    cancelSkillsAndRequirementsStep,
} from './../../../../actions/companyJobs';

const propTypes = {};
const defaultProps = {};

@connect(
    (state) => {
        //
        //  const { progress, active } = state.companyJobs.newJob;

        return {
            filled: [],
            active: [],
        };
    },
    (dispatch) => ({ dispatch })
)
class MiddleBlock extends ApplicationAccordionPrototype {

    constructor(props) {
        super(props);

        this.isActiveOrFilled = this.isActiveOrFilled.bind(this);
        this.syncWithStore = this.syncWithStore.bind(this);
    }

    syncWithStore() {
        const nextState = {
            description: this.isActiveOrFilled({ constant: DESCRIPTION_STEP }),
            responsibilities: this.isActiveOrFilled({ constant: RESPONSIBILITIES_STEP }),
            skillsAndRequirements: this.isActiveOrFilled({ constant: SKILLS_AND_REQUIREMENTS_STEP }),
        };

        return nextState;
    }

    render() {
        const { dispatch } = this.props;
        const { description, responsibilities, skillsAndRequirements } = this.syncWithStore();

        return (
            <div className="card__middle-block">
                <dl className="list list_accordion list_accordion_small">
                    <AccordionItem
                        defaultTitle="Job Description"
                        title="Add Job Description"
                        status={description}
                        childrenActive={<AddDescriptionActive />}
                        childrenFilled={<AddDescriptionFilled />}
                        onClick={() => dispatch(showDescriptionStep())}
                        onEdit={() => dispatch(showDescriptionStep())}
                        onWhenFilledClick={() => dispatch(showDescriptionStep())}
                        onWhenActiveClick={() => dispatch(cancelDescriptionStep())}
                    />
                    <AccordionItem
                        defaultTitle="Responsibilities"
                        title="Add Responsibilities"
                        status={responsibilities}
                        childrenActive={<AddResponsibilitiesActive />}
                        childrenFilled={<AddResponsibilitiesFilled />}
                        onClick={() => dispatch(showResponsibilitiesStep())}
                        onEdit={() => dispatch(showResponsibilitiesStep())}
                        onWhenFilledClick={() => dispatch(showResponsibilitiesStep())}
                        onWhenActiveClick={() => dispatch(cancelResponsibilitiesStep())}
                    />
                    <AccordionItem
                        defaultTitle="Skills & Requirements"
                        title="Add Skills & Requirements"
                        status={skillsAndRequirements}
                        childrenActive={<AddSkillsAndRequirementsActive />}
                        childrenFilled={<AddSkillsAndRequirementsFilled />}
                        onClick={() => dispatch(showSkillsAndRequirementsStep())}
                        onEdit={() => dispatch(showSkillsAndRequirementsStep())}
                        onWhenFilledClick={() => dispatch(showSkillsAndRequirementsStep())}
                        onWhenActiveClick={() => dispatch(cancelSkillsAndRequirementsStep())}
                    />
                </dl>
            </div>

        );
    }
}

MiddleBlock.propTypes = propTypes;
MiddleBlock.defaultProps = defaultProps;

export default MiddleBlock;
