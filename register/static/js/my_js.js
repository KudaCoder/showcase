var current_url = window.location.href.split('/')[3]
console.log(current_url)
var doc = document.getElementById('nav-logo')
if(current_url.includes('register')) {
	doc.innerHTML = "Register"
} else if(current_url.includes('database')) {
	doc.innerHTML = "Database"
};