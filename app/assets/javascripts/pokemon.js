// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
PokemonApp.Pokemon = function(pokemonUri) {
  this.id = PokemonApp.idFromUri(pokemonUri);

};

PokemonApp.Pokemon.prototype.imgFromUri = function(pokemonUri){
  console.log(pokemonUri);
  var uriSegment = pokemonUri.split("/");
  var secondLast = uriSegment.length-2;
  return uriSegment[secondLast];

};


PokemonApp.Pokemon.prototype.render = function () {
  console.log("Rendering pokemon; #" + this.id);
  var that = this;
  $.ajax({
    url:"/api/pokemon/" + this.id,
    success: function(response) {
      var pkmimg_id = that.imgFromUri(response.sprites[0].resource_uri);

      // console.log("Pokemon info:");
      console.log(response);
      $(".js-pkmn-name").text(response.name);
      $(".js-pkmn-number").text(response.number);
      $(".js-pkmn-height").text(response.height);
      $(".js-pkmn-weight").text(response.weight);
      $(".js-pkmn-hp").text(response.hp);
      $(".js-pkmn-attack").text(response.attack);
      $(".js-pkmn-defense").text(response.defense);
      $(".js-pkmn-sp_atk").text(response.sp_atk);
      $(".js-pkmn-sp_def").text(response.sp_def);
      $(".js-pkmn-speed").text(response.speed);
      for (var i = 0; i < response.types.length; i++)
      $(".js-pkmn-types").text(response.types[i].name);
      $(".js-pokemon-modal").modal("show");
      $(".js-pkmn-image").attr('src',"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pkmimg_id + ".png");
      // $(".js-pkmn-descr").text(response.descriptions[response.descriptions.length-1].resource_uri);
      // console.log((response.descriptions[response.descriptions.length-1].resource_uri));
    }

  });

};

PokemonApp.idFromUri = function(pokemonUri){
  var uriSegment = pokemonUri.split("/");
  var secondLast = uriSegment.length-2;
  return uriSegment[secondLast];

};



$(document).on("ready", function(){

  $(".js-show-pokemon").on("click", function(event) {
    var $button = $(event.currentTarget);
    var pokemonUri = $button.data("pokemon-uri");
    var pokemon = new PokemonApp.Pokemon(pokemonUri);
    pokemon.render();
  });

});
