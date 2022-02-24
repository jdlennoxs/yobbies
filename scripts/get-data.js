const codesMap = require("../data/countryCodes.json");
const movies = require("../data/movies.json");

const countries = [];
Object.keys(movies).map((movie) => {
  movies[movie].details.production_countries.forEach((c) => {
    const iso = codesMap[c.iso_3166_1];
    const existing = countries.find((n) => n.id === iso);
    if (existing) {
      existing.value += 1;
    } else {
      countries.push({ iso: iso, name: c.name });
    }
  });
});
console.log(countries);

[
  { iso: "DEU", name: "Germany" },
  { iso: "FRA", name: "France" },
  { iso: "CHE", name: "Switzerland" },
  { iso: "USA", name: "United States of America" },
  { iso: "USA", name: "United States of America" },
  { iso: "USA", name: "United States of America" },
  { iso: "GBR", name: "United Kingdom" },
  { iso: "GBR", name: "United Kingdom" },
  { iso: "JPN", name: "Japan" },
  { iso: "USA", name: "United States of America" },
  { iso: "USA", name: "United States of America" },
  { iso: "DNK", name: "Denmark" },
  { iso: "FRA", name: "France" },
  { iso: "NOR", name: "Norway" },
  { iso: "SWE", name: "Sweden" },
  { iso: "CHL", name: "Chile" },
  { iso: "GBR", name: "United Kingdom" },
  { iso: "USA", name: "United States of America" },
  { iso: "AUT", name: "Austria" },
  { iso: "FRA", name: "France" },
  { iso: "DEU", name: "Germany" },
  { iso: "ITA", name: "Italy" },
  { iso: "GBR", name: "United Kingdom" },
  { iso: "USA", name: "United States of America" },
  { iso: "BEL", name: "Belgium" },
  { iso: "FRA", name: "France" },
  { iso: "DEU", name: "Germany" },
  { iso: "EST", name: "Estonia" },
  { iso: "POL", name: "Poland" },
  { iso: "NLD", name: "Netherlands" },
  { iso: "USA", name: "United States of America" },
  { iso: "USA", name: "United States of America" },
  { iso: "USA", name: "United States of America" },
  { iso: "USA", name: "United States of America" },
  { iso: "CHN", name: "China" },
  { iso: "USA", name: "United States of America" },
  { iso: "USA", name: "United States of America" },
  { iso: "GBR", name: "United Kingdom" },
  { iso: "CHE", name: "Switzerland" },
  { iso: "GBR", name: "United Kingdom" },
  { iso: "USA", name: "United States of America" },
  { iso: "GBR", name: "United Kingdom" },
  { iso: "QAT", name: "Qatar" },
  { iso: "FRA", name: "France" },
  { iso: "DEU", name: "Germany" },
  { iso: "TUR", name: "Turkey" },
  { iso: "CAN", name: "Canada" },
  { iso: "GBR", name: "United Kingdom" },
  { iso: "GBR", name: "United Kingdom" },
  { iso: "USA", name: "United States of America" },
  { iso: "CHN", name: "China" },
  { iso: "USA", name: "United States of America" },
  { iso: "CAN", name: "Canada" },
  { iso: "USA", name: "United States of America" },
  { iso: "DEU", name: "Germany" },
  { iso: "ZAF", name: "South Africa" },
  { iso: "USA", name: "United States of America" },
  { iso: "HKG", name: "Hong Kong" },
  { iso: "AUS", name: "Australia" },
  { iso: "USA", name: "United States of America" },
  { iso: "GBR", name: "United Kingdom" },
  { iso: "USA", name: "United States of America" },
  { iso: "USA", name: "United States of America" },
  { iso: "USA", name: "United States of America" },
  { iso: "GBR", name: "United Kingdom" },
  { iso: "DEU", name: "Germany" },
  { iso: "USA", name: "United States of America" },
  { iso: "GBR", name: "United Kingdom" },
  { iso: "IND", name: "India" },
  { iso: "DEU", name: "Germany" },
  { iso: "POL", name: "Poland" },
  { iso: "USA", name: "United States of America" },
  { iso: "KOR", name: "South Korea" },
  { iso: "ESP", name: "Spain" },
  { iso: "CAN", name: "Canada" },
  { iso: "IRL", name: "Ireland" },
  { iso: "USA", name: "United States of America" },
  { iso: "FRA", name: "France" },
  { iso: "ISL", name: "Iceland" },
  { iso: "UKR", name: "Ukraine" },
  { iso: "JPN", name: "Japan" },
  { iso: "DNK", name: "Denmark" },
  { iso: "NLD", name: "Netherlands" },
  { iso: "SWE", name: "Sweden" },
];

// const collection = [];
// Object.keys(movies).forEach((movie) => {
//   movies[movie].details.genres.forEach((g) => {
//     const existing = collection.find((n) => n.genre === g.name);
//     if (existing) {
//     } else {
//       //   const empty = {};
//       //   yobNames.forEach((n) => {
//       //     empty[n] = 1;
//       //   });
//       //   empty[yobs[movies[movie].chosen_by].name] += 1;
//       collection.push({ genre: g.name });
//     }
//   });
// });
// console.dir(collection);
// return collection;

// [
//     { "name": "Drama" },
//     { "name": "Horror" },
//     { "name": "Thriller" },
//     { "name": "Mystery" },
//     { "name": "Action" },
//     { "name": "Crime" },
//     { "name": "Comedy" },
//     { "name": "Documentary" },
//     { "name": "Animation" },
//     { "name": "Romance" },
//     { "name": "Music" },
//     { "name": "Fantasy" },
//     { "name": "History" },
//     { "name": "Science Fiction" }
//   ]

// const languages = new Set();
// Object.keys(movies).forEach((movie) => {
//   movies[movie].details.spoken_languages.forEach((language) => {
//     languages.add(language.english_name);
//   });
// });
// console.log(languages);

// [
//   {"name":  "German"},
//    {"name": "English"},
//   {"name":  "French"},
//     {"name":"Mandarin"},
//     {"name":"Japanese"},
//     {"name":"Icelandic"},
//     {"name":"Norwegian"},
//    {"name": "Swedish"},
//    {"name": "Spanish"},
//     {"name":"Estonian"},
//    {"name": "Italian"},
//  {"name":   "Latin"},
//   {"name":  "Polish"},
//    {"name": "Turkish"},
//    {"name": "Vietnamese"},
// {"name":    "Thai"},
//    {"name": "Afrikaans"},
//   {"name":  "Cantonese"},
//  {"name":   "Hindi"},
//    {"name": "Punjabi"},
//     {"name":"Sanskrit"},
//  {"name":   "Tamil"},
//   {"name":  "Telugu"},
//   {"name":  "Korean"},
//  {"name":   "Irish"},
//     {"name":":Ukrainian"},
//  {"name":   "Danish"}
//   ]
