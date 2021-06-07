const fetch = require("node-fetch");
const baseApiUrl = "http://api.gios.gov.pl/pjp-api/rest";

const findAllStations = async () => fetch(baseApiUrl + "/station/findAll").then(res => res.json());

const throwError = (message, code) => {
    let error = new Error(message);
    error.code = code;
    throw error;
}

const findAllStationsFromArea = async (url) => {
    let beginLat; 
    let beginLon;
    let endLat;
    let endLon;
    let stationList = await findAllStations();
    try{
        beginLat = parseInt(url.searchParams.get("beginLat"));
        beginLon = parseInt(url.searchParams.get("beginLon"));
        endLat = parseInt(url.searchParams.get("endLat"));
        endLon = parseInt(url.searchParams.get("endLon"));
        stationList = await findAllStations();
    } catch(e){
        throwError("Parsing error, some of params [beginLat, beginLon, endLat, endLon] are not a number", 400);
    }

    if(beginLat > endLat || beginLon > endLon){
        throwError("Begin greater than end", 400);
    }

    let ret = stationList.filter(station => {
        let stationLat = parseInt(station.gegrLat);
        let stationLon = parseInt(station.gegrLon);
        return beginLat <= stationLat && beginLon <= stationLon && endLat >= stationLat && endLon >= stationLon; 
    })

    if(ret.length === 0){
        throwError("Station not found", 404);
    }

    return ret;
} 

const findAllStationsWithMeasuredParams = async (url, filterFunc) => {
    let stationResponse = await fetch(baseApiUrl + "/station/findAll");
    let stationList = await stationResponse.json();
    let filteredStationList = stationList
    .filter(data => filterFunc(data, url))
    let getSensorsPromises = filteredStationList.map(data => fetch(baseApiUrl + "/station/sensors/" +  data.id));
    let getSensorsResponse = await Promise.all(getSensorsPromises);
    let sensors = await Promise.all(getSensorsResponse.map(res => res.json()));
    sensors = sensors.filter(arr => arr.length > 0);
    sensors.forEach(sensorArr => {
        let stationId = sensorArr[0].stationId;
        let station = filteredStationList.find(station => station.id === stationId);
        station.measuredParams = sensorArr.map(sensor => sensor.param.paramCode);
    })

    if(filteredStationList.length === 0){
        throwError("Station not found", 404);
    }

    return filteredStationList;
}

const findAllDataFromStation = async (url) => {
    let stationName = url.searchParams.get("stationName");
    let paramCode = url.searchParams.get("paramCode");
    let stations = await findAllStations();
    let foundStation = stations.find(station => station.stationName === stationName);
    if(!foundStation){
        throwError("Station not found", 404);
    }

    let sensors = await fetch(baseApiUrl + "/station/sensors/" +  foundStation.id).then(res => res.json());
    let foundSensor = sensors.find(sensor => sensor.param.paramCode === paramCode);
    if(!foundSensor){
        throwError("Param not found", 404);
    }
    let data = await fetch(baseApiUrl + "/data/getData/" + foundSensor.id).then(res => res.json());
    let filteredData = data.values.filter(x => x.value !== null);
    if(filteredData.length === 0){
        throwError("No data for this param", 404);
    }
    return {
        station: foundStation,
        paramCode: paramCode,
        data: filteredData
    }
}

const getStatsFromPeriod = async (url, filterFunc) => {
    let startDate = new Date(url.searchParams.get("from"));
    let endDate = new Date(url.searchParams.get("to"));
    if(startDate.getTime() >= endDate.getTime()){
        throwError("startTime greater than endTime", 400);
    }
    let paramCode = url.searchParams.get("paramCode");
    let stationResponse = await fetch(baseApiUrl + "/station/findAll");
    let stationList = await stationResponse.json();
    let filteredStationList = stationList
    .filter(data => filterFunc(data, url))
    let getSensorsPromises = filteredStationList.map(data => fetch(baseApiUrl + "/station/sensors/" +  data.id));
    let getSensorsResponse = await Promise.all(getSensorsPromises);
    let sensors = await Promise.all(getSensorsResponse.map(res => res.json()));
    sensors = sensors.filter(arr => arr.length > 0);
    for(let sensorArr of sensors){
        let stationId = sensorArr[0].stationId;
        sensorArr = sensorArr.filter(sensor => sensor.param.paramCode === paramCode);
        for(let sensor of sensorArr){
            let dataReq = await fetch(baseApiUrl + "/data/getData/" + sensor.id);
            let data = await dataReq.json();
            data.values = data.values
                    .filter((d) => {
                        let parsedDate = new Date(d.date);
                        return d.value !== null && parsedDate.getTime() >= startDate.getTime() && parsedDate.getTime() <= endDate.getTime()
                    });
            sensor.data = data;
        }
        let station = filteredStationList.find(station => station.id === stationId);
        if(station && sensorArr.length > 0){
            station.sensor = sensorArr[0].data.values.length > 0 ? sensorArr[0] : undefined;
        }
    }

    filteredStationList = filteredStationList.filter(station => station.sensor);
    filteredStationList.forEach(station => {
        let max = station.sensor.data.values.reduce((a, b) => a.value > b.value ? a : b);
        let min = station.sensor.data.values.reduce((a, b) => a.value <= b.value ? a : b);
        let avg = station.sensor.data.values.map(x => x.value).reduce((a, b) => a + b) / station.sensor.data.values.length;
        station.sensor.data.max = max;
        station.sensor.data.min = min;
        station.sensor.data.avg = avg;
        station.sensor.data.values = undefined;
    })
    if(filteredStationList.length === 0){
        throwError("Station not found or station has no sensors with given paramCode", 404);
    }
    let minStation = filteredStationList.reduce((a, b) => a.sensor.data.avg < b.sensor.data.avg ? a : b);
    let maxStation = filteredStationList.reduce((a, b) => a.sensor.data.avg >= b.sensor.data.avg ? a : b);
    let avgValue = filteredStationList.map(station => station.sensor.data.avg).reduce((a, b) => a + b) / filteredStationList.length;
    return {
        paramCode: paramCode,
        minStation: minStation,
        maxStation: maxStation,
        avg: avgValue, 
    };   
}

const getStationAqIndex = async (url) => {
    let stationName = url.searchParams.get("stationName");
    let indexName = url.searchParams.get("indexName");
    let stations = await findAllStations();
    let foundStation = stations.find(station => station.stationName === stationName);
    if(!foundStation){
        throwError("Station not found", 404);
    }
    let aqIndex = await fetch(baseApiUrl + "/aqindex/getIndex/" + foundStation.id).then(res => res.json());
    if(!aqIndex[indexName]){
        throwError("index not found", 404);
    }
    return {
        ...foundStation,
        [indexName]: aqIndex[indexName]
    }
}

module.exports = { baseApiUrl, getStatsFromPeriod, findAllStations, findAllStationsWithMeasuredParams, findAllDataFromStation, findAllStationsFromArea, getStationAqIndex };