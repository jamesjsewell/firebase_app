var postsObj = {}

$(document).ready(() => {
  // firebase.auth().onAuthStateChanged(user => { console.log(user)});
  // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
  // firebase.messaging().requestPermission().then(() => { });
  // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });

  var currentUid = null

  var database = firebase.database()

  var postsRef = database.ref('posts')

  var selectedCategory = 'javascript'

  var pushPost = function (data) {
    var newPostRef = postsRef.push()
    newPostRef.set(data)
  }

  var fetchPosts = function (onSuccess) {
    postsRef.once('value').then(function (snapshot) {
      postsObj = {}

      // goes over every post obj and if it matches the selected category, it
      // will be placed on the postsObj variable
      snapshot.forEach(function (post) {
        var postKey = post.key
        var postData = post.val()

        if (postData.category == selectedCategory) {
          postsObj[postKey] = postData
        }
      })
      onSuccess()
    })
  }

  var updatePost = function (onSuccess, newData) {
    var updatedChild = {}
    updatedChild['/' + childKey] = newData
    postsRef.update(updatedChild)
  }

  function showLogin () {
    try {
      let app = firebase.app()
      let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function')

      // Initialize the FirebaseUI Widget using Firebase.
      var ui = new firebaseui.auth.AuthUI(firebase.auth())

      // if (ui.isPendingRedirect()) {
      ui.start('#firebaseui-auth-container', {
        signInFlow: 'popup',
        signInSuccessUrl: '/',
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ]
        // Other config options...
      })
      // }
    } catch (e) {
      console.error(e)
      document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.'
    }
  }

  firebase.auth().onAuthStateChanged(function (user) {
    if (user && user.uid !== currentUid) {
      // User is signed in.
      currentUid = user.uid
      var displayName = user.displayName
      var email = user.email
      var emailVerified = user.emailVerified
      var photoURL = user.photoURL
      var uid = user.uid
      var phoneNumber = user.phoneNumber
      var providerData = user.providerData
      user.getIdToken().then(function (accessToken) {
        document.getElementById('account-details').textContent = JSON.stringify({
          displayName: displayName,
          email: email,
          emailVerified: emailVerified,
          phoneNumber: phoneNumber,
          photoURL: photoURL,
          uid: uid,
          accessToken: accessToken,
          providerData: providerData
        }, null, '  ')

        database.ref('users/' + uid).set({
          username: displayName,
          email: email,
          profileImg: photoURL
        })

        var authElement = document.getElementById('firebaseui-auth-container').innerHTML = '<div id="firebaseui-auth-container"></div>'
        var $logoutButton = $('#logout-button')

        $logoutButton.html('<button id="logout-button">logout</button>')
        $logoutButton.click((e) => {
          e.preventDefault()
          firebase.auth().signOut()
        })
      })
    } else {
      // User is signed out.
      var $logoutButton = $('#logout-button')
      $logoutButton.html('<div id="logout-button"></div>')
      showLogin()
      document.getElementById('account-details').textContent = null
    }
  },

  function (error) {
    console.log(error)
  })

  function runRouter () {
    router({fetch: fetchPosts, push: pushPost}, selectedCategory)
  }

  runRouter()

  window.addEventListener('hashchange', function () {
    runRouter()
  })
})

function router (db, category) {
  switch (window.location.hash) {
    case '#view': {
      db.fetch(viewPosts)
      break
    }
    case '#edit': {
      db.fetch(editPostsPage)
      break
    }
  }
}
