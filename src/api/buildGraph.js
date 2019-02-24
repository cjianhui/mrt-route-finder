import {getAllStations, getStationJson, getStationName, getStationNumberObjArray} from "./findPaths";

/*
    Constructs a graph of the following form:
    {
        "Admiralty": ["Woodlands", "Sembawang"],
        "Bartley": ["Taiseng", "Serangoon"],
        ...
    }
 */

export function constructGraph() {
    const allStations = getAllStations();
    const stationsJson = getStationJson();
    const MRTGraph = {};


    for (let [stationName, stationNumbers] of Object.entries(stationsJson)) {
        if (!(stationName in Object.keys(MRTGraph))) {
            MRTGraph[stationName] = [];
        }

        let stationNumberObjects = getStationNumberObjArray(stationNumbers);
        for (let station of stationNumberObjects) {
            for (let line in station) {
                let stations = allStations[line];
                let i = stations.indexOf(station[line]);
                // Add stations before and after current station
                if (stations[i - 1] !== undefined &&
                    MRTGraph[stationName].indexOf(stations[i - 1]) === -1) { MRTGraph[stationName].push({[line]: stations[i - 1]}); }
                if (stations[i + 1] !== undefined &&
                    MRTGraph[stationName].indexOf(stations[i + 1]) === -1) { MRTGraph[stationName].push({[line]: stations[i + 1]}); }
            }
        }
    }

    return MRTGraph;
}


