const body = document.querySelector('body');
const author = document.querySelector('#image-author');
const cryptoInfo = document.querySelector('#crypto-info');
const form = document.querySelector('#form');
const search = document.querySelector('#search').value;
const changeImageButton = document.querySelector('#change-image');

// Get Background from Unsplash

const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const cachedImage = localStorage.getItem('backgroundImage');
const cachedTimestamp = localStorage.getItem('backgroundImageTimestamp');
const currentTime = new Date().getTime();

const background = async () => {
  console.log(currentTime);

  if (
    cachedImage &&
    cachedTimestamp &&
    currentTime - cachedTimestamp < CACHE_EXPIRATION_TIME
  ) {
    body.style.backgroundImage = `url('${cachedImage}')`;
    return;
  }

  const response = await fetch(
    `https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=people`
  );
  const data = await response.json();
  body.style.backgroundImage = `url('${data.urls.full}')`;
  author.innerHTML = `<div id="camera"><img src="https://emojicdn.elk.sh/📷" alt="" /> <a href="${data.user.links.html}" target="_blank">${data.user.name}</a></div>`;

  localStorage.setItem('backgroundImage', data.urls.full);
  localStorage.setItem('backgroundImageTimestamp', currentTime);
};

background().catch(() => {
  const cachedImage = localStorage.getItem('backgroundImage');
  if (cachedImage) {
    body.style.backgroundImage = `url('${cachedImage}')`;
  } else {
    body.style.backgroundImage = `url('./unsplash.jpg')`;
    console.error("Sorry, couldn't fetch the image. 😔");
  }
});

changeImageButton.addEventListener('click', () => {
  localStorage.removeItem('backgroundImage');
  localStorage.removeItem('backgroundImageTimestamp');
});

// Search for different image
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  localStorage.removeItem('backgroundImage');
  localStorage.removeItem('backgroundImageTimestamp');
  try {
    const response = await fetch(
      `https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=${search}`
    );
    const data = await response.json();
    body.style.backgroundImage = `url('${data.urls.full}')`;

    localStorage.setItem('backgroundImage', data.urls.full);
    localStorage.setItem('backgroundImageTimestamp', currentTime);
  } catch (error) {
    console.error(error);
    body.style.backgroundImage = `url('./unsplash.jpg')`;
  }
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
          <span>${Math.round(data.main.temp)}º</span>
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
