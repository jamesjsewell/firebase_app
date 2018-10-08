function startAuth () {
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
      renderPage()
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
}
