/**
 * @license MIT
 * @copyright 2023 codewithsadee
 * @author codewithsadee <mohammadsadee24@gmail.com>
 */
"use strict";

/**
*  Import
*/

import { fetchData } from "./api.js";
import { $skeletonCard } from "./assets/js/global.js";


/**
 * Home page search
 */

document.addEventListener("DOMContentLoaded", function() {
    const /** {nodeelement}  */ $searchField = document.querySelector("[data-search-field]");
    const /** {nodeElement} */ $searchBtn = document.querySelector("[data-search-btn]");

    if ($searchBtn) {
        $searchBtn.addEventListener("click", function(e) {
            if ($searchField.value) window.location = `/recipes.html?q=${$searchField.value}`;
        });
    }

    $searchField.addEventListener("keydown", e => {
        if (e.key === "Enter") $searchBtn.click();
    });

});

/**
 * Tab panel navigation
 */
const /** {NodeList} */ $tabBtns = document.querySelectorAll("[data-tab-btn]");
const /** {NodeList} */ $tabPanels = document.querySelectorAll("[data-tab-panel]");

let /** {NodeElement} */ [$lastActiveTabPanel] = $tabPanels;
let /** {NodeElement} */ [$lastActiveTabBtn] = $tabBtns;

/**
 * Function to add event listeners to multiple elements
 */
function addEventOnElements(elements, event, handler) {
    elements.forEach(element => {
        element.addEventListener(event, handler);
    });
}

addEventOnElements($tabBtns, "click", function () {
    $lastActiveTabPanel.setAttribute("hidden", "");
    $lastActiveTabBtn.setAttribute("aria-selected", false);
    $lastActiveTabBtn.setAttribute("tabindex", -1);

    const /** {Nodeelement} */ $currentTabPanel = document.querySelector(`#${this.getAttribute("aria-controls")}`);
    $currentTabPanel.removeAttribute("hidden");
    this.setAttribute("aria-selected", true);
    this.setAttribute("tabindex", 0);

    $lastActiveTabPanel = $currentTabPanel;
    $lastActiveTabBtn = this;
    addEventOnElements(this, $currentTabPanel)
})

/**
 * Navigate tab with arrow key
 */

addEventOnElements($tabBtns, "keydown", function(e) {
    
    const /** {NodeElement} */ $nextElement = this.nextElementSibling; // Corrected spelling
    const /** {NodeElement} */ $previousElement = this.previousElementSibling; // Corrected spelling

    if (e.key === "ArrowRight" && $nextElement) {
        this.setAttribute("tabindex", -1);
        $nextElement.setAttribute("tabindex", 0);
        $nextElement.focus();
    } else if (e.key === "ArrowLeft" && $previousElement) {
        this.setAttribute("tabindex", -1);
        $previousElement.setAttribute("tabindex", 0);
        $previousElement.focus();
    } else if (e.key === "Tab") {
        this.setAttribute("tabindex", -1);
        $lastActiveTabBtn.setAttribute("tabindex", 0);
    }
});

/**
 *  work with api
 * fetch data for tab content
 */

const addTabContent = ($currentTabBtn, $currentTabPanel) => {
  
    const /** {NodeElement} */ $gridlist = document.createElement("div");
    $gridlist.classList.add("grid-list");

    $currentTabPanel.innerHTML = `
       <div class="grid-list">
         ${$skeletonCard.repeat(12)}
       </div>
    `;

}

addTabContent($lastActiveTabBtn, $lastActiveTabPanel);