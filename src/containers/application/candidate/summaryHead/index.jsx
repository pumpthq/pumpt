import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SummaryHeadEdit from './edit';
import SummaryHeadStandard from './standard';
import ImportButton from './../parts/importButton';

@connect(
    function mapStateToProps(state) {
        const { accordion } = state.applicationCandidate;

        return {
            state,
            accordionState: accordion,
        };
    },
    function mapDispatchToProps(dispatch) {
        return {
            dispatch,
        };
    }
)
class SummaryHead extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false,
        };

        this.triggerEditState = this.triggerEditState.bind(this);
    }

    triggerEditState() {
        const { isEditing } = this.state;

        this.setState({
            isEditing: !isEditing
        });
    }

    render() {
        const { isEditing } = this.state;
        const { accordionState } = this.props;
        // TODO class edit ? filled
        return (
            <div class={`mdl-card card card_type_mini card_onb-info card_onb-info_${isEditing ? 'edit' : accordionState ? 'filled' : ''}`}>
                {isEditing ?
                    <SummaryHeadEdit onCancel={this.triggerEditState}/> :
                    <SummaryHeadStandard onEdit={this.triggerEditState}/>
                }
                {accordionState ? null : <ImportButton />}
            </div>
        )
    }

}

SummaryHead.propTypes = {
    accordionState : PropTypes.string
}

export default SummaryHead
