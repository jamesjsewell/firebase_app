function startAuth () {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user && user.uid) {
      // User is signed in.
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
      // showLogin()e
      renderPage()
    }
  },

  function (error) {
    console.log(error)
  })
}

function showLogin () {
  ui.start('#firebaseui-auth-container', {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true
      },
      uiShown: function () {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('app_wrapper').style.display = 'none'
      }
    },
    signInFlow: 'popup',
    autoUpgradeAnonymousUsers: false,
    signInSuccessUrl: '/',
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: false
      },
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        scopes: [
          'https://www.googleapis.com/auth/plus.login'
        ],
        customParameters: {
          // Forces account selection even when one account
          // is available.
          prompt: 'select_account'
        }
      }
    ]
    // Other config options...
  })
}
