require('jasmine-co').install()
import * as constants from './../constants/candidateOnboarding'
import * as actions from './../actions/candidateOnboarding'
import {getCandidateOnboarding} from './../reducers/candidateOnboarding'
import store from './../store'
import faker from 'faker'
// import helpers from './../helpers'

const {
    dispatch,
    getState
} = store

const expect = chai.expect

describe('candidate onboarding', function() {
    it('will dispatch show contact info step', function * () {
        dispatch(actions.showContactInfoStep())

        const state = getCandidateOnboarding(getState())

        expect(state).to.be.an('Object')
            .and.have.property('step')
            .and.be.equals(constants.SHOW_CONTACT_INFO_STEP)
    });

    it('will dispatch save contact info step', function * () {
        dispatch(actions.saveContactInfoData({
            firstName : faker.name.firstName(),
            lastName : faker.name.lastName(),
            email : faker.internet.email()
        }))

        const state = getCandidateOnboarding(getState())

        expect(state).to.be.an('Object')
            .and.have.property('step')
            .and.be.equals(constants.SHOW_CONTACT_INFO_STEP)
    });


    it('will dispatch show industry step', function * () {
        dispatch(actions.showIndustryStep())

        const state = getCandidateOnboarding(getState())

        expect(state).to.be.an('Object')
            .and.have.property('step')
            .and.be.equals(constants.SHOW_INDUSTRY_STEP)
    });

    it('will dispatch save industry step', function * () {
        dispatch(actions.saveIndustryData({
            industry: faker.company.companyName()
        }))

        const state = getCandidateOnboarding(getState())

        expect(state).to.be.an('Object')
            .and.have.property('step')
            .and.be.equals(constants.SHOW_INDUSTRY_STEP)
    });

    it('will dispatch show field of expertise step', function * () {
        dispatch(actions.showFieldOfExpertiseStep())

        const state = getCandidateOnboarding(getState())

        expect(state).to.be.an('Object')
            .and.have.property('step')
            .and.be.equals(constants.SHOW_FIELD_OF_EXPERTISE_STEP)
    });

    it('will dispatch save field of expertise step', function * () {
        dispatch(actions.saveFieldOfExpertiseStep({
            fieldOfExpertise : faker.internet.userName()
        }))

        const state = getCandidateOnboarding(getState())

        expect(state).to.be.an('Object')
            .and.have.property('step')
            .and.be.equals(constants.SHOW_FIELD_OF_EXPERTISE_STEP)
    });

    it('will dispatch show job title step', function * () {
        dispatch(actions.showJobTitleStep())

        const state = getCandidateOnboarding(getState())

        expect(state).to.be.an('Object')
            .and.have.property('step')
            .and.be.equals(constants.SHOW_JOB_TITLE_STEP)
    });

    it('will dispatch save job title step', function * () {
        dispatch(actions.saveJobTitleStep({
            jobTitle : faker.internet.userName()
        }))

        const state = getCandidateOnboarding(getState())

        expect(state).to.be.an('Object')
            .and.have.property('step')
            .and.be.equals(constants.SHOW_JOB_TITLE_STEP)
    });

    it('will dispatch show income step', function * () {
        dispatch(actions.showIncomeStep())

        const state = getCandidateOnboarding(getState())

        expect(state).to.be.an('Object')
            .and.have.property('step')
            .and.be.equals(constants.SHOW_INCOME_STEP)
    });

    it('will dispatch save income step', function * () {
        dispatch(actions.saveIncomeData({
            income : faker.finance.mask(4,true,false)
        }))

        const state = getCandidateOnboarding(getState())

        expect(state).to.be.an('Object')
            .and.have.property('step')
            .and.be.equals(constants.SHOW_INCOME_STEP)
    });

    it('will dispatch show set up password step', function * () {
        dispatch(actions.showSetUpPasswordStep())

        const state = getCandidateOnboarding(getState())

        expect(state).to.be.an('Object')
            .and.have.property('step')
            .and.be.equals(constants.SHOW_SET_UP_PASSWORD_STEP)
    });

})
