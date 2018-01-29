import React, {Component, PropTypes} from 'react'
import PopUpBig from './../../components/main/popup'

import Wrapper from './../../components/main/wrapper';

class BaseLoginPage extends Component {

    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        const { children } = this.props

        return (
            <Wrapper id="onboarding-candidate">
                <PopUpBig
                    heading='Log In'
                    children={children}
                    backgroundTransparency={true}
                />
            </Wrapper>
        )
    }

}

BaseLoginPage.propTypes = {
    children : PropTypes.node
}
BaseLoginPage.defaultProps = {}

export default BaseLoginPage
