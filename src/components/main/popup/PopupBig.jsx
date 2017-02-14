import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import H3 from './../heading/h3'
import PopupError from './../../../components/PopupError'

const propTypes = {
    children : PropTypes.node,
    heading : PropTypes.string,
    loginPageError : PropTypes.string
}
const defaultProps = {
    loginPageError: false
}

@connect(
    function mapStateToProps(state) {
        const { loginPageError } = state.authorization;

        return {
            // loginPageError
        }
    }
)
class PopUpBig extends Component {

    render() {
        const {
            children,
            heading,
            loginPageError
        } = this.props

        return (
            <div class="popup-overlay">
                <div class="popup popup_big">
                    {/*<a href="" class="button button_type_close">×</a>*/}
                    <div className="popup__top">
                        <H3 class="heading heading_type_four">{ heading }</H3>
                    </div>
                    <div className="popup__middle">
                        { children }
                    </div>
                    {loginPageError ? <PopupError text={loginPageError}/> : null}
                </div>
            </div>
        )
    }

}

PopUpBig.propTypes = propTypes
PopUpBig.defaultProps = defaultProps

export default PopUpBig
