"use strict";

const logger = require("../config/logger");
const DeedBox = require("../models/DeedBox");
const Security = require("../models/Security");
const Client = require("../models/Client");

const deedlockerPi = {

// Send list of Deedboxes to Pi as JSON
  async getDeedboxes(request, response) {
    try {
      const deedboxes = await DeedBox.findAll().populate("client","organisation").lean();
      response.send(deedboxes);

    } catch (err) {
      response.send(err);
    }
  },

// Update Location of Deedbox with update received from Pi
 async updateLocation(request, response) {
    logger.info("Location update received from DeedLocker")
    const data = request.body
    const deedBox = await DeedBox.findById(data.boxId)

    deedBox.locations.push(data.location)
    deedBox.save()
    
    response.sendStatus(200);
  },

  async updateRfid(request, response) {
    logger.info("Request to assign Rfid to box")
    const data = request.body
    const deedBox = await DeedBox.findById(data.boxId)

    // Clear out the rfid from any other boxes
    const deedboxesWithRfid = await DeedBox.find().byRfid(data.rfid)

    for (const deedboxWithRfid of deedboxesWithRfid) {
      deedboxWithRfid.rfid = ""
      deedboxWithRfid.save()
    }
    logger.info(`RFID updated`)
    deedBox.rfid = data.rfid
    deedBox.save()
    
    response.sendStatus(200);
  },

  async checkifRfidUpdated(request, response){
    const boxId = request.params.id

    const deedBox = await DeedBox.findById(request.params.id).lean()

    response.header('Access-Control-Allow-Origin', '*');
    response.send(JSON.stringify({deedBox}))
  }
};

module.exports = deedlockerPi;
