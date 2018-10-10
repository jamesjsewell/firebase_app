// defining global variables, these will be updated and used throughout
var postsObj = {}
var db = {}
var selectedCategory = 'misc'
var refPath = ''
var dbRef = null
var database = null
var ui = null

$('#app_wrapper').toggle()

// starts the rendering of the page
function renderPage () {
  var uid = null
  var loggedIn = false
  // gets the logged in user's id
  if (firebase.auth().currentUser) {
    loggedIn = true
    var uid = firebase.auth().currentUser.uid
  }

  // if the user is logged in as the admin, render the edit page, otherwise render the view page
  if (uid === '3QWcQh1uANhtiu5dfCwp21sw5Y83') {
    // this is the function that does the actual rendering, defined in editPosts.js
    editPosts()
  } else {
    // this is the function that does the actual rendering, defined in viewPosts.js
    viewPosts()
  }

  navbarRender(db.selectCategory, loggedIn)
}

$(document).ready(() => {
  $('#app_wrapper').toggle()
  startAuth()
  let app = firebase.app()
  let features = ['auth', 'database', 'storage'].filter(feature => typeof app[feature] === 'function')
  ui = new firebaseui.auth.AuthUI(firebase.auth())

  database = firebase.database()

  if (ui.isPendingRedirect()) {
    showLogin()
  }

  // takes in user selected category of posts, gathers the data for that category, and renders the page
  function selectCategory (category) {
    postsObj = {}

    // goes to correct category firebase database endpoint
    refPath = category
    dbRef = database.ref(refPath)

    // reads data from endpoint collection, sets it on the posts object
    dbRef.on('value', function (snapshot) {
      snapshot.forEach(function (post) {
        var postKey = post.key
        var postData = post.val()
        postsObj[postKey] = postData
      })

      Cookies.set('category', category)

      // renders page once data has been gathered
      selectedCategory = category

      renderPage()
    })
  }

  // creates new user defined posts
  var pushPost = function (data) {
    var newPostRef = dbRef.push()
    newPostRef.set(data)
  }

  // updates a user edited post
  var updatePost = function (onSuccess, childKey, newData) {
    var updated = {}
    updated['/' + childKey] = newData
    dbRef.update(updated)
  }

  // deletes a user selected post
  var deletePost = function (childKey, onSuccess) {
    var updated = {}
    updated['/' + childKey] = null
    dbRef.update(updated, (err) => {
      if (err) {
        console.log('something went wrong')
      } else {
        onSuccess()
      }
    })
  }

  // adds the database functions above to a global variable called db that i can make use of in other scripts
  db = {push: pushPost, update: updatePost, delete: deletePost, selectCategory: selectCategory}

  // set the default selected category of posts
  db.selectCategory(Cookies.get('category') ? Cookies.get('category') : 'misc')
  navbarRender(db.selectCategory)
})
