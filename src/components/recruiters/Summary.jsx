import React, {Component} from 'react'

export default class RecruiterSummary extends Component {
  render() {
    //const { recruiter: { firstName, lastName, position } } = this.props
    const { recruiter: { fullName, position, avatar } } = this.props
    const { authorization: {email}, onEdit} = this.props
    return (
      <div class="summary-head row">
        <div class="col-12 py-5">
          <h2>
            {fullName}
          </h2>
          <span>{position}</span>
          <br />
          <span>{email}</span>
          <br />
          <a class="link link__edit" onClick={onEdit}>
            Edit
          </a>
        </div>
      </div>
    )
  }
}
