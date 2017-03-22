import BaseLoginPage from './BaseLoginPage'
import LoginForm from './LoginForm'
import ForgotPasswordForm from './ForgotPasswordForm'

module.exports = {
    path: 'story',
    component: BaseLoginPage,
    childRoutes: [{
        path: 'login',
        component: LoginForm
    }, {
        path: 'forgot',
        component: ForgotPasswordForm
    }]
}
