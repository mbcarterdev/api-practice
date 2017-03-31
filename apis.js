import rp from 'request-promise';
import helper from './helper.js';

const apis = {
  fetchCharacter: (req, res) => {
    const name = req.params.name;
    rp.get(`https://swapi.co/api/people/?search=${name}`)
      .then((data) => {
        const char = JSON.parse(data);
        const charName = char.results[0].name;
        const hair = char.results[0].hair_color;
        const eyes = char.results[0].eye_color;
        let characterString = charName + ' has ' + hair + ' hair and ' + eyes + ' eyes.';
        res.status(200).send(characterString);
      })
      .catch(err => console.error(err));
  },
  fetchSortedCharacters: (req, res) => {
    const sortParam = req.params.sortKey
    let parsedChars = [];
    let promises = [];
    for(let i = 1; i < 6; i++) {
      let promise = rp.get(`https://swapi.co/api/people/?page=${i}`);
      promises.push(promise);
    }
    // console.log(promises);
    Promise.all(promises)
        .then((data) => {
          for (let page of data) {
            let chars = JSON.parse(page);
            parsedChars.push(chars);
          }
            let characters = [];
          for (let index of parsedChars) {
            // console.log('index is: ', index.results);
            characters = characters.concat(index.results);
            // console.log('here is characters: ', characters);
            // console.log(characters.length);
          }
          const sortedChars = helper.sortChars(characters, sortParam);
          res.status(200).send(sortedChars);
        })
        .catch(err => console.error(err));
    },
    //fetch all planets from api and parse the info
    fetchPlanets: () {
      let planetPromises = [];
      for(let i = 1; i < 8; i++) {
        let promise = rp.get(`https://swapi.co/api/planets/?page=${i}`);
        planetPromises.push(promise);
      }
      // console.log(planetPromises);
      Promise.all(planetPromises)
      .then((data) => {
        const parsedPlanets = parseData(data);
        return parsedPlanets;
      })
      .catch(err => console.error(err));
    },
    //get the names of the people listed in the residents array of each planet
    getResidents: (array) {
      let residents = [];
      for (let person of array) {
        let residentPromise = rp.get(` + person + `)
        .then((data) => {
          let resident = JSON.parse(data);
          residents.push(resident.name);
        })
        .catch(err => console.error(err));
      }
      return residents;
    },
    listResidentsByPlanet: (req, res) => {
      //fetch planets
      //iterate through parsedPlanets and make new object with each planet having a property called residents - helper function that fetches residents - helper function that formats new object
      //res.send residents by planet

            res.status(200).send(sortedChars);
          })
          .catch(err => console.error(err));
    }
}

module.exports = apis;
