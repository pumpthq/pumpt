import React, {Component} from 'react'
import {connect} from 'react-redux'
import {resolveUser} from 'actions/authorization'

const RequireAuth = (WrappedComponent) => {
    const mstp = (state) => ({authorization:state.authorization})

    class AuthResolver extends Component {
        componentWillMount() {
            console.log(this.props.location.pathname)
            this.props.dispatch(resolveUser(this.props.location.pathname))
        }
        render() {
            return(
                <div id="wrapper__require-auth">
                {this.props.authorization.email ?
                    <WrappedComponent {...this.props}/>
                    :
                    <div>
                        Resolving Auth....
                    </div>
                }
                </div>
            )
        }
    }

    return connect(mstp)(AuthResolver)
}

export default RequireAuth
