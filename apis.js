import rp from 'request-promise';

const apis = {
  fetchCharacter: (req, res) => {
    rp.get(`https://swapi.co/api/people/?search=luke`)
      .then((data) => {
        const char = JSON.parse(data);
        console.log(char.results[0].name);
        // const charName = data.results[0].name;
        // const hair = data.results[0].hair_color;
        // const eyes = data.results[0].eye_color;
        // let characterString = charName + ' has ' + hair + ' hair and ' + eyes + ' eyes.';
        // console.log(characterString);
        res.status(200).send(char.results[0].name)
      })
  }

  // fetchSortedCharacters(sortParam)

  // fetchPlanets()
}

module.exports = apis;
