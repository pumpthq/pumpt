import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Form from './../../../../../components/main/form'
import Button from './../../../../../components/main/button'
import DescriptionListItem from '../../../../../components/application/descriptionList/descriptionListItem'
import {
    saveLocationData,
    persistTempOffices,
    cancelLocationStep
} from './../../../../../actions/applicationCompany'
import AddOfficeForm from './AddOfficeForm'
import deepCopy from 'deep-copy'

@connect(
    function mapStateToProps(state) {
        const { tempOffices } = state.applicationCompany

        return {
            items : deepCopy(tempOffices),
            reduxForms : state.form
        }
    }
)
class AddLocationForm extends Component {

    render() {
        const { dispatch, items } = this.props
        const isAnyOfItemsFilled = items
            .filter((item) => (item.city && item.state))
            .length !== 0

        return (
            <DescriptionListItem>
                <Form onSubmit={(event) => {
                    event.preventDefault()

                    dispatch(saveLocationData())
                }}>
                    {items.map((item, index) => {
                        const storeAddress = item.id
                        const {
                            componentKey,
                            title,
                            city,
                            state
                        } = item

                        return (
                            <AddOfficeForm
                                key={componentKey}
                                title={title}
                                initialValues={{ city, state }}
                                form={storeAddress}
                                storeAddress={storeAddress}
                                items={items}
                                onDestroy={() => {
                                    const newOffices = items.filter((item) => (item.id !== storeAddress))

                                    dispatch(persistTempOffices({ offices : newOffices }))
                                }}
                                isRemovable={index !== items.length - 1}
                            />
                        )
                    })}
                    <div class="form__actions">
                        <Button
                            type='submit'
                            typeColored
                            disabled={!isAnyOfItemsFilled}
                        >Add</Button>
                        <a class="link" href=""
                            onClick={(event) => {
                                event.preventDefault()
                                dispatch(cancelLocationStep({}))
                        }}>Cancel</a>
                    </div>
                </Form>
            </DescriptionListItem>
        )
    }
}
AddLocationForm.propTypes = {
    dispatch : PropTypes.func,
    items : PropTypes.arrayOf(PropTypes.object),
    reduxForms : PropTypes.object,
    reduxGroup : PropTypes.string
}
AddLocationForm.defaultProps = {
    reduxGroup : 'companyApplicationAddOffice'
}

export default AddLocationForm
