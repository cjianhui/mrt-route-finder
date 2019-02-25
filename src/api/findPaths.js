import { constructGraph } from "./buildGraph";
const stationsJson = require('./stations');

/*
    Path Finding API
*/
export function getPaths(source, destination) {
    const MRTGraph = constructGraph();

    function getAllPaths(MRTGraph, start, end, path=[]) {
        path = path.slice();
        path.push(start);

        if (start === end) {
            return [path];
        }

        if (!Object.keys(MRTGraph).includes(start)) return [];

        let paths = [];


        for (let vertex of MRTGraph[start]) {
            if (!path.includes(vertex)) {
                let newPaths = getAllPaths(MRTGraph, vertex, end, path);

                if (newPaths.length > 0) {
                    for (let path of newPaths) {
                        paths.push(path);
                    }
                }
            }
        }
        return paths;
    }


    let routes = getAllPaths(MRTGraph, source, destination);
    return routes;
}
//     function dfs(MRTGraph, start, end, path=[], onPath={}) {
//         path.push(start);
//         onPath[start] = true;
//
//         if (start === end) {
//             processCurrentPath(path);
//         } else {
//             for (let vertex of MRTGraph[start]) {
//                 if (!onPath[vertex]) {
//                     dfs(MRTGraph, vertex, end, path, onPath);
//                 }
//             }
//         }
//
//         path.pop();
//         onPath[start] = false;
//     }
//
//     dfs(MRTGraph, source, destination);
// }
//
// function processCurrentPath(path) {
//     let reverse = [];
//     for (let node of path) {
//         reverse.push(node);
//     }
//
//     if (reverse.length >= 1) {
//         console.log(reverse.pop());
//     }
//     while (reverse.length > 0) {
//         console.log(reverse.pop());
//     }
// }


export function getShortestPath(vertexSource, vertexDestination) {
    const MRTGraph = constructGraph();

    var queue = [];
    queue.push(vertexSource);
    var visited = {};
    visited[vertexSource] = true;
    var paths = [];

    while(queue.length) {
        var vertex = queue.shift();
        for(var i = 0; i < MRTGraph[vertex].length; i++) {
            if(!visited[MRTGraph[vertex][i]]) {
                visited[MRTGraph[vertex][i]] = true;
                queue.push(MRTGraph[vertex][i]);
                // save paths between vertices
                paths[MRTGraph[vertex][i]] = vertex;
            }
        }
    }
    if(!visited[vertexDestination]) {
        return undefined;
    }

    var path = [];
    for(var j = vertexDestination; j !== vertexSource; j = paths[j]) {
        path.push(j);
    }
    path.push(j);
    return path.reverse();

}


/*
    ----------------------------------
    Helper Functions
    ----------------------------------
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
         if (stationNumber.hasOwnProperty(line)) {
             if (stationNumber[line].constructor === Array) {
                 if (stationNumber[line].includes(number)) {
                     return stationName;
                 }
             } else {
                 if (stationNumber[line] === number) {
                     return stationName;
                 }
             }
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

