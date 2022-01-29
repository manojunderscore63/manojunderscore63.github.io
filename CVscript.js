let connect = document.querySelector('#connect')
let about = document.querySelector('#about')
let projects = document.querySelector('#projects')

ptitle = document.querySelector('#projectstitle')
connevtview = document.querySelector('#connect_t')

projects.addEventListener('click', function(){
    ptitle.scrollIntoView({behavior: "smooth", block: "start"});
})

connect.addEventListener('click', function(){
    connevtview.scrollIntoView({behavior: "smooth", block: "start"});
})

console.log("called")
