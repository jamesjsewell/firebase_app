
function navbarRender (onSelect, loggedIn) {
  $('#navbar').html(`

    <div class="btn-group">
      <button class="${selectedCategory.includes('css') ? 'active btn-primary ' : 'btn-outline-primary '} btn m-1 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" path="none">css</button>
      <div class="dropdown-menu">
          <button class="${selectedCategory === 'css/general' ? 'active' : ''} category_link dropdown-item btn-sm m-1" path="css/general" >general</button>
          <button class="${selectedCategory === 'css/frameworks' ? 'active' : ''} category_link dropdown-item btn-sm m-1" path="css/frameworks" >frameworks</button>
          <button class="${selectedCategory === 'css/icons' ? 'active' : ''} category_link dropdown-item btn-sm m-1"  path="css/icons">icons</button>
          <button class="${selectedCategory === 'css/fonts' ? 'active' : ''} category_link dropdown-item btn-sm m-1" path="css/fonts">fonts</button>
          <button class="${selectedCategory === 'css/gradients' ? 'active' : ''} category_link dropdown-item btn-sm m-1" path="css/gradients" >gradients</button>
          <button class="${selectedCategory === 'css/svgs' ? 'active' : ''} category_link dropdown-item btn-sm m-1" path="css/svgs">svgs</button>
          <button class="${selectedCategory === 'css/effects' ? 'active' : ''} category_link dropdown-item btn-sm m-1" path="css/effects">effects</button>
      </div>
    </div>
    <button class="${selectedCategory === 'javascript' ? 'active btn-primary ' : 'btn-outline-primary '} category_link btn m-1"  path="javascript">javascript</button>
    <button class="${selectedCategory === 'html' ? 'active btn-primary ' : 'btn-outline-primary '} category_link btn m-1"  path="html">html</button>
    <div class="btn-group">
      <button class="${selectedCategory.includes('backend') ? 'active btn-primary ' : 'btn-outline-primary '} btn m-1 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" path="none">backend</button>
      <div class="dropdown-menu">
  
        <button class="${selectedCategory === 'backend/mongodb' ? 'active btn-primary ' : 'btn-outline-primary '} category_link dropdown-item btn-sm m-1" path="backend/mongodb" >mongodb</button>
        <button class="${selectedCategory === 'backend/postgres' ? 'active btn-primary ' : 'btn-outline-primary '} category_link dropdown-item btn-sm m-1" path="backend/postgres" >postgres</button>
        <button class="${selectedCategory === 'backend/sql' ? 'active btn-primary ' : 'btn-outline-primary '} category_link dropdown-item btn-sm m-1"  path="backend/sql">sql</button>
     
      </div>
    </div>
    <button class="${selectedCategory === 'python' ? 'active btn-primary ' : 'btn-outline-primary '} category_link btn m-1"  path="python">python</button>
    <button class="${selectedCategory === 'terminal' ? 'active btn-primary ' : 'btn-outline-primary '} category_link btn m-1" path="terminal">terminal</button>
    <button class="${selectedCategory === 'git' ? 'active btn-primary ' : 'btn-outline-primary '} category_link btn m-1"  path="git">git</button>
    <button class="${selectedCategory === 'editors' ? 'active btn-primary ' : 'btn-outline-primary '} category_link btn m-1"  path="editors">editors</button>
    <button class="${selectedCategory === 'misc' ? 'active btn-primary ' : 'btn-outline-primary '} category_link btn m-1" path="misc">misc</button>
    


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
