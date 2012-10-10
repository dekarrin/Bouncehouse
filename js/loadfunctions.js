// Assigns multiple functions to onload event.
var loadFunctions = new Array();

/**
 * Adds a function to the list of functions to be run
 * on page load.
 *
 * @param functionName
 * The name of the function, as a quoted string.
 */
function addLoadFunction(functionName) {
	loadFunctions.push(functionName);
}

/**
 * Executes all the functions in the list. This is the
 * function directly assigned to the onload event.
 */
function runLoadFunctions() {
	for(var i = 0; i < loadFunctions.length; i++) {
		window[loadFunctions[i]]();
	}
}