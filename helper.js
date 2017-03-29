const helper = {
  sortChars: (array, param) => {
    if (param) {
      return array.sort((a, b) => {
        let paramA = a[param];
        let paramB = b[param];
        if (paramA < paramB) {
          return -1;
        }
        if (paramA > paramB) {
          return 1;
        }
        return 0
      })
    }
  }
};
module.exports = helper;
