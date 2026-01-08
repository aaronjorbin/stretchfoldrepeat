module.exports = {
  flushSync: (fn) => {
    if (typeof fn === 'function') fn();
  },
};
