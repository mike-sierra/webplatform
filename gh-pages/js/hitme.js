window.onload = function() {
    var body = document.querySelector('body')
    body.classList.toggle('alt');
    body.addEventListener('click', function(e) {
            if (e.target.tagName != 'IMG') return(false);
            e.currentTarget.classList.toggle('alt');
    });
};
