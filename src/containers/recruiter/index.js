import React, {Component} from 'react'
import EditContainer from 'containers/recruiter/EditContainer'
import ChangePasswordContainer from 'containers/ChangePasswordContainer'
import RecruiterContainer from 'containers/recruiter/RecruiterContainer'

import RequireAuth from 'wrappers/RequireAuth'

const RecruiterChangePasswordContainer = () => {
  return <div className="mdl-card"><ChangePasswordContainer /></div>
}

module.exports = {
    path: 'recruiter',
    component: RequireAuth(RecruiterContainer), //🍮 route /recruiter/* will require auth
    childRoutes:[
        {path: 'edit', component: EditContainer},
        {path: 'changePass', component: RecruiterChangePasswordContainer},
        require('./company'),
        require('./jobs')
    ]
};
