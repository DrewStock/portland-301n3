(function(module) {
  var repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {
    // TODO: -DONE- How would you like to fetch your repos? Don't forget to call the callback.

        $.ajax({
            url: 'https://api.github.com/users/elzed/repos',
            type: 'GET',
            headers: {
                'Authorization': 'token ' + githubToken
            },
            success: function(data) {
                repos.all = data;
                callback();
            },
            error: function() {
                console.log('Error: yes, this is an error.');
            }
        })

    };

  // DONE: Model method that filters the full collection for repos with a particular attribute.
  // You could use this to filter all repos that have a non-zero `forks_count`, `stargazers_count`, or `watchers_count`.
  repos.with = function(attr) {
    return repos.all.filter(function(repo) {
      return repo[attr];
    });
  };

  module.repos = repos;
})(window);
