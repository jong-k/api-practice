let count = 0;

export const counter = {
  increment() {
    return ++count;
  },

  decrement() {
    return --count;
  }
};

Object.freeze(counter);