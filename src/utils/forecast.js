const request = require("request");

const foreCast = (lat, lon, callback) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=912e4f328fef733c51d5e751779dad51`;
  request({ url: url, json: true }, (error, response, body) => {
    if (error) {
      callback(`Can't connect to the service. Check your Internet connection.`);
    } else if (body.message) {
      callback(`unable to find the location, Try anothe one.`);
    } else {
      callback(
        undefined,
        `${body.weather[0].main} throughout the day and currently ${body.main.temp} degree outside!`
      );
    }
  });
};

module.exports = foreCast;
