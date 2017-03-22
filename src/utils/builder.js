export const buildClasses = (initial, state) => {
    const classes = [initial];
    const { isFocused, isDirty, error } = state;

    if (isFocused) classes.push('is-focused');
    if (isDirty) classes.push('is-dirty');
    if (error) classes.push('is-invalid');

    return classes.join(' ');
};
