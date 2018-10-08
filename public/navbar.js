
function navbarRender (onSelect, loggedIn) {
  $('#navbar').html(`

    <button class="${selectedCategory === 'testing' ? 'btn-secondary ' : 'btn-outline-primary '} category_link btn" path="testing">test</button>
    <button class="${selectedCategory === 'javascript' ? 'btn-secondary ' : 'btn-outline-primary '} category_link btn"  path="javascript">javascript</button>
    <button class="${selectedCategory === 'python' ? 'btn-secondary ' : 'btn-outline-primary '} category_link btn"  path="python">python</button>
    <button class="${selectedCategory === 'css/general' ? 'btn-secondary ' : 'btn-outline-primary '} category_link btn"  path="css/general">css</button>
    <button class="${selectedCategory === 'css/icons' ? 'btn-secondary ' : 'btn-outline-primary '} category_link btn"  path="css/icons">icons</button>
    <button class="${selectedCategory === 'css/fonts' ? 'btn-secondary ' : 'btn-outline-primary '} category_link btn"  path="css/fonts">fonts</button>
    ${loggedIn ? `<button id='logout_btn' class='btn-warning'>logout</button>` : ''}
  
  `)

  if (loggedIn) {
    $('#logout_btn').click((e) => {
      e.preventDefault()
      firebase.auth().signOut()
    })
  }

  $('.category_link').click((e) => {
    e.preventDefault()
    onSelect(e.target.getAttribute('path'))
  })
}
