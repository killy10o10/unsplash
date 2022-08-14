const body = document.querySelector('body');
const author = document.querySelector('#image-author');

fetch(
  'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature'
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data.urls.full);
    body.style.backgroundImage = `url('${data.urls.full}')`;
    author.innerText = `Image Credit: ${data.user.name}`;
  });
