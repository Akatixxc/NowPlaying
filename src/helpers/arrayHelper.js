/**
 * @param {Array} array Segment, section or whatever array containing start times.
 * @param {integer} progress Progress in ms.
 * @returns {integer} Index of the current segment, section, etc.
 */
const getCount = (array, progress) => {
    return array.findIndex(startingTime => startingTime >= progress / 1000) - 1;
};

export default getCount;
