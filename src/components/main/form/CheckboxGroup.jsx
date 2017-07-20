import React from 'react';
const options = {id: 1, name: 'Optoin1', id: 2, name: 'Option 2'}     

class CheckboxGroup extends React.Component {

    checkboxGroup() {
        let {label, required, input, meta} = this.props;

        return options.map((option, index) => {
            return (
            <div className="checkbox" key={index}>
                <label>
                    <input type="checkbox"
                           name={`${input.name}[${index}]`}
                           value={option.name}
                           checked={input.value.indexOf(option.name) !== -1}
                           onChange={(event) => {
                               const newValue = [...input.value];
                               if (event.target.checked) {
                                   newValue.push(option.name);
                               } else {
                                   newValue.splice(newValue.indexOf(option.name), 1);
                               }

                               return input.onChange(newValue);
                           }}/>
                    {option.name}
                </label>
            </div>)
        });
    }

    render() {
        return (
            <div>
                {this.checkboxGroup()}
            </div>
        )
    }
}


export default CheckboxGroup;
