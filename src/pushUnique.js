export default (item, array) => {
    if (array.indexOf(item) === -1) {
        array.push(item);

        return array;
    }

    return array;
};
