import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { getSession } from 'actions/authorization'
import PopUpBig from './../../components/main/popup'

import Wrapper from './../../components/main/wrapper';

@connect(null, (dispatch) => {return {dispatch}})
class BaseLoginPage extends Component {

    constructor(props) {
        super(props)
        this.state = {}
      const { dispatch } = this.props;
      dispatch(getSession());
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
