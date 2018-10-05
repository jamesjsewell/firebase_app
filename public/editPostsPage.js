
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

      var childKey = e.target.getAttribute('firebase_key')

      var post = postsObj[childKey]

      $postWrapper = $(`#${e.target.getAttribute('firebase_key')}`)
      $postWrapper.html(`
      <div class="post_wrapper">
        <form><input value="${post.title}" placeholder="title" /> <input value="${post.description}" placeholder="description" /> <input value="${post.category}"  placeholder="category" /> <input value="${post.link_name}"  placeholder="link_name" /><input value="${post.link_href}"  placeholder="link_href" /></form><button>cancel</button><button>continue</button>
      </div>`)
    }

    $('#posts_wrapper').html(rendered)

    $('.edit_post_button').click(clickedEditButton)
  }

  render()
}
