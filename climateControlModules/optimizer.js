

// function optimize(){
//   this.valuesToChange = [];
// // CO2 is most important
// // if co2 < what it should be do nothing
// // if co2 is > open dampers

// // pressure
// // lower temperature in boiler

// // zone temperature
// // if all zones are too low, increase boiler temperature
// // if all zones too high, lower boiler temperature/turn on cooler

// // if only one zone too low/high, adjust zoneheater

// // for each of these, if value to hardware changes, add to valuesToChange array.

// }


class optimizer {

  constructor() {
    this.defaultSettings = {
      "fan_zone_0": 200,
      "fan_zone_1": 200,
      "fan_zone_2": 200,
      "temp_zone_0": 20,
      "temp_zone_1": 20,
      "temp_zone_2": 20,
      "co2_zone_0": 200,
      "co2_zone_1": 200,
      "co2_zone_2": 200,
      "damper_in": 50,
      "damper_recycle": 50,
      "damper_out": 50,
      "temp_vent": 20,
      "coil_heat": 0,
      "coil_cool": 0,
      "humidity_level": 30,
      "pressure_boiler": 60
    }
    this.readings = [];
    this.settings = {};
    this.valuesToChange = [];
  }


  updateSettings(settings) {
    //console.log(settings);
    this.settings = settings;
    //console.log(this.settings)

  }

  optimize() {
    this.valuesToChange = [];
    var values = Object.values(this.defaultSettings);
    var names = Object.keys(this.defaultSettings);
    var updatedSettings = Object.values(this.settings)
    console.log(updatedSettings);

    console.log(values);
    console.log('-----------')
    for (var i = 0; i < values.length; i++) {
      // console.log(values[i])
      // console.log('--------------')
      // console.log(updatedSettings[i]);
      if (values[i] !== updatedSettings[i]) {
        //send signal to monitor to change with names[i]
        var id = names[i];
        //console.log('HEYYYYY!!!')
        //console.log(id);
        if (id === "temp_zone_0") {
          //change the zone_heater_0
          console.log('HIIIIIIII!!!!!')
          var jsonObj = {
            "id": "zone_heater_0",
            "reading": updatedSettings[i]
          }
          this.valuesToChange.push(jsonObj);
          //this.defaultSettings[i] = this.settings[i];
          this.defaultSettings["temp_zone_0"] = this.settings["temp_zone_0"];

        } else if (id === "temp_zone_1") {
          //change the zone_heater_1
          var jsonObj = {
            "id": "zone_heater_1",
            "reading": updatedSettings[i]
          }
          this.valuesToChange.push(jsonObj);
          this.defaultSettings["temp_zone_1"] = this.settings["temp_zone_1"];
        } else if (id === "temp_zone_2") {
          var jsobObj = {
            "id": "zone_heater_2",
            "reading": updatedSettings[i]
          }
          this.valuesToChange.push(jsobObj)
          this.defaultSettings["temp_zone_2"] = this.settings["temp_zone_2"]
        }

      }
    }
    console.log(this.valuesToChange);
  }


  getMonitorReadings(readings) {
    this.readings = readings;
    //console.log(this.readings);
  }

  getValuesToChange() {
    console.log(this.valuesToChange)
    return this.valuesToChange;
  }

}



// function updateReadings(readings){
//   this.readings = readings;
// }

// function getValuesToChange(){
//   return this.valuesToChange;
// }


module.exports = optimizer;

  //var valuesToChange = [];
  //var readings = [];
  //var settings = {};

  //function optimize(){
    //this.valuesToChange = [];
  // CO2 is most important
  // if co2 < what it should be do nothing
  // if co2 is > open dampers

  // pressure
  // lower temperature in boiler

  // zone temperature
  // if all zones are too low, increase boiler temperature
  // if all zones too high, lower boiler temperature/turn on cooler

  // if only one zone too low/high, adjust zoneheater

  // for each of these, if value to hardware changes, add to valuesToChange array.

  //}

  // function updateSettings(settings){
  //   this.settings = settings;
  // }
  //
  // function updateReadings(readings){
  //   this.readings = readings;
  // }
  //
  // function getValuesToChange(){
  //   returns this.valuesToChange;
  // }

