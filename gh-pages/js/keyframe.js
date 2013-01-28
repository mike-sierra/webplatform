// var app = new Function();

window.onload = function() {
    document.querySelector('header').addEventListener('click',
		      function(e) { e.currentTarget.classList.toggle('pause') });
}

