function startAuth () {
  function showLogin () {
    try {
      let app = firebase.app()
      let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function')

      // Initialize the FirebaseUI Widget using Firebase.
      var ui = new firebaseui.auth.AuthUI(firebase.auth())
      $('#app_wrapper').html('<div id="app_wrapper"><div id="auth_wrapper"/><div id="firebaseui-auth-container"/></div></div>')
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
      })
    } else {
      // User is signed out.
      showLogin()
    }
  },

  function (error) {
    console.log(error)
  })
}
