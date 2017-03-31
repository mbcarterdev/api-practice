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
  },
  parseData: (data) => {
    let parsedPages = [];
    for (let page of data) {
      let parsedPage = JSON.parse(page);
      parsedPages.push(parsedPage);
    }
    let results = [];
    for (let index of parsedPages) {
      // console.log('index is: ', index.results);
      results = results.concat(index.results);
      // console.log('here is results: ', results);
      // console.log(results.length);
    }
    return results;
  },
  buildResidentsByPlanetList: (planetArray, residentArray) => {
    let planets ={};
    for (let planet of planetArray) {
      planets.planet = {
        name: planet.name,
        residents: residentArray


    }
  }
};
module.exports = helper;
