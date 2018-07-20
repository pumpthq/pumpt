import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import H3 from './../heading/h3'
import PopupError from './../../../components/PopupError'

const propTypes = {
    children : PropTypes.node,
    heading : PropTypes.string,
    loginPageError : PropTypes.bool,
    backgroundTransparency: PropTypes.bool
}
const defaultProps = {
    loginPageError: false,
    backgroundTransparency: false
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

    makeContainerClassName() {
        let finalinzedClassName = 'popup-overlay'
        const { backgroundTransparency } = this.props
        if(backgroundTransparency) {
            finalinzedClassName += ' popup-transparent'
        }
        return finalinzedClassName
    }

    render() {
        const {
            children,
            heading,
            loginPageError
        } = this.props

        return (
            <div class={this.makeContainerClassName()}>
                <div class="popup popup_big">
                    {/*<a href="" class="button button_type_close">×</a>*/}
                    <div className="popup__top">
                        <h1 class="text-center py-4 font-weight-normal">{ heading }</h1>
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
