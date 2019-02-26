import { constructGraph } from "./buildGraph";
const stationsJson = require('./stations');
const THRESHOLD = 40;
const allStations = getStations();


export default function getRouteSuggestions(origin, destination) {
    let paths = getPaths(origin, destination);
    let pathDirections = getPathDetails(paths);
    return pathDirections;
}

/*
    Path Finding API
*/


/*
    Returns an array of simple paths (no repeated vertices) between two vertices (origin and destination)
 */
function getPaths(origin, destination) {
    const MRTGraph = constructGraph(); // Get graph representation of stations

    function findAllPaths(MRTGraph, start, end, path=[]) {

        path = path.slice();
        path.push(start);

        if (start === end) return [path]; // return path upon reaching destination

        //if (!Object.keys(MRTGraph).includes(startNode)) return []; // if node not valid - return empty array

        let paths = []; // store all paths

        // Use dfs to explore all possible routes from current station
        // Add possible paths to `paths` array

        for (let node of MRTGraph[start]) {
            if (!path.includes(node)) {
                // Since there can be exponentially many shortest paths between two nodes in a graph
                // We limit path exploration via a preset threshold
                if (path.length > THRESHOLD) {
                    path = [];
                    break;
                }
                let newPaths = findAllPaths(MRTGraph, node, end, path);

                if (newPaths.length > 0) {
                    for (let path of newPaths) {
                        paths.push(path);
                    }
                }
            }
        }

        return paths;
    }

    let paths = findAllPaths(MRTGraph, origin, destination);

    //  Get top 5 routes sorted by number of stations
    let sortedPaths = paths.sort((a, b) => {
        return a.length - b.length;
    }).slice(0, 5); // take shortest 5 routes

    return sortedPaths;
}

/*
    Returns shortest path between two vertices
 */
function getShortestPath(vertexSource, vertexDestination) {
    const MRTGraph = constructGraph();

    let queue = [];
    queue.push(vertexSource);
    let visited = {};
    visited[vertexSource] = true;
    let paths = [];

    while(queue.length) {
        let vertex = queue.shift();
        for(let i = 0; i < MRTGraph[vertex].length; i++) {
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

    let path = [];
    for(var j = vertexDestination; j !== vertexSource; j = paths[j]) {
        path.push(j);
    }
    path.push(j);
    return path.reverse();

}


export function getPathDetails(paths) {
    function getStopsBetween(path, begin, end) {
        const beginIndex = path.indexOf(begin);
        const endIndex = path.indexOf(end);

        return Math.abs(beginIndex - endIndex);

    }

    function constructDirections(type, from, to, numberOfStops, current) {
        let directions = {};
        directions["type"] = type;
        directions["from"] = from;
        directions["to"] = to;

        if (type === 'ride') {
            directions["line"] = current;
            directions["num_stops"] = numberOfStops;
        } else if (type === 'change') {
            directions["station"] = current;
        }

        return directions;
    }

    let details = [];

    for (let path of paths) {
        let currentStation = path[0];
        let currentLine = getLine(path[0], path[1]);
        //console.log(currentLine);
        //const lineNumber = getLineNumber({ [path[0]] : currentLine});
        let directions = { steps: [] };

        for (let i = 0; i < path.length; i++) {
            let direction = {};
            if (path[i + 1] !== undefined) {
                const nextLine = getLine(path[i], path[i + 1]);
                if (currentLine !== nextLine) {
                    direction =
                        constructDirections("ride", currentStation, path[i],
                            getStopsBetween(path, currentStation, path[i]), currentLine);
                    directions["steps"].push(direction);

                    let previousLine = currentLine;
                    currentLine = nextLine;
                    currentStation = path[i];
                    direction =
                        constructDirections("change", previousLine, currentLine, 0, path[i]);
                    directions["steps"].push(direction);
                }
            } else {
                direction =
                    constructDirections("ride", currentStation, path[i],
                        getStopsBetween(path, currentStation, path[i]), currentLine);
                directions["steps"].push(direction);
            }
        }

        details.push(directions);
    }

    return details;



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
function getStations() {
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

export function getAllStations() {
    return allStations;
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
    Converts a station number object into an array of station number objects
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

/*
    Returns current line given current station and next station
*/
function getLine(currentStation, nextStation) {
    const currentLines = stationsJson[currentStation];
    const nextLines = stationsJson[nextStation];

    // get intersection of keys between two objects
    const intersection = Object.keys(currentLines).filter({}.hasOwnProperty.bind(nextLines));

    // if only one common key (line), that must be the current line
    if (intersection.length === 1) {
        return intersection[0];
    } else {
        // if not, check common lines to see if the stations come after each other
        for (let line of intersection) {
            if (Math.abs(currentLines[line] - nextLines[line]) <= 2)
                return line;
        }
    }
}


/*
    Given station name and line type, return an object representation of its line number
    Example: getLineNumber("Serangoon", "NE") returns {"NE": 12}
 */
function getLineNumber(stationName, currentLine) {
    const currentStation = stationsJson[stationName];
    const lineNumber = {};
    for (let line in currentStation) {
        if (line === currentLine) {
            lineNumber[line] = currentStation[line];
        }
    }


    return lineNumber;
}


