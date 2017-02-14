import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { OnboardingInput } from './../../../../../components/onboarding'
import ExperiencedInputDropdown from './../../../../../components/parts/experiencedInputDropdown'
import LocationFilter from './../../../../../components/parts/locationFilter'
import {
    setCityAndStateToOffice
} from './../../../../../actions/applicationCompany'

@connect(
    function mapDispatchToProps(dispatch) {
        return {
            dispatch
        }
    }
)
@reduxForm({
    fields : [
        'city',
        'state'
    ],
    validate : (values) => {
        const errors = {}
        const { city, state } = values

        if (!city) {
            errors.city = ' '
        }

        if (!state) {
            errors.state = ' '
        }

        return errors
    }
})
class AddOffice extends Component {

    render() {
        const {
            title,
            storeAddress,
            fields : {
                city,
                state
            },
            dispatch,
            onDestroy,
            isRemovable
        } = this.props
        const refs = this.refs

        return (
            <fieldset class="row form__row">
                <div class="col-lg-3">
                    <p class="text text_size_xs text_helper text_helper_s">{title}</p>
                </div>
                <div class="col-lg-5">
                    <div class="mdl-textfield mdl-js-textfield textfield dropdown__wrapper dropdown__wrapper_type_autofill">
                        <ExperiencedInputDropdown
                            {...{
                                label : 'City',
                                ctrl : city,
                                dropdownSize : 's',
                                listTypeSize : 'm',
                                listTypeNowrapClass : false,
                                textFieldSize : false,
                                textSizeForEachList : false,
                                filter : LocationFilter,
                                onFilter : ({ dispatch, value }) => {
                                    dispatch({
                                        type : 'redux-form/CHANGE',
                                        field : 'city',
                                        value,
                                        touch : true,
                                        form : storeAddress
                                    })
                                },
                                onClickListItem : ({ dispatch, place, filter }) => {
                                    filter({ value : place.city })
                                    refs.state.dirtying(true)
                                    dispatch(setCityAndStateToOffice({
                                        id : storeAddress,
                                        city : place.city,
                                        state : place.state
                                    }))
                                }
                            }}
                        />
                    </div>
                </div>
                <div class="col-lg-3">
                    <OnboardingInput {...state}
                         textFieldSize={false}
                         ref='state'
                         label='State'
                         error={false}/>
                </div>
                <div class="col-lg-1 text-right">
                    {isRemovable ?
                        <button
                            class="button button_type_delete"
                            onClick={(event) => {
                                event.preventDefault()
                                onDestroy()
                            }}
                        >×</button> : null}
                </div>
            </fieldset>
        )
    }

}

AddOffice.propTypes = {
    title : PropTypes.string,
    storeAddress : PropTypes.string,
    items : PropTypes.arrayOf(PropTypes.object),
    fields : PropTypes.shape({
        city : PropTypes.object,
        state : PropTypes.object
    }),
    dispatch : PropTypes.func,
    onDestroy : PropTypes.func,
    isRemovable : PropTypes.bool
}
AddOffice.defaultProps = {
    isRemovable : true
}

export default AddOffice
