const stationsJson = require('./stations');

/*
    Path Finding API
*/


/*
    Returns an object with line as key and (sorted) station numbers as the value
    Example: { "NS": [1, 2, 3, ...], ... }
 */
export function getAllStations() {
    const lineNumbers = Object.values(stationsJson);
    let allLines = {};
    for (let lineNumber of lineNumbers) {
        let lineNumberObjArray = getStationNumberObjArray(lineNumber);
        for (let station of lineNumberObjArray) {
            for (let line in station) {
                if (allLines[line] === undefined) {
                    allLines[line] = [];
                }
                allLines[line].push(station[line]);
            }

        }
    }

    // Sort station numbers of all lines in ascending order
    for (let line in allLines) {
        allLines[line].sort((a, b) => a-b);
    }
    return allLines;
}

/*
    Returns all the station line numbers
 */
export function getStationNames() {
    return Object.keys(stationsJson);
}

/*
    Returns a station's line number object given it's name
 */
export function getStationNumber(station) {
    return stationsJson[station];
}

/*
    Returns a station's name given it's line number as an object
    Example: {"NS": 10} returns "Admiralty"
 */
export function getStationName(lineNumber) {
    let [line, number] = Object.entries(lineNumber)[0];


    for (let [stationName, stationNumber] of Object.entries(stationsJson)) {
         if (stationNumber.hasOwnProperty(line) && stationNumber[line] === number) {
             return stationName;
         }
    }
}

export function getStationJson() {
    return stationsJson;
}

/*
    Helper function to convert a station number object into an array of station number objects
    Example: {NS: 17, CC: 15, CE: 15} -> [{NS: 17}, {CC: 15}, {CE:15}]
 */
export function getStationNumberObjArray(stationNumbers) {
    let stationNumberArray = [];
    for (let [line, obj] of Object.entries(stationNumbers)) {
        if (obj.constructor === Array) {
            for (let number of obj) {
                stationNumberArray.push({[line]: number});
            }
        } else {
            stationNumberArray.push({[line]: obj});
        }
    }
    return stationNumberArray;
}
