
function navbarRender (onSelect) {
  $('#navbar').html(`

    <button class="nav_link" path="testing">test</button>
    <button class="nav_link" path="javascript">javascript</button>
    <button class="nav_link" path="python">python</button>
    <button class="nav_link" path="css/general">css</button>
    <button class="nav_link" path="css/icons">icons</button>
    <button class="nav_link" path="css/fonts">fonts</button>
  
  `)

  $('.nav_link').click((e) => {
    e.preventDefault()
    onSelect(e.target.getAttribute('path'))
  })
}
