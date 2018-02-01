require('jasmine-co').install()

import store from './../store'
import * as actions from './../actions/applicationCandidate'

const expect = chai.expect

const {
    dispatch,
    getState
} = store

describe('Actions: Candidate', () => {
    describe('Profile', () => {
        describe('Education', () => {
            it('On default should contain empty educations', () => {
                dispatch(actions.educatuonsShow({}))

                const state = getState()

                expect(state.applicationCandidate).to.be.an('Object')
                    .and.have.property('educations')
                expect(state.applicationCandidate.educations).to.be.an('Array')
                    .and.have.lengthOf(0)
            })

            it('Should add an educatuon', () => {
                dispatch(actions.educatuonsShow({}))

                const itemToAdd = {
                    schoolName: 'school',
                    fromYear: '2012'
                }

                dispatch(actions.educationsAdd(itemToAdd))

                const state = getState()

                expect(state.applicationCandidate).to.be.an('Object')
                    .and.have.property('educations')
                expect(state.applicationCandidate.educations).to.be.an('Array')
                    .and.have.lengthOf(1)
                expect(state.applicationCandidate.educations[0]).to.be.deep.equal(itemToAdd)
            })
        })
    })
})
