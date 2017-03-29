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
    }
}

module.exports = apis;
