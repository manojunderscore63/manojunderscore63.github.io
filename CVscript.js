let connect = document.querySelector('#connect')
let about = document.querySelector('#about')
let projects = document.querySelector('#projects')
let main_icon = document.querySelector('#main_icon')

ptitle = document.querySelector('#projectstitle')
connevtview = document.querySelector('#connect_t')

main_icon.addEventListener('click', function () {
    window.location.href = "dailyPlanner.html";
})

projects.addEventListener('click', function () {
    ptitle.scrollIntoView({ behavior: "smooth", block: "start" });
})

connect.addEventListener('click', function () {
    connevtview.scrollIntoView({ behavior: "smooth", block: "start" });
})

console.log("called")
