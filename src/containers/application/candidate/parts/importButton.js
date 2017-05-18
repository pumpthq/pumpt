import React, { Component, PropTypes } from 'react'
import ImportFromLinkedInButton from './ImportFromLinkedInButton'
import PencilIcon from '../../../../components/icons/pencil'
import { connect } from 'react-redux'
import {
    showAccordion
} from './../../../../actions/applicationCandidate'

@connect(
    null,
    function mapDispatchToProps(dispatch) {
        const onClickManual = () => {
            dispatch(showAccordion())
        }

        return {
            dispatch,
            onClickManual
        }
    }
)
class ImportButton extends Component {
    render() {
        const { onClickManual } = this.props

        return (
            <div class="mdl-card__actions card__actions">
                <p class="text text_color_l-grey text_size_xs">
                   </p>
                <div class="button__wrapper">
                    <ImportFromLinkedInButton/>{`
                            `}
                    <button
                        type="button"
                        class="mdl-button button button_type_colored button_include_icon button_size_s"
                        onClick={onClickManual}
                    >
                        <PencilIcon />{`
                            `}
                        <span class="icon__text">Set up profile manually</span>
                    </button>
                </div>
            </div>
        )
    }
}

ImportButton.propTypes = {
    onClickManual : () => {}
}

ImportButton.defaultProps = {
    onClickManual : PropTypes.func
}

export default ImportButton
