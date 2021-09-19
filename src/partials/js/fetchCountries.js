console.log('hi');
const NAME = 'Uk';
let country = fetch(`https://restcountries.eu/rest/v2/name/${NAME}?fields=name;capital`).then(r => {
    if (r.ok) {
        return r.json();
    }
    return { countries:[]};
}).then(ar => {
    console.log(ar);
});