const body = document.querySelector('body');
const author = document.querySelector('#image-author');
const cryptoInfo = document.querySelector('#crypto-info');
const form = document.querySelector('#form');

// Get Background from Unsplash

const background = async () => {
  const response = await fetch(
    'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=landscape'
  );
  const data = await response.json();
  body.style.backgroundImage = `url('${data.urls.full}')`;
  author.innerHTML = `<div id="camera"><img src="https://emojicdn.elk.sh/📷" alt="" /> <a href="${data.user.links.html}" target="_blank">${data.user.name}</a></div>`;
  if (data.urls.full) {
    console.log(data.urls.full);
  }
};

background().catch(() => {
  body.style.backgroundImage = `url('./unsplash.jpg')`;
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
    <img src="${data.image.small}" alt="coin"> <span>${data.name}</span>
  </div>
  <div id="crypto-bottom">
  <div class="price"><img src="https://emojicdn.elk.sh/🎯" alt="" />: <span>$${data.market_data.current_price.usd}</span></div>
  <div class="price"><img src="https://emojicdn.elk.sh/👆🏽" alt="" />: <span>$${data.market_data.high_24h.usd}</span></div>
  <div class="price"><img src="https://emojicdn.elk.sh/👇🏽" alt="" />: <span>$${data.market_data.low_24h.usd}</span></div>
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
                                <img src="${data.image.small}" alt="coin"> <span>${data.name}</span>
                              </div>
                              <div id="crypto-bottom">
                                <div class="price"><img src="https://emojicdn.elk.sh/🎯" alt="" />: <span>$${data.market_data.current_price.usd}</span></div>
                                <div class="price"><img src="https://emojicdn.elk.sh/👆🏽" alt="" />: <span>$${data.market_data.high_24h.usd}</span></div>
                                <div class="price"><img src="https://emojicdn.elk.sh/👇🏽" alt="" />: <span>$${data.market_data.low_24h.usd}</span></div>
                              </div>
                              `;
    })
    .catch((err) => console.error(err));
});

// Get Weather data
navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error('Weather data not available');
      }
      return res.json();
    })
    .then((data) => {
      data.weather.map((info) => {
        const iconUrl = `http://openweathermap.org/img/wn/${info.icon}@2x.png`;
        document.getElementById('weather-info').innerHTML = `
        <div class="temperature">
          
                                          <span>${Math.round(
                                            data.main.temp
                                          )}º</span>
                                          <img src=${iconUrl} /> 
        </div>
        <div class="city">
                                          <p>${data.name}</p>
        </div>
                            
                            `;
      });
    })
    .catch((err) => console.error(err));
});

// Display Time
const tick = () => {
  const now = new Date();
  const timeIndicator = document.getElementById('time');
  timeIndicator.innerText = now.toLocaleTimeString('en-GB', {
    timeStyle: 'short',
  });
};

setInterval(tick, 1000);
