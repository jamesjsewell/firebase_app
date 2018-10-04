
function editPostsPage () {
  function render () {
    var rendered = ''

    for (var postKey in postsObj) {
      var thePost = postsObj[postKey]
      rendered += `
        <div id="${postKey}" class="post_wrapper">
          <h5>${thePost.title}</h5>
          <p>${thePost.description}</p>
          <a href="${thePost.link_href}">${thePost.link_name}</a>
          <button firebase_key="${postKey}" class="edit_post_button">edit</button>
        </div>
        `
    }

    function clickedEditButton (e) {
      e.preventDefault()

      $postWrapper = $(`#${e.target.getAttribute('firebase_key')}`)
      $postWrapper.html(`
      <div class="post_wrapper">
        <form><input placeholder="title" /> <input placeholder="description" /> <input placeholder="category" /> <input placeholder="link_name" /><input placeholder="link_href" /></form><button>cancel</button><button>continue</button>
      </div>`)
    }

    $('#posts_wrapper').html(rendered)

    $('.edit_post_button').click(clickedEditButton)
  }

  render()
}
