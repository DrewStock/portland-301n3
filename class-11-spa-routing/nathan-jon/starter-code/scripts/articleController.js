(function(module) {
  var articlesController = {};

  // DONE: Create the `articles` table when the controller first loads, with the code that used to be in index.html:

  // DONE: Setup a function that kicks off the fetching and rendering of articles, using the same
  // code that used to be in index.html.
  // DONE: Also be sure to hide all the main section elements, and reveal the #articles section:

  articlesController.index = function() {
    Article.createTable();
    Article.fetchAll(articleView.initIndexPage);

    $('section').hide();
    $('#articles').show();
  };

  module.articlesController = articlesController;
})(window);
