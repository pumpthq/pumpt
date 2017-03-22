import pushUnique from './../pushUnique';

export default ({ state, step, payload }) => {
    const progress = state.progress.slice();

    return Object.assign({}, state, payload, {
        step,
        progress: pushUnique(step, progress),
    });
};
