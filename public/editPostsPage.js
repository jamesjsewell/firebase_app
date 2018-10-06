
function editPostsPage () {
  function render () {
    var rendered = `
    
      <div>
        <form id="new_post_form">
          <input name="title" placeholder="title" /> 
          <input name="description" placeholder="description" /> 
          <input name="category" placeholder="category" /> 
          <input name="link_name" placeholder="link_name" />
          <input name="link_href"  placeholder="link_href" /> 
          <button type="submit" id="new_post_button" >save</button>
        </form>
      </div>
    
    
    `

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

      $postWrapper = $(`#${childKey}`)
      var $oldHTML = $postWrapper.html()
      $postWrapper.html(`
        <form id="edit_post_form">
          <input name="title" value="${post.title}" placeholder="title" /> 
          <input name="description" value="${post.description}" placeholder="description" /> 
          <input name="category" value="${post.category}"  placeholder="category" /> 
          <input name="link_name" value="${post.link_name}"  placeholder="link_name" />
          <input name="link_href" value="${post.link_href}"  placeholder="link_href" /> 
          <button type="submit" id="save_btn" >save</button>
        </form>
        <button id="cancel_edit_button">cancel</button>
        <button firebase_key="${postKey}" id="delete_post_button">delete</button>`)

      function cancelEdit (e) {
        e.preventDefault()
        $(`#${childKey}`).html($oldHTML)
        render()
      }

      function deletePost (e) {
        e.preventDefault()

        function onDelete () {
          delete postsObj[childKey]

          $(`#${childKey}`).remove()
        }
        db.delete(childKey, onDelete)
      }

      $('#cancel_edit_button').click(cancelEdit)
      $('#delete_post_button').click(deletePost)

      $('#edit_post_form').submit((e) => {
        e.preventDefault()
        var title = e.target.title.value
        var description = e.target.description.value
        var category = e.target.category.value
        var link_name = e.target.link_name.value
        var link_href = e.target.link_href.value

        console.log(description, post['description'])

        var changed = false
        var updatedPost = {
          title: post.title,
          description: post.description,
          category: post.category,
          link_name: post.link_name,
          link_href: post.link_href
        }

        for (var attribute in updatedPost) {
          switch (attribute) {
            case 'title': {
              if (post[attribute] !== title) {
                changed = true
                updatedPost[attribute] = title
              }
              break
            }
            case 'description': {
              if (post[attribute] !== description) {
                console.log('description changed')
                changed = true
                updatedPost[attribute] = description
              }
              break
            }
            case 'category': {
              if (post[attribute] !== category) {
                console.log('category changed')
                changed = true
                updatedPost[attribute] = category
              }
              break
            }
            case 'link_name': {
              if (post[attribute] !== link_name) {
                console.log('link_name changed')
                changed = true
                updatedPost[attribute] = link_name
              }
              break
            }
            case 'link_href': {
              if (post[attribute] !== link_href) {
                console.log('link_href changed')
                changed = true
                updatedPost[attribute] = link_href
              }
              break
            }
          }
        }

        if (changed === true) {
          db.update(() => { console.log('it worked') }, childKey, updatedPost)
        }
      })
    }

    function onNewPost (e) {
      e.preventDefault()

      var title = e.target.title.value
      var description = e.target.description.value
      var category = e.target.category.value
      var link_name = e.target.link_name.value
      var link_href = e.target.link_href.value

      var newPost = {
        title: title,
        description: description,
        category: category,
        link_name: link_name,
        link_href: link_href
      }

      db.push(newPost)
    }

    $('#posts_wrapper').html(rendered)

    $('.edit_post_button').click(clickedEditButton)

    $('#new_post_form').submit(onNewPost)
  }

  render()
}
