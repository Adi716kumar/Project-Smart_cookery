
"use strict";

window.ACCESS_POINT =  "https://api.edamam.com/api/recipes/v2";
const /** {string} */ APP_ID = "3f53d4ef";
const /** {string} */ API_KEY= "7187a8522e5d918f3e04ca8363cbdcba";
const /** {string} */ TYPE = "public";

/**
 * 
 * @param {Array} queries Querry Array 
 * @param {Function} successCAllback sucess callback function
    
 }} successCAllback 
 */

export const fetchData = async function (queries, successCAllback) {
    const /** {string} */ query = queries?.join("&")
      .replace(/,/g, "=")
      .replace(/ /, "%20")
      .replace(/\+/g, "%2B");

    const /** {string} */ url = `${ACCESS_POINT}?app_id=${APP_ID}&app_key=$
    {API_KEY}&type=${TYPE}${query ? `&${query}` : ""}`;

    const /** {object} */ response = await fetch(url);

    if (response.ok) {
        const data = await response.json();
        successCAllback(data);
    }
    
}