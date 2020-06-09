myIngredients = [
  22,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8
];
ingredientList = [
  {
    id: 1,
    name: "Lillet"
  },
  {
    id: 2,
    name: "Italicus"
  },
  {
    id: 3,
    name: "Campari"
  },
  {
    id: 4,
    name: "Amaro Melleti"
  },
  {
    id: 5,
    name: "Beirao"
  },
  {
    id: 6,
    name: "Saline Solution",
    generic: "Salt",
    extra: true
  },
  {
    id: 7,
    name: "Smoke",
    extra: true
  },
  {
    id: 8,
    name: "Cherries",
    extra: true
  },
  {
    id: 9,
    name: "Iced Espresso"
  },
  {
    id: 10,
    name: "Remy Martin Cognac",
    generic: "Brandy"
  },
  {
    id: 11,
    name: "Pear Liqueur"
  },
  {
    id: 12,
    name: "Fleur de Biere"
  },
  {
    id: 13,
    name: "Polish Cherry Cordial",
    generic: "Cherry Cordial"
  },
  {
    id: 14,
    name: "Clove Bitters",
    extra: true
  },
  {
    id: 15,
    name: "Orange Bitters",
    extra: true
  },
  {
    id: 16,
    name: "Nutmeg",
    extra: true
  },
  {
    id: 17,
    name: "Aged Rum",
    generic: "Rum"
  },
  {
    id: 18,
    name: "Aperol"
  },
  {
    id: 19,
    name: "Cherry Cordial",
    generic: "Cherry Cordial"
  },
  {
    id: 20,
    name: "Green Chartreuse"
  },
  {
    id: 21,
    name: "Laphroaig Cask Strength",
    generic: "Scotch"
  },
  {
    id: 22,
    name: "American Gin",
    generic: "Gin"
  },
  {
    id: 23,
    name: "British Gin",
    generic: "Gin"
  },
  {
    id: 24,
    name: "Fernet-Branca",
  },
  {
    id: 25,
    name: "Seaweed Bitters",
    extra: true
  },
  {
    id: 26,
    name: "Becherovka",
  },
  {
    id: 27,
    name: "Dry Vermouth",
    generic: "Dry Vermouth"
  },
  {
    id: 28,
    name: "Prosecco",
    generic: "Prosecco"
  },
];
cocktailList = [
  {
    id: 0,
    name: 'Hail Caesar',
    image: 'images/hailCaesar.jpg',
    ingredients: [23,1,2],
    url: 'recipes/hailCaesar.html'
  },
  {
    id: 1,
    name: 'Roman War Camp',
    image: 'images/romanWarCamp.jpg',
    ingredients: [3, 4, 5, 1, 6, 7, 8]
  },
  {
    id: 2,
    name: 'General Dabrowski',
    image: 'images/generalDabrowski.jpg',
    ingredients: [9, 10, 11, 12, 13, 14, 15, 16]
  },
  {
    id: 6,
    name: 'General Dabrowski Trench Edition',
    image: 'images/generalDabrowski.jpg',
    ingredients: [9, 10, 11, 12, 13, 14, 15, 16]
  },
  {
    id: 3,
    name: 'Five Horsemen',
    image: 'images/fiveHorsemen.jpg',
    ingredients: [17, 18, 19, 20, 21, 8]
  },
  {
    id: 4,
    name: "Mitchell's Court Martial",
    image: 'images/mitchellsCourtMartial.jpg',
    ingredients: [22, 23, 20, 24, 25]
  },
  {
    id: 5,
    name: 'Operation Anthropoid',
    image: 'images/operationAnthropoid.jpg',
    ingredients: [26, 27, 28]
  }
];

var filterManager = {};
filterManager.isFilterOn = false;
filterManager.isFilterMakeable = false;
filterManager.filterCocktails = (id) => {
  let isShowCocktail = true;
  if (filterManager.isFilterMakeable && isShowCocktail) {
    isShowCocktail = filterManager.filterIfMakeable(id);
  }
  return isShowCocktail;
}
filterManager.toggleFilterIfMakeable = (source) => {
  let $filterListMakeable = document.getElementById("filter-list-makeable");
  if (source == 'menu') {
    if ($filterListMakeable.hasAttribute("data-mdl-disabled")) return;
  }
  filterManager.isFilterMakeable = (filterManager.isFilterMakeable) ? false : true;
  if (filterManager.isFilterMakeable) {
    $filterListMakeable.setAttribute("data-mdl-disabled", true);
  } else {
    $filterListMakeable.removeAttribute("data-mdl-disabled");
  }
  filterManager.checkIfAnyFilters();
  updateCocktailGrid();
};
filterManager.checkIfAnyFilters = () => {
  let isAnyFilter = false;
  let $filterChips = document.getElementById("filter-chips");
  $filterChips.innerHTML = '';
  $filterChips.style.display = "none";

  if (filterManager.isFilterMakeable) {
    $filterChips.innerHTML += filterManager.addFilterChip('Makeable Drinks','filter-chip-makeable',"filterManager.toggleFilterIfMakeable('chip')");
    isAnyFilter = true;
  }

  if (isAnyFilter) $filterChips.style.display = "block";
  filterManager.isFilterOn = isAnyFilter;


};
filterManager.filterIfMakeable = (id) => {
  var isIngredientAvailable = false;
  for (var i = 0; i < cocktailList.length; i++) {
    if (cocktailList[i].id == id) {
      for (var j = 0; j < cocktailList[i].ingredients.length; j++) {
        isIngredientAvailable = checkIngredientAvailable(cocktailList[i].ingredients[j])
        if (isIngredientAvailable == 0 && !getIngredient(cocktailList[i].ingredients[j]).extra) return false;
      }
      return true;
    }
  }
};
filterManager.addFilterChip = (nameString, id, func) => {
  return `
    <span class="mdl-chip mdl-chip--deletable">
      <span class="mdl-chip__text">${nameString}</span>
      <button id="${id}" type="button" class="mdl-chip__action" onclick="${func}"><i class="material-icons">cancel</i></button>
    </span>`;
};

function getIngredient(id) {
  for (var i = 0; i < ingredientList.length; i++) {
    if (ingredientList[i].id == id) return ingredientList[i];
  }
  console.warn(`Ingredient Doesn't Exist`);
}
function getIngredientGeneric(id) {
  for (var i = 0; i < ingredientList.length; i++) {
    try {
      if (ingredientList[i].id == id) return ingredientList[i].generic;
    } catch (e) {
      console.debug(e);
    }
  }
  console.debug(`Generic Doesn't Exist`);
}
function getCocktailIngredientsString(cocktailId){
  var cocktailIngredientChip = "";
  for (var i = 0; i < cocktailList.length; i++) {
    if (cocktailList[i].id == cocktailId) {
      for (var j = 0; j < cocktailList[i].ingredients.length; j++) {
        cocktailIngredientChip += getIngredientStdChip(cocktailList[i].ingredients[j])
      }
    }
  }
  return cocktailIngredientChip;
}
function getIngredientStdChip(ingredientId) {
  var ingredientString = getIngredient(ingredientId).name;
  if (typeof ingredientString != 'undefined') {
    var ingredientChip = `
    <span class="mdl-chip" ${getChipColor(checkIngredientAvailable(ingredientId))}>
        <span class="mdl-chip__text">${ingredientString}</span>
    </span>`;
    return ingredientChip;
  }
  console.warn(`Ingredient Doesn't Exist`);
}

function toggleIngredient(ingredientId) {
  $cocktailIngredientChip = document.getElementById(`ig-chip-${ingredientId.toString()}`);
  var snackbarContainer = document.querySelector('#demo-toast-example');
  for (var i = 0; i < myIngredients.length; i++) {
    if (myIngredients[i] == parseInt(ingredientId)) {
      myIngredients.splice(i,1);
      $cocktailIngredientChip.outerHTML = getIngredientBtnChip(ingredientId);
      updateCocktailGrid();
      updateIngredientChips();
      var data = {message: `${getIngredient(ingredientId).name} removed from bar!`};
      snackbarContainer.MaterialSnackbar.showSnackbar(data);
      return;
    }
  }
  myIngredients.push(ingredientId);
  $cocktailIngredientChip.outerHTML = $cocktailIngredientChip = getIngredientBtnChip(ingredientId);
  updateCocktailGrid();
  updateIngredientChips();
  var data = {message: `${getIngredient(ingredientId).name} added to bar!`};
  snackbarContainer.MaterialSnackbar.showSnackbar(data);
  return;
}

function getIngredientBtnChip(ingredientId) {
  var ingredientString = getIngredient(ingredientId).name;
  if (typeof ingredientString != 'undefined') {
    var ingredientChip = `
    <button type="button" id="ig-chip-${ingredientId}" onclick="toggleIngredient(${ingredientId})" class="mdl-chip" ${getChipColor(checkIngredientAvailable(ingredientId))}>
        <span class="mdl-chip__text">${ingredientString}</span>
    </button>`;
    return ingredientChip;
  }
  console.warn(`Ingredient Doesn't Exist`);
}
function getChipColor(isAvail) {
  switch (isAvail) {
    case 0:
      return 'style="background: rgb(244, 67, 54);"'
      break;
    case 1:
      return 'style="background: rgb(255, 193, 7);"'
      break;
    case 2:
      return 'style="background: rgb(139, 195, 74);"'
      break;
  }
}
function checkIngredientAvailable(id) {
  // Check if the ingredient is available
  for (var k = 0; k < myIngredients.length; k++) {
    if (myIngredients[k] == id) {
       return 2;
    }
  }
  // Check if the generic is available
  var neededGenericStr = getIngredientGeneric(id);
  if (typeof neededGenericStr == 'undefined') {
    console.debug('No Generic Available');
    return 0;
  }
  for (var k = 0; k < myIngredients.length; k++) {
    if (getIngredientGeneric(myIngredients[k]) == neededGenericStr) {
       console.debug(getIngredientGeneric(myIngredients[k]));
       return 1;
    }
  }
  return 0;
}

// updateIngredientChips();
function updateIngredientChips() {
  // Only Show Chips if Filtering is on
  if (filterManager.isFilterOn) {
    $cocktailIngredientChips = document.getElementById("cocktail-ingredients-chips");
    $cocktailIngredientChips.innerHTML = '';
    for (var i = 0; i < ingredientList.length; i++) {
      $cocktailIngredientChips.innerHTML += getIngredientBtnChip(ingredientList[i].id);
    }
  }
}

filterManager.checkIfAnyFilters();

updateCocktailGrid();
function updateCocktailGrid() {
  $cocktailGrid = document.getElementById("cocktail-grid");
  $cocktailGrid.innerHTML = '';
  for (var i = 0; i < cocktailList.length; i++) {
    if (filterManager.filterCocktails(i)) {
      $cocktailGrid.innerHTML +=
      `<div class="mdl-cell mdl-card mdl-shadow--4dp portfolio-card">
      <div class="mdl-card__media">
      <img class="cocktail-img" src="${cocktailList[i].image}" border="0" alt="">
      </div>
      <div class="mdl-card__title">
      <h2 class="mdl-card__title-text">${cocktailList[i].name}</h2>
      </div>
      <div class="mdl-card__supporting-text">
      ${getCocktailIngredientsString(i)}
      </div>
      <div class="mdl-card__actions mdl-card--border">
      <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent" href="${cocktailList[i].url}">Read more</a>
      </div>
      </div>`;
      }
    }
}
