import rp from 'request-promise';

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
            //at this point we should have an array of objects, each of which has a results property.
          }
          //here we want to pull out the results property of each element, which is an array, and concat it to what starts as an empty array.
          //so loop through parsedChars and build characters
          let characters = [];
          for (let index of parsedChars) {
            console.log('index is: ', index.results);
            characters = characters.concat(index.results);
            console.log('here is characters: ', characters);
            console.log(characters.length);
          }
          res.status(200).send(characters);
        })
        .catch(err => console.error(err));
    }
}

module.exports = apis;
