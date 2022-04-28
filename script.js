let pokemonRepository = (function() {
  // set up empty array to received pokemon returned
  let pokemonList = [];
  // when pokemon are fetched from given url, those gonna be pushed into pokemonList array by add()function
  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  // getAll function will pass pokemonList back to pokemonRepository
  function getAll() {
    return pokemonList;
  }
  // loadList()function will load data from external api
  function loadList() {
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function(details) {
      let array = details.results;
      array.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailUrl: item.url
        };
        add(pokemon);
      });
    });
  }


  function showDetail(pokemon) {
    loadDetail(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  function loadDetail(pokemon) {
    let url = pokemon.detailUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.types = details.types;

    });
  }
// to display individual pokemon get clicked
  function showModal(pokemon) {
    $("#modal-container").prepend("<div class='modal'></div>");
    $(".modal").addClass("modal");
    $(".modal").prepend("<h4></h4>");
    $("h4").text(pokemon.name);
    $(".modal").append("<img src= pokemon.imageUrl>");
    $("img").addClass("img");
    $(".modal").append("<p class='p2'></p>");
    $(".p2").text("height :" + pokemon.height);
    $("#modal-container").show();
    $(".modal").append("<button class='close-button'>Close</button>");
    $(".close-button").on("click", function() {
      $("#modal-container").hide();
      $("#modal-container").empty();
    });
  }

  function addList(pokemon) {

    let listItem = document.querySelector(".listItem");
    let individual_item = document.createElement("li");
    listItem.classList.add("listItem");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button_design");
    individual_item.appendChild(button);
    listItem.appendChild(individual_item);
    button.addEventListener("click", function() {
      showDetail(pokemon);
    });

  }

  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    addList: addList,
    loadDetail: loadDetail
  };

})();
// loadList()function was called on pokemonRepository and data are start being loaded
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addList(pokemon);
  });
});

const text = document.querySelector('.text');
 text.innerHTML = text.innerText.split('').map(
  (char,i)=>`<span style="transform:rotate(${i * 10}deg)">${char}</span>`
).join('');
