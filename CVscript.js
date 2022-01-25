let connect = document.querySelector('#connect')
let about = document.querySelector('#about')
let projects = document.querySelector('#projects')

ptitle = document.querySelector('#projectstitle')

projects.addEventListener('click', function(){
    ptitle.scrollIntoView(true);
    console.log("called ccc")
})

console.log("called")
