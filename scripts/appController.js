var serverUrl = 'http://localhost/testOWM/index.php?q=';

var app = new Vue({
    el: '#app',
    data: {
        imageUrl: '',
        mapUrl: '',
        cityName: '',
        query: '',
        cityList: [],
        weatherData: [],
        temp: '',
        description: '',
        wind: '',
        humidity: '',
        todaysForecast: '',
        maxTemp: '',
        minTemp: ''
    },
    methods: {
        queryWeather(resource) {
            this.$http.get(serverUrl + this.query).then(response => {
                this.message = response.data;
                this.imageUrl = getIconPath(response.data.weather[0].icon);
                this.mapUrl = getMapUrl(response.data.coord.lat, response.data.coord.lon);
                this.cityName = response.data.name;
                this.weatherData = response.data;
                this.temp = getTempInCelsius(response.data.main.temp);
                this.description = response.data.weather[0].description;
                this.wind = parseWindSpeed(response.data.wind.speed);
                this.humidity = parseHumidity(response.data.main.humidity);
                this.todaysForecast = parseTodaysForecast(response.data.weather[0].main);
                this.minTemp = parseMinTemp(response.data.main.temp_min);
                this.maxTemp = parseMaxTemp(response.data.main.temp_max);
                setBackgroundImage(response.data.weather[0].icon);
            }, response =>{
                console.log("error:", response);
            });
        },
    }
});

function  getIconPath(iconName) {
    return `assets/icons/${iconName}.png`;
}

function getMapUrl(latitude, longitude) {
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyA92Qb_TEkGbXJ6_94JZv9iZbtWWhaLqCI&q=${latitude},${longitude}`
}

function getTempInCelsius(far) {
    let celsius = far - 273.15;
    return `Temp: ${(Math.round(celsius * 100) / 100)} °C`;
}

function parseWindSpeed(wind) {
    return `${wind} m/s wind`;
}

function parseHumidity(humidity) {
    return `${humidity} % humidity`;
}

function parseTodaysForecast(todaysForecast) {
    return `Today's Forecast: ${todaysForecast}`;
}

function parseMinTemp(minTemp) {
    return `Min temp: ${minTemp - 273.15} °C`;
}

function parseMaxTemp(maxTemp) {
    return `Max temp: ${maxTemp - 273.15} °C`;
}

function setBackgroundImage(imageName) {
    let imagePath = `assets/backgrounds/${imageName}.jpg`;
    document.body.style.background = `url(${imagePath}) no-repeat fixed 50% 50%`;
}