"use strict";

const logger = require("../config/logger");
const accounts = require("./accounts.js");
const DeedBox = require("../models/DeedBox");
const Security = require("../models/Security");

const dashboard = {

  newSecurity(request, response){
    const viewData = {
      title: "Register Security",
    };
    response.render("forms/newSecurity", viewData);
  },

  registerSecurity(request, response){
    const security = new Security({
      client: request.session.client,
      address1: request.body.address1,
      address2: request.body.address2,
      address3: request.body.address3,
      eircode: request.body.eircode,
      county: request.body.county,
    });
    security.save();
    logger.info("security saved successfully")
    logger.info(security)
    response.redirect('/dashboard')
  }

  /*addStation(request, response) {
    const loggedInUser = accounts.getCurrentUser(request)
    console.log(request.body)
    const newStation = {
      id: uuid.v1(),
      userId: loggedInUser.id,
      name: request.body.name,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
      readings: [],
    };
    stationStore.addStation(newStation);
    response.redirect("/dashboard");
  },

  deleteStation(request, response) {
    const stationId = request.params.id;
    stationStore.removeStation(stationId);
    response.redirect("/dashboard");
  },

  async addAutoReading(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const openWeatherReading = await openWeatherApi.getAutoReading(station.latitude, station.longitude)

    try {
      const newReading = {
        id: uuid.v1(),
        date: new Date(),
        code: openWeatherReading.weather[0].id,
        temperature: openWeatherReading.main.temp,
        windSpeed: openWeatherReading.wind.speed,
        pressure: openWeatherReading.main.pressure,
        windDirection: openWeatherReading.wind.deg,
        autoWeatherData: openWeatherReading.weather[0]
      }
      newReading.autoWeatherData.icon = "orange first order",

      console.log("new Reading: ", newReading)
      stationStore.addReading(stationId, newReading);
    } catch (error) {
      console.log("Status Code: ", openWeatherReading.cod)
      console.log("Message: ", openWeatherReading.message)
    } 
    response.redirect("/dashboard")
  }*/
};

module.exports = dashboard;
