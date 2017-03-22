export default function({ items, onChange }) {
    return items.map((item, index) => (Object.assign({}, item, {
        onChange : (event) => {
            const { value } = event.target

            onChange({
                items : items.map((inField, inIndex) => {
                    if (index === inIndex) {
                        return Object.assign({}, inField, {
                            value
                        })
                    }
    
                    return Object.assign({}, inField)
                })
            })
        },
        getValue : () => {
            return items[index].value
        }
    })))
}
