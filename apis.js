import rp from 'request-promise';

const apis = {
  fetchCharacter: (req, res) => {
    console.log('params: ', req.params);
    const name = req.params.name;
    rp.get(`https://swapi.co/api/people/?search=${name}`)
      .then((data) => {
        const char = JSON.parse(data);
        console.log(char.results[0].name);
        const charName = char.results[0].name;
        const hair = char.results[0].hair_color;
        const eyes = char.results[0].eye_color;
        let characterString = charName + ' has ' + hair + ' hair and ' + eyes + ' eyes.';
        console.log(characterString);
        res.status(200).send(characterString);
      })
  }

  // fetchSortedCharacters(sortParam)

  // fetchPlanets()
}

module.exports = apis;
