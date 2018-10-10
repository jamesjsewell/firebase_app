function viewPosts () {
  function render (posts) {
    $('#new_post_form_wrapper').html('<div></div>')
    var rendered = ''

    for (var postKey in postsObj) {
      var thePost = postsObj[postKey]

      rendered += `
        <div class="list-group-item flex-column align-items-start">  
            <div class="card text-center">
              <div class="card-header">
                ${thePost.title}
              </div>
              <div class="card-body">
                <blockquote class="blockquote mb-0">
                  <p class="mb-1">${thePost.description}</p>
                  <footer class="blockquote-footer">${thePost.link_href ? `<a href="${thePost.link_href}">visit ${thePost.link_name}</a>` : ''}</footer>
                </blockquote>
              </div>
            </div>
        </div>
        `
    }

    $('#posts_wrapper').html(rendered)
  }

  render()
}
