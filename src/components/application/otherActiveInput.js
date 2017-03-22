import React, { Component, PropTypes } from 'react';
import uuid from 'uuid';

const propTypes = {
    value: PropTypes.string.isRequired,
    label: PropTypes.string,
    type: PropTypes.string,
    error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    colorInverted: PropTypes.bool,
};

const defaultProps = {
    value: '',
    label: '',
    type: 'text',
    error: false,
    onChange: () => {},
    onFocus: () => {},
    onBlur: () => {},
};

export default class OtherActiveInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFocused: false,
            isDirty: false,
        };

        this.inputOnFocus = this.inputOnFocus.bind(this);
        this.inputOnBlur = this.inputOnBlur.bind(this);
        this.inputOnChange = this.inputOnChange.bind(this);
    }

    componentWillMount() {
        this.inputId = uuid.v4();

        if (this.props.value) this.dirtying(true);
    }

    makeClasses(initial) {
        const classes = [initial];
        const { isFocused, isDirty } = this.state;
        const { error, colorInverted } = this.props;

        if (isFocused) classes.push('is-focused');
        if (isDirty) classes.push('is-dirty');
        if (error) classes.push('is-invalid');
        if (colorInverted) classes.push('textfield_color_invert');

        return classes.join(' ');
    }

    dirtying(bool) {
        this.setState({
            isDirty: bool,
        });
    }

    focusing(bool) {
        this.setState({
            isFocused: bool,
        });
    }

    render() {
        const {
            props,
            inputId,
            inputOnChange,
            inputOnFocus,
            inputOnBlur,
        } = this;
        const { type, label, value, error } = props;

        return (
            <div className={this.makeClasses('mdl-textfield mdl-js-textfield textfield is-upgraded')}>
                <input
                    {...props}
                    style={{}}
                    className="mdl-textfield__input textfield__input"
                    id={inputId}
                    type={type}
                    value={value}
                    onChange={inputOnChange}
                    onFocus={inputOnFocus}
                    onBlur={inputOnBlur}
                />
                <label className="mdl-textfield__label textfield__label" htmlFor={inputId}>{label}</label>
                <span className="mdl-textfield__error textfield__error">{error}</span>
            </div>
        );
    }

    inputOnFocus(event) {
        this.focusing(true);
        this.props.onFocus.apply(this, [event]);
    }

    inputOnChange(event) {
        if (event.target.value.length > 0) {
            this.dirtying(true);
        } else {
            this.dirtying(false);
        }

        this.props.onChange.apply(this, [event]);
    }

    inputOnBlur(event) {
        if (this.props.value.length > 0) {
            this.dirtying(true);
        } else {
            this.dirtying(false);
        }
        this.focusing(false);

        this.props.onBlur.apply(this, [event]);
    }
}

OtherActiveInput.propTypes = propTypes;
OtherActiveInput.defaultProps = defaultProps;
