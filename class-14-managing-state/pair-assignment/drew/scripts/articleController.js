(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized

  articlesController.index = function(ctx, next) {
    articleView.index(ctx.articles);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // Drew's comment: The function expression stored in the variable 'articleData' is passed an article and then attaches the article to the context object.
  articlesController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      // Drew's comment: The next handler function (articlesController.index)in the route(page('/article/:id',  articlesController.loadById, articlesController.index);) is called
      next();
    };
    // Drew's comment: Call of Article.findWhere - where the 'id' of the article matches the value in the path and then callback to the articleData function
    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // Drew's comment: The function expression stored in the variable 'authorData' is passed the articlesByAuthor parameter and then attaches articlesByAuthor to the context object.
  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      // Drew's comment: The next handler function (articlesController.index)in the route(page('/author/:authorName', articlesController.loadByAuthor, articlesController.index) is called
      next();
    };
    // Drew's comment: Call of Article.findWhere - where the 'author' of the article matches the value in the path and then callback to the authorData function
    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // Drew's comment: The function expression stored in the variable categoryData is passed the articlesInCategory parameter and then attaches articlesInCategory to the context object.
  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      // Drew's comment: The next handler function (articlesController.index)in the route(page('/category/:categoryName', articlesController.loadByCategory, articlesController.index) is called
      next();
    };
    // Drew's comment: Call of Article.findWhere - where the 'category' of the article matches the value in the path and then callback to the categoryData function
    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // Drew's comment: The function expression stored in the variable articleData is passed the allArticles parameter and then attaches allArticles to the context object.
  articlesController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      // Drew's comment: The next handler function (articlesController.index)in the route(page('/',articlesController.loadAll, articlesController.index) is called
      next();
    };

    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };


  module.articlesController = articlesController;
})(window);
