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
    let promises = [];
    for(let i = 1; i < 6; i++) {
      let promise = rp.get(`https://swapi.co/api/people/?page=${i}`);
      promises.push(promise);
    }
    Promise.all(promises)
        .then((data) => {
          const characters = helper.parseData(data);
          const sortedChars = helper.sortChars(characters, sortParam);
          res.status(200).send(sortedChars);
        })
        .catch(err => console.error(err));
    },

    listResidentsByPlanet: (req, res) => {
      let planetsWithResidents = {};
      let planetPromises = [];
      //get all the pages of planets
      for(let i = 1; i < 8; i++) {
        let planetPage =
        rp.get(`https://swapi.co/api/planets/?page=${i}`)
          planetPromises.push(planetPage);
      }
      Promise.all(planetPromises)
        //parse the data from the api calls
        .then((data) => {
          const parsedPlanets = helper.parseData(data);
          return parsedPlanets;
        })
        .then((parsedPlanets) => {
          let residentPromises = [];
          //create a property on planetsWithResidents for each planet
          for (let planet of parsedPlanets) {
            //each planet has an array of residents
            planetsWithResidents[planet.name] = {
              'residents': planet.residents
            }
            //loop through array and build another array of api calls
            for (let resident of planet.residents) {
              let residentCall = rp.get(`${resident}`)
              residentPromises.push(residentCall);
            }
            //get all the residents from the one planet and parse list
            Promise.all(residentPromises)
              .then((data) => {
                let parsedPeople = [];
                for (let person of data) {
                  let parsedPerson = JSON.parse(person);
                  parsedPeople.push(parsedPerson);
                }
                console.log('parsedPeople: ', parsedPeople);
                return parsedPeople;
              })
              //push the names of each resident to residentNames array
              .then((parsedPeople) => {
                let residentNames =[];
                for (let index of parsedPeople) {
                  residentNames.push(index.name);
                };
                // console.log('residentNames: ', residentNames)
                planetsWithResidents[planet.name] = {
                  'residents': residentNames
                }
              })
          }
                return planetsWithResidents;
        })
              .then((results) => {
                return res.send(planetsWithResidents);
              })
              .catch(err => console.error(err));
    }
};

module.exports = apis;
