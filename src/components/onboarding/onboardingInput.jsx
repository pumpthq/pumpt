import React, { Component, PropTypes } from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';

// import { resetApiError } from '../../actions/api';

// @connect(undefined, { resetApiError })
class OnboardingInput extends Component {
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
    }

    componentDidMount() {
        const { value } = this.props;

        // TIP When component received initial value it should be dirty
        if (value) this.dirtying(true);
    }

    makeClasses(initial) {
        const classes = [initial];
        const { isFocused, isDirty } = this.state;
        const { error } = this.props;

        if (isFocused) classes.push('is-focused');
        if (isDirty) classes.push('is-dirty');
        if (error) classes.push('is-invalid');

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
        const {
            label,
            error,
            beforeImg,
            afterImg,
            textFieldSize,
            additionalClass,
            value
        } = props;
        const { isFocused } = this.state;
        const textFieldSizeClass = textFieldSize ? `textfield_size_${textFieldSize}` : '';

        let labelValue = '';
        if(value == '') {
            labelValue = label;
        }

        return (
            <div class={this.makeClasses(`mdl-textfield mdl-js-textfield textfield is-upgraded ${textFieldSizeClass} ${additionalClass}`)}>
                {beforeImg}
                <input
                    {...props}
                    ref="input"
                    style={{ paddingLeft: "5px" }}
                    class="mdl-textfield__input textfield__input"
                    id={inputId}
                    onChange={inputOnChange}
                    onFocus={inputOnFocus}
                    onBlur={inputOnBlur}
                />
                <style>
                    {`
                        #${inputId}::-webkit-inner-spin-button,
                        #${inputId}::-webkit-outer-spin-button {
                            -webkit-appearance: none;
                            margin: 0;
                        }

                        .textfield_size_m .textfield__label {
                            font-size: 20px;
                        }
                    `}
                </style>
                <label class="mdl-textfield__label textfield__label" htmlFor={inputId}>{labelValue}</label>
                {isFocused ? null : afterImg}
                <span class="mdl-textfield__error textfield__error">{error}</span>
            </div>
        );
    }

    inputOnFocus(event) {
        // this.props.resetApiError();
        this.dirtying(true);
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

OnboardingInput.propTypes = {
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
    beforeImg: PropTypes.node,
    afterImg: PropTypes.node,
    additionalClass: PropTypes.string,
    textFieldSize: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf([
            'l', 'm', 's',
        ]),
    ]),
};

OnboardingInput.defaultProps = {
    value: '',
    label: '',
    type: 'text',
    error: false,
    onChange: () => {},
    onFocus: () => {},
    onBlur: () => {},
    additionalClass: '',
    textFieldSize: 'l',
};

export default OnboardingInput;
