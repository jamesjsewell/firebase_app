
function editPosts () {
  function render () {
    var rendered = ''

    $('#new_post_form_wrapper').html(`
    <div class="card m-2">
      <div class="card-body">
        <h5 class="card-title">Add a resource</h5>
        
        <form id="new_post_form">
        
            <div class="form-row">

              <div class="form-group col-md-4 col-sm-12  ">
                <label for="post_title">title</label>
                <input name="title" placeholder="title" type="text" class="form-control" id="post_title" placeholder="enter description">
              </div>
        
              <div class="form-group col-md-8 col-sm-12 ">
                <label for="post_description">description</label>
                <textarea name="description" class="form-control" id="post_description" rows="3" placeholder="enter description" ></textarea>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group col-md-6 col-sm-12 ">
                <label for="post_link_name">url name</label>
                <input name="link_name" type="text" class="form-control" id="post_link_name" placeholder="give the url a name" >
              </div>

              <div class="form-group col-md-6 col-sm-12 ">
                <label for="post_url">url</label>
                <input name="link_href" placeholder="enter the url" type="text" class="form-control" id="post_url" placeholder="enter url">
              </div>
    
          </div>

          <button class="btn-primary" type="submit" id="new_post_button" >save</button>
        </form>
        
      </div>
    </div>`)

    for (var postKey in postsObj) {
      var thePost = postsObj[postKey]
      rendered += `

        <div id="${postKey}"class="post_wrapper list-group-item flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${thePost.title}</h5>
          </div>
          <small><a href="${thePost.link_href}" >visit link</a></small>
          <p class="mb-1">${thePost.description}</p>
          <button firebase_key="${postKey}" class="edit_post_button btn btn-outline-secondary">edit</button>
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
        <div class="form-row">
          <div class="col-md-4 col-sm-12 mb-1 form-group">
            <label for="edit_title">title</label>
            <input class="form-control" id="edit_title" name="title" value="${post.title}" placeholder="title"  /> 
          </div>
          <div class="col-md-8 col-sm-12 mb-1 form-group">
            <label for="edit_description">description</label>
            <textarea class="form-control" id="edit_description" name="description" rows="3" placeholder="enter description" ></textarea>
          </div>
        </div>

        <div class="form-row">
          <div class="col-md-6 col-sm-12 form-group"> 
            <label for="edit_link_name">link name</label>
            <input class="form-control" id="edit_link_name" name="link_name" value="${post.link_name}"  placeholder="link_name"  />
          </div>
          <div class="col-md-6 col-sm-12 form-group">
            <label for="edit_link_href">link url</label>
            <input class="form-control" id="edit_link_href" name="link_href" value="${post.link_href}"  placeholder="link_href" /> 
          </div>
        </div>

        <div class="btn-group">
    
            <button class="btn btn-primary mb-1" type="submit" id="save_btn" >save</button>
      
            <button class="btn btn-secondary mb-1" id="cancel_edit_button">cancel</button>
      
            <button class="btn btn-danger mb-1" firebase_key="${postKey}" id="delete_post_button">delete</button>
          
        </div>
      </form>`)

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
      var link_name = e.target.link_name.value
      var link_href = e.target.link_href.value

      var newPost = {
        title: title,
        description: description,
        category: selectedCategory,
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
