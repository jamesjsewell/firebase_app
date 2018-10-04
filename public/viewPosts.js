function viewPosts () {
  function render (posts) {
    var rendered = ''

    for (var postKey in postsObj) {
      var thePost = postsObj[postKey]

      rendered += `
        <div class="post_wrapper">
          <h5>${thePost.title}</h5>
          <p>${thePost.description}</p>
          <a href="${thePost.link_href}">${thePost.link_name}</a>
          <div id="${postKey}" class="edit_post_wrapper"></div>
        </div>
        `
    }

    $('#posts_wrapper').html(rendered)
  }

  render()
}
