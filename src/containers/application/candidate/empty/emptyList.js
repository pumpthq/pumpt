import React, { Component, PropTypes } from 'react'
import './empty-list.less'

import { AccordionItem, AccordionLayout } from '../../../../components/application/accordion'

import CaseIcon from '../../../../components/icons/case'
import EducationIcon from '../../../../components/icons/education'
import PinIcon from '../../../../components/icons/pin'
import SocialIcon from '../../../../components/icons/social'
import Skills from '../../../../components/icons/skills'
import Heart from '../../../../components/icons/heart'

import EducationStepActive from '../steps/addEducation/active'
import EducationStepFilled from '../steps/addEducation/filled'

const propTypes = {}

const defaultProps = {}

export default class EmptyList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            experience: false
        }

        this.onClick = this.onClick.bind(this)
        this.onEdit = this.onEdit.bind(this)
    }
    onClick(type) {
        const { state } = this;
        if(!state[type]) {
            state[type] = 'filled';
        } else {
            /*state[type] = false;*/
        }

        this.setState(state);
    }
    onEdit(type) {
        const { state } = this;
        state[type] = 'active';
        this.setState(state);
    }
    render() {
        let { experience } = this.state
        return (
            <AccordionLayout>
                <AccordionItem
                    iconElement={<CaseIcon/>}
                    title="Add Experience"
                    defaultTitle="Experience"
                    editTitle="Edit Position"
                    status={experience}
                    childrenActive={<EducationStepActive/>}
                    childrenFilled={<EducationStepFilled/>}
                    onClick={() => {
                        this.onClick('experience')
                    }}
                    onEdit={() => {
                        this.onEdit('experience')
                    }}
                />
                <AccordionItem
                    iconElement={<EducationIcon/>}
                    title="Add Education"
                    defaultTitle="Education"
                    editTitle="Edit Education"
                />
                <AccordionItem
                    iconElement={<PinIcon/>}
                    title="Add Location"
                    defaultTitle="Location"
                    editTitle=""
                />
                <AccordionItem
                    iconElement={<SocialIcon/>}
                    title="Add Social Media"
                    defaultTitle="Social Media"
                    editTitle=""
                />
                <AccordionItem
                    iconElement={<Skills/>}
                    title="Add Skills"
                    defaultTitle="Skills"
                    editTitle="Edit Skills"
                />
                <AccordionItem
                    iconElement={<Heart/>}
                    title="Add Interests"
                    defaultTitle="Interests"
                    editTitle="Edit Interests"
                />
            </AccordionLayout>
        )
    }
}

EmptyList.propTypes = propTypes
EmptyList.defaultProps = defaultProps
