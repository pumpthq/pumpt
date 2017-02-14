import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import uuid from 'uuid'

import OkIcon from './../../img/sprites-svg/ok-green.svg'

@connect(
    function mapStateToProps(state, ownProps) {
        return {
            state
        }
    },
    function mapDispatchToProps(dispatch, ownProps) {
        return {
            dispatch
        }
    }
)
class ApplicationFieldsetDropdown extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isFocused : false,
            isDirty : false,
            visibleList : false
        }

        this.inputOnFocus = this.inputOnFocus.bind(this)
        this.inputOnBlur = this.inputOnBlur.bind(this)
        this.inputOnChange = this.inputOnChange.bind(this)
    }

    componentWillMount() {
        this.inputId = uuid.v4()
    }

    makeClasses(initial) {
        const classes = [initial]
        const { isFocused, isDirty } = this.state
        const { error } = this.props

        if (isFocused) classes.push('is-focused dropdown__wrapper_active')
        if (isDirty) classes.push('is-dirty')
        if (error) classes.push('is-invalid')

        return classes.join(' ')
    }

    makeClassesForList(init) {
        const classes = [init]
        const { visibleList } = this.state
        const { list } = this.props

        if (visibleList && list.length) classes.push('dropdown_visible')

        return classes.join(' ')
    }

    forEachList(array) {
        const { dispatch, checkedElementId } = this.props

        return array.map((element) => {
            const isChecked = !element.items && element.id === checkedElementId

            return (
                <li class={`list__item ${element.items ? 'list__item_sub_true' : ''}`} onClick={() => {
                    if (!element.items) {
                        element.onClick.apply(null, [{ dispatch }])
                    }
                }}>
                    <span className={'dropdown__link' + (isChecked ? ' dropdown__link_active' : '')}>
                        {element.title}
                        {isChecked ? <img src={OkIcon} className="icon icon-ok"/> : null}
                    </span>
                    {element.items ? this.forEachSubList(element.items) : ''}
                </li>
            )
        })
    }

    forEachSubList(array) {
        const { dispatch, checkedElementId } = this.props

        const list = array.map((element) => {
            const isChecked = !element.items && element.id === checkedElementId

            return (
                <li className={'list__item'} onClick={() => {
                    element.onClick.apply(null, [{ dispatch }])
                }}>
                    <a className={'dropdown__link' + (isChecked ? ' dropdown__link_active' : '')}>
                        {element.title}{isChecked ? <img src={OkIcon} className="icon icon-ok"/> : null}
                    </a>
                </li>
            )
        })

        return (
            <ul className="list list_type_sublayer list_type_links">
                {list}
            </ul>
        )
    }

    dirtying(bool) {
        this.setState({
            isDirty : bool
        })
    }

    focusing(bool) {
        this.setState({
            isFocused : bool
        })
    }

    showList(bool) {
        this.setState({
            visibleList : bool
        })
    }

    render() {
        const { props } = this
        const {
            type,
            label,
            value,
            error,
            list,
            otherChild,
        } = props;

        return (
            <fieldset className="form__row row">
                <div className="col-lg-3 col-xs-4">
                    <label
                        className="text text_size_xs text_helper text_helper_s"
                        htmlFor={this.inputId}
                    >
                        {label}
                    </label>
                </div>
                <div className="col-lg-6 col-xs-8">
                    <div
                        className={this.makeClasses('mdl-textfield mdl-js-textfield textfield dropdown__wrapper dropdown__wrapper_type_select')}>
                        <input
                            {...props}
                            style={{}}
                            class='mdl-textfield__input textfield__input'
                            id={this.inputId}
                            type={type}
                            value={value}
                            onChange={this.inputOnChange}
                            onFocus={this.inputOnFocus}
                            onBlur={this.inputOnBlur}
                        />
                        <span class='mdl-textfield__error textfield__error'>{error}</span>
                        <span className="mdl-textfield__label textfield__label"/>
                        <div className={this.makeClassesForList('dropdown dropdown_size_m')}>
                            <ul className="list list_type_l list_type_links list_type_nowrap list_sublayer_true">
                                {this.forEachList(list)}
                            </ul>
                        </div>
                    </div>
                    {otherChild}
                </div>
            </fieldset>

        )
    }

    inputOnFocus(event) {
        if (this.props.value.length > 0) {
            this.focusing(true)
        } else {
            this.focusing(false)
        }

        this.showList(true)
        this.props.onFocus.apply(this, [event])
    }

    inputOnChange(event) {
        if (event.target.value.length > 0) {
            this.dirtying(true)
        } else {
            this.dirtying(false)
        }

        this.props.onChange.apply(this, [event])
    }

    inputOnBlur(event) {
        if (this.props.value.length > 0) {
            this.dirtying(true)
        } else {
            this.dirtying(false)
        }
        this.focusing(false)
        this.showList(false)

        this.props.onBlur.apply(this, [event])
    }
}

ApplicationFieldsetDropdown.propTypes = {
    value : PropTypes.string.isRequired,
    label : PropTypes.string,
    type : PropTypes.string,
    error : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
    list : PropTypes.arrayOf(
        PropTypes.shape({
            title : PropTypes.string,
            onClick : PropTypes.func,
            checked : PropTypes.bool,
            items : PropTypes.oneOfType([
                PropTypes.array,
                PropTypes.bool
            ])

        })
    ),
    onChange : PropTypes.func,
    onFocus : PropTypes.func,
    onBlur : PropTypes.func,
    dispatch : PropTypes.func,
    otherChild : PropTypes.element,
    checkedElementId : PropTypes.string
}
ApplicationFieldsetDropdown.defaultProps = {
    value : '',
    label : '',
    type : 'text',
    error : false,
    list : [],
    onChange : () => {},
    onFocus : () => {},
    onBlur : () => {},
    checkedElementId : null
}

export default ApplicationFieldsetDropdown
