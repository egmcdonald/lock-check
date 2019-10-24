const unique = (arr = []) => [...new Set(arr)].sort();
const flattened = (arr = []) => [].concat(...arr);
const mapReduce = (arr = [], key) => flattened(arr.map(item => item[key]));

module.exports = { unique, flattened, mapReduce };
