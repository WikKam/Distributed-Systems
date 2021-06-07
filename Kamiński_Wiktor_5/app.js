const http = require("http");
const { createForm, create404 } = require("./src/views");
const { baseApiUrl, getStatsFromPeriod, findAllStations, findAllStationsWithMeasuredParams, findAllDataFromStation, findAllStationsFromArea, getStationAqIndex } = require("./src/api");

const thenCatch = (promise, res) => {
    promise.then(data => {
        res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});      
        res.write(JSON.stringify(data));
        res.end();
    })
    .catch(err => {
        console.log(err.message);
        res.writeHead(err.code || 500);
        res.write(JSON.stringify({
            message: err.message 
        }));
        res.end();
    });
}

const server = http.createServer((req, res) => {
    const baseUrl = "http://" + req.headers.host + "/"
    const url = new URL(req.url, baseUrl);
    if(req.method === "GET"){
        switch(url.pathname){
            case "/":
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                createForm(res, "/station/findAll", [], "Find all stations")
                createForm(res, "/region/getStatsFromPeriod/province",
                [
                    {name: "province", type: "text"},
                    {name: "from", type: "date"},
                    {name: "to", type: "date"},
                    {name: "paramCode", type: "text"}
                ], "Get periodic stats for a given province");
                createForm(res, "/region/getStatsFromPeriod/city",
                [
                    {name: "city", type: "text"},
                    {name: "from", type: "date"},
                    {name: "to", type: "date"},
                    {name: "paramCode", type: "text"}
                ], "Get periodic stats for a given city");
                createForm(res, "/region/getStatsFromPeriod/commune",
                [
                    {name: "commune", type: "text"},
                    {name: "from", type: "date"},
                    {name: "to", type: "date"},
                    {name: "paramCode", type: "text"}
                ], "Get periodic stats for a given commune");
                createForm(res, "/region/getStatsFromPeriod/district",
                [
                    {name: "district", type: "text"},
                    {name: "from", type: "date"},
                    {name: "to", type: "date"},
                    {name: "paramCode", type: "text"}
                ], "Get periodic stats for a given district");
                createForm(res, "/region/findAllStationsWithMeasuredParams/province",
                [
                    {name: "province", type: "text"},
                ], "Get all stations with measured parameters from a province");
                createForm(res, "/region/findAllStationsWithMeasuredParams/city",
                [
                    {name: "city", type: "text"},
                ], "Get all stations with measured parameters from a city");
                createForm(res, "/region/findAllStationsWithMeasuredParams/commune",
                [
                    {name: "commune", type: "text"},
                ], "Get all stations with measured parameters from a commune");
                createForm(res, "/region/findAllStationsWithMeasuredParams/district",
                [
                    {name: "district", type: "text"},
                ], "Get all stations with measured parameters from a district");
                createForm(res, "/station/getAllData",
                [
                    {name: "stationName", type: "text"},
                    {name: "paramCode", type: "text"}
                ], "Get all data of a given parameter from a station");
                createForm(res, "/station/findAllFromArea", 
                [
                    {name: "beginLat", type: "number"},
                    {name: "beginLon", type: "number"},
                    {name: "endLat", type: "number"},
                    {name: "endLon", type: "number"},
                ], "Get all stations from area");
                createForm(res, "/station/getAqIndex", 
                [
                    {name: "stationName", type: "text"},
                    {name: "indexName", type: "text"},
                ], "Get air quality index of a station");
                res.end();
                break;
            case "/station/findAll":
                thenCatch(findAllStations(), res);
                break;
            case "/region/getStatsFromPeriod/province":                
                thenCatch(getStatsFromPeriod(url, (data, url) => { 
                    return data.city.commune.provinceName === url.searchParams.get("province").toUpperCase();
                }), res)
                break;
            case "/region/getStatsFromPeriod/city":
                thenCatch(getStatsFromPeriod(url, (data, url) => { 
                    return data.city.name === url.searchParams.get("city");
                }), res);
                break;
            case "/region/getStatsFromPeriod/commune":
                thenCatch(getStatsFromPeriod(url, (data, url) => { 
                    return data.city.commune.communeName === url.searchParams.get("commune");
                }), res);
                break;
            case "/region/getStatsFromPeriod/district":
                thenCatch(getStatsFromPeriod(url, (data, url) => { 
                    return data.city.commune.districtName === url.searchParams.get("district");
                }), res);
                break;
            case "/region/findAllStationsWithMeasuredParams/province":
                thenCatch(findAllStationsWithMeasuredParams(url, (data, url) => { 
                    return data.city.commune.provinceName === url.searchParams.get("province").toUpperCase();
                }), res);
                break;
            case "/region/findAllStationsWithMeasuredParams/city":
                thenCatch(findAllStationsWithMeasuredParams(url, (data, url) => { 
                    return data.city.name === url.searchParams.get("city");
                }), res)
                break;
            case "/region/findAllStationsWithMeasuredParams/commune":
                thenCatch(findAllStationsWithMeasuredParams(url, (data, url) => { 
                    return data.city.commune.communeName === url.searchParams.get("commune");
                }), res)
                break;
            case "/region/findAllStationsWithMeasuredParams/district":
                thenCatch(findAllStationsWithMeasuredParams(url, (data, url) => { 
                    return data.city.commune.districtName === url.searchParams.get("district");
                }), res)
                break;
            case "/station/getAllData":
                thenCatch(findAllDataFromStation(url), res);
                break;
            case "/station/findAllFromArea":
                thenCatch(findAllStationsFromArea(url), res);
                break;
            case "/station/getAqIndex":
                thenCatch(getStationAqIndex(url), res);
                break;
            default:
                create404(res).end();
                break;
        }
    } else{
        res.writeHead(400);
        res.write(JSON.stringify({
            error: "Only GET method supported"
        }));
        res.end();
    }

});
let port = process.env.PORT || 8080;
server.listen(port);

console.log(`server listening on port ${port}`);