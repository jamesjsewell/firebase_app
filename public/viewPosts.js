function viewPosts () {
  function render (posts) {
    var rendered = ''

    for (var postKey in postsObj) {
      var thePost = postsObj[postKey]

      rendered += `
        <a ${thePost.link_href ? `href=${thePost.link_href}` : ''} class="list-group-item list-group-item-action flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${thePost.title}</h5>
          </div>
          <p class="mb-1">${thePost.description}</p>
        </a>
        `
    }

    $('#posts_wrapper').html(rendered)
  }

  render()
}
