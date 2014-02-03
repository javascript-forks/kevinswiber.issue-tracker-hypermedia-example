var siren = require('siren-writer');

module.exports = function(model) {
  var response = siren.entity(model.url)
    .cls('issues')

  model.items.forEach(function(issue) {
    response.entity(siren.entity(issue.url)
      .cls('issue')
      .rel('item')
      .rel('http://rels.x.io/issue')
      .properties({
        id: issue.id,
        title: issue.title,
        description: issue.description,
        status: issue.status
      }));
  });

  response.action(siren.action('search-issues', model.search)
      .title('Search Issues')
      .field('search', 'text'));

  return response;
};