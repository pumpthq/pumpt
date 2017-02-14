import React, { Component, PropTypes } from 'react';
import UploadImage from '../../../../components/application/uploadImage'
import ApplicationFieldset from'../../../../components/application/applicationFieldset'
import ApplicationFieldsetDropdown from'../../../../components/application/applicationFieldsetDropdown'
import OtherActiveInput from '../../../../components/application/otherActiveInput'
import Button from '../../../../components/main/button'

const propTypes = {};

const defaultProps = {};

const DROPDOWN_LIST = [
    {
        title: 'Account Management',
        list: false
    },
    {
        title: 'Ad Operations',
        list: [
            {
                title: 'Sub'
            }
        ]
    },
    {
        title: 'Sales',
        list: [
            {
                title: 'Mobile'
            },
            {
                title: 'Video'
            },
            {
                title: 'Other'
            }
        ]
    }
];

export default class OnboardingEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: this.forEachList(DROPDOWN_LIST)
        };

        this.onCheckItem = this.onCheckItem.bind(this);
        this.onCheckSubItem = this.onCheckSubItem.bind(this);
    }
    onCheckItem(id) {
        const { list } = this.state;

        let newList = list.map((e) => e);
        newList[id].checked = true;

        this.setState({
            list: newList
        })
    }
    onCheckSubItem(parent, id) {
        const { list } = this.state;

        let newList = list.map((e) => e);

        newList[parent].items[id].checked = true;

        this.setState({
            list: newList
        });
    }
    renderOtherInput() {
        return (
            <OtherActiveInput value="" label="Other"/>
        )
    }
    forEachSubList(parent, list) {
        return list.map( (item, key) => {
            return {
                title: item.title,
                checked: false,
                onClick: () => {
                    this.onCheckSubItem(parent, key)
                }
            }
        })
    }
    forEachList(list) {
        return list.map( (item, key) => {
            return {
                title: item.title,
                checked: false,
                items: item.list ? this.forEachSubList(key, item.list) : false,
                onClick: () => {
                    this.onCheckItem(key)
                }
            }
        })
    }
    render() {
        const { list } = this.state;
        return (
            <div className="summary-head">
                <div className="summary-head__title mdl-card__title">
                    <div className="summary-head__title-item">
                        <div className="summary-head__title-column">
                            <UploadImage/>
                            <div className="summary-head__title-block">
                                <form className="form">
                                    <ApplicationFieldset value="Jane" label="First Name"/>
                                    <ApplicationFieldset value="Sullivan" label="Last Name"/>
                                    <ApplicationFieldset value="j.sullivan@sd-ventures.com" label="Email"/>
                                    <ApplicationFieldsetDropdown value="Digital Media" label="Industry" list={list} otherChildren={this.renderOtherInput()}/>
                                    <ApplicationFieldsetDropdown value="Programmatic" label="Area of Expertise" list={list}/>
                                    <ApplicationFieldsetDropdown value="Director" label="Job Title" list={list}/>
                                    <ApplicationFieldsetDropdown value="$50—100K" label="Income" list={list}/>
                                    <ApplicationFieldsetDropdown value="5—10 years" label="Experience" list={list}/>
                                    <div className="form__actions">
                                        <Button typeColored disabled>Save</Button>
                                        <a className="link">
                                            Cancel
                                        </a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

OnboardingEdit.propTypes = propTypes;
OnboardingEdit.defaultProps = defaultProps;
