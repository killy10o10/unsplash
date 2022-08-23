const body = document.querySelector('body');
const author = document.querySelector('#image-author');
const cryptoInfo = document.querySelector('#crypto-info');
const form = document.querySelector('#form');

// Get Background from Unsplash
const background = async () => {
  const response = await fetch(
    'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query'
  );
  const data = await response.json();
  body.style.backgroundImage = `url('${data.urls.full}')`;
  author.innerText = `📷: ${data.user.name}`;
  if (data.urls.full) {
    console.log(data.urls.full);
  }
};

background().catch(() => {
  body.style.backgroundImage = `url('./953897.jpg')`;
  console.error("sorry couldn't fetch the image😔");
});

// Get Crypto info on page load
fetch('https://api.coingecko.com/api/v3/coins/internet-computer')
  .then((res) => {
    if (!res.ok) {
      throw Error('Something went wrong');
    }
    return res.json();
  })
  .then((data) => {
    cryptoInfo.innerHTML = `<div id="crypto-top">
    <img src="${data.image.small}" alt="dogecoin"> <span>${data.name}</span>
  </div>
  <div id="crypto-bottom">
  <div class="price"><span> 🎯:</span><span>$${data.market_data.current_price.usd}</span></div>
  <div class="price"><span> 👆🏽: </span><span>$${data.market_data.high_24h.usd}</span></div>
  <div class="price"><span> 👇🏽: </span><span>$${data.market_data.low_24h.usd}</span></div>
</div>
  `;
  })
  .catch((err) => console.error(err));

// Search for crypto info
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const search = document.querySelector('#search').value;
  fetch(`https://api.coingecko.com/api/v3/coins/${search}`)
    .then((res) => {
      if (!res.ok) {
        throw Error('Something went wrong');
      }
      return res.json();
    })
    .then((data) => {
      cryptoInfo.innerHTML = `<div id="crypto-top">
                                <img src="${data.image.small}" alt="dogecoin"> <span>${data.name}</span>
                              </div>
                              <div id="crypto-bottom">
                              <div class="price"><span> 🎯:</span><span>$${data.market_data.current_price.usd}</span></div>
                              <div class="price"><span> 👆🏽: </span><span>$${data.market_data.high_24h.usd}</span></div>
                              <div class="price"><span> 👇🏽: </span><span>$${data.market_data.low_24h.usd}</span></div>
                            </div>
                              `;
    })
    .catch((err) => console.error(err));
});

// Display Time
const tick = () => {
  const now = new Date();
  const hour = now.getHours() === 0 ? `0${now.getHours()}` : now.getHours();
  const min = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
  const timeIndicator = document.getElementById('time');

  timeIndicator.innerHTML = `${hour}:${min}`;
};

setInterval(tick, 1000);
