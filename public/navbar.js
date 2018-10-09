
function navbarRender (onSelect, loggedIn) {
  $('#navbar').html(`

    <button class="${selectedCategory === 'testing' ? 'btn-secondary ' : 'btn-outline-primary '} category_link btn m-1" path="testing">test</button>
    <button class="${selectedCategory === 'javascript' ? 'btn-secondary ' : 'btn-outline-primary '} category_link btn m-1"  path="javascript">javascript</button>
    <button class="${selectedCategory === 'python' ? 'btn-secondary ' : 'btn-outline-primary '} category_link btn m-1"  path="python">python</button>
    
    <div class="btn-group">
      <button class="${selectedCategory.includes('css') ? 'btn-secondary ' : 'btn-outline-primary '} btn m-1 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" path="none">css</button>
      <div class="dropdown-menu">
        <div class="list-group">
          <button class="${selectedCategory === 'css/general' ? 'btn-secondary ' : 'btn-outline-primary '} category_link btn-sm m-1" path="css/general" >general</button>
          <button class="${selectedCategory === 'css/frameworks' ? 'btn-secondary ' : 'btn-outline-primary '} category_link btn-sm m-1" path="css/frameworks" >frameworks</button>
          <button class="${selectedCategory === 'css/icons' ? 'btn-secondary ' : 'btn-outline-primary '} category_link btn-sm m-1"  path="css/icons">icons</button>
          <button class="${selectedCategory === 'css/fonts' ? 'btn-secondary ' : 'btn-outline-primary '} category_link btn-sm m-1" path="css/fonts">fonts</button>
          <button class="${selectedCategory === 'css/gradients' ? 'btn-secondary ' : 'btn-outline-primary '} category_link btn-sm m-1" path="css/gradients" >gradients</button>
          <button class="${selectedCategory === 'css/svgs' ? 'btn-secondary ' : 'btn-outline-primary '} category_link btn-sm m-1" path="css/svgs">svgs</button>
          <button class="${selectedCategory === 'css/effects' ? 'btn-secondary ' : 'btn-outline-primary '} category_link btn-sm m-1" path="css/effects">effects</button>
        </div>
      </div>
    </div>

    <div class="btn-group">
      <button class="${selectedCategory.includes('backend') ? 'btn-secondary ' : 'btn-outline-primary '} btn m-1 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" path="none">backend</button>
      <div class="dropdown-menu">
        <div class="list-group">
          <button class="${selectedCategory === 'backend/mongodb' ? 'btn-secondary ' : 'btn-outline-primary '} category_link btn-sm m-1" path="backend/mongodb" >mongodb</button>
          <button class="${selectedCategory === 'backend/postgres' ? 'btn-secondary ' : 'btn-outline-primary '} category_link btn-sm m-1" path="backend/postgres" >postgres</button>
          <button class="${selectedCategory === 'backend/sql' ? 'btn-secondary ' : 'btn-outline-primary '} category_link btn-sm m-1"  path="backend/sql">sql</button>
        </div>
      </div>
    </div>

    ${loggedIn ? `<button id='logout_btn' class='btn-warning m-1'>logout</button>` : ''}
    
  
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

  $('#title_wrapper').html(`<h4 class="m-2">${selectedCategory}</h4>`)
}
