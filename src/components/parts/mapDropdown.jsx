export const mapDropdown = ({ arr, parent = null, onClick }) => {
    return arr.map((elem) => {
        if (elem.items) {
            const child = {
                id: elem.id,
                title: elem.title,
                parent,
                onClick: () => {},
            };

            child.items = mapDropdown({
                arr: elem.items,
                parent: child,
                onClick,
            });
            return child;
        }

        const child = {
            id: elem.id,
            title: elem.title,
            items: false,
            parent,
            onClick: ({ dispatch }) => {
                // If parent not null, has children and current child is alternative
                // then show parent title otherwise child title
                const value = parent && parent.items && child.alternative ?
                    parent.title : child.title;

                onClick.apply(null, [{
                    dispatch,
                    id: child.id,
                    element: child,
                    // If checked element is root and looks like alternative
                    // then show nothing otherwise prepared value
                    //value: !parent && child.alternative ? '' : value,
                    value: value
                }]);
            },
        };

        if (elem.alternative) child.alternative = true;
        return child;
    });
};
