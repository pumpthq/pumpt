import React, {Component, PropTypes} from 'react';
import uuid from 'uuid';

class OnboardingInputDropdown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFocused: false,
            isDirty: false,
            visibleList: false,
        };

        this.inputOnFocus = this.inputOnFocus.bind(this);
        this.inputOnBlur = this.inputOnBlur.bind(this);
        this.inputOnChange = this.inputOnChange.bind(this);
        this.makeClassesForList = this.makeClassesForList.bind(this);
    }

    componentWillMount() {
        this.inputId = uuid.v4();
    }

    componentDidMount() {
        const { value } = this.props;

        // TIP When component received initial value it should be dirty
        if (value.length > 0) this.dirtying(true);
    }

    // TODO avoid using refs.input.dirtying()
    // componentWillUpdate(nextProps) {
    //     const { value } = this.props;
    //
    //     if (value !== nextProps.value) {
    //         if (nextProps.value.length) {
    //             this.dirtying(true)
    //         } else {
    //             this.dirtying(false)
    //         }
    //     }
    //
    // }

    makeClasses(initial) {
        const classes = [initial];
        const { isFocused, isDirty } = this.state;
        const { error } = this.props;

        if (isFocused) classes.push('is-focused');
        if (isDirty) classes.push('is-dirty');
        if (error) classes.push('is-invalid');

        return classes.join(' ');
    }

    makeClassesForList() {
        const {
            list,
            dropdownSize,
        } = this.props;
        const {
            visibleList,
        } = this.state;

        const dropdownSizeClass = `dropdown_size_${dropdownSize}`;
        const classes = ['dropdown', dropdownSizeClass];

        if (visibleList && list.length) classes.push('dropdown_visible');

        return classes.join(' ');
    }

    forEachList(array) {
        const {
            textSizeForEachList,
        } = this.props;
        const textSizeClass = textSizeForEachList ? `text_size_${textSizeForEachList}` : null;

        return array.map((element, index) => (
            <li
                key={index}
                class="list__item"
                onClick={() => {
                    element.onClick();
                    this.dirtying(true);
                }}
            >
                <a
                    href=""
                    class={`text ${textSizeClass}`}
                    onClick={(event) => {
                        event.preventDefault();
                    }}
                    dangerouslySetInnerHTML={{
                        __html: element.title,
                    }}
                />
            </li>
            )
        );
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

    showList(bool) {
        this.setState({
            visibleList: bool,
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
            value,
            error,
            beforeImg,
            textFieldSize,
            listTypeSize,
            additionalClass,
            listTypeNowrap,
        } = props;
        const textFieldSizeClass =
            textFieldSize ? `textfield_size_${textFieldSize}` : '';
        const listTypeSizeClass = `list_type_${listTypeSize}`;

        return (
            <div class={this.makeClasses(`mdl-textfield mdl-js-textfield textfield is-upgraded ${textFieldSizeClass} ${additionalClass}`)}>
                {beforeImg}
                <input
                    {...props}
                    ref="inputField"
                    style={{}}
                    class="mdl-textfield__input textfield__input"
                    id={inputId}
                    value={value}
                    onChange={inputOnChange}
                    onFocus={inputOnFocus}
                    onBlur={inputOnBlur}
                />
                <label
                    class="mdl-textfield__label textfield__label"
                    htmlFor={inputId}
                >
                    {label}
                </label>
                <span class="mdl-textfield__error textfield__error">
                    {error}
                </span>
                <div class={this.makeClassesForList()}>
                    <ul class={`list ${listTypeSizeClass} list_type_links ${listTypeNowrap}`}>
                        {this.forEachList(this.props.list)}
                    </ul>
                </div>
            </div>
        );
    }

    inputOnFocus(event) {
        const { onFocus } = this.props;
        const { inputField } = this.refs;

        if (inputField.value.length >= 0) {
            this.focusing(true);
        } else {
            this.focusing(false);
        }

        this.showList(true);
        onFocus.apply(this, [event]);
    }

    inputOnChange(event) {
        const { onChange } = this.props;
        const { inputField } = this.refs;

        if (inputField.value.length > 0) {
            this.dirtying(true);
        } else {
            this.dirtying(false);
        }

        onChange.apply(this, [event]);
    }

    inputOnBlur(event) {
        const { onBlur } = this.props;
        const { inputField } = this.refs;

        if (inputField.value.length > 0) {
            this.dirtying(true);
        } else {
            this.dirtying(false);
        }

        this.focusing(false);
        this.showList(false);
        onBlur.apply(this, [event]);
    }
}

OnboardingInputDropdown.propTypes = {
    value: PropTypes.string.isRequired,
    label: PropTypes.string,
    error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),
    list: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            onClick: PropTypes.func,
        })
    ),
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    beforeImg: PropTypes.node,
    additionalClass: PropTypes.string,
    textFieldSize: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf([
            'l', '',
        ]),
    ]),
    listTypeSize: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf([
            'l', 'm',
        ]),
    ]),
    listTypeNowrapClass: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string,
    ]),
    dropdownSize: PropTypes.oneOf([
        'l', 's',
    ]),
    textSizeForEachList: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf([
            'xl',
        ]),
    ]),
};
OnboardingInputDropdown.defaultProps = {
    value: '',
    label: '',
    error: false,
    list: [],
    onChange: () => {},
    onFocus: () => {},
    onBlur: () => {},
    additionalClass: '',
    textFieldSize: 'l',
    listTypeSize: 'l',
    listTypeNowrapClass: 'list_type_nowrap',
    dropdownSize: 'l',
    textSizeForEachList: 'xl',
};

export default OnboardingInputDropdown;
