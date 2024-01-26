const apiKey = 'd1ead06ab6f3c7bea0ec2cbf8d920eb6';
let weatherLink = ``;
let city = "";
let minTemp = 0;
let maxTemp = 0;
let temp = 0;
let skies = "";
let wind = "";
let windDir = "";
let place = 0;
let btnClicked = null;

const homes = [
  {
    city: "dearborn",
    lat: "42.3223",
    lon: "-83.1763",
    about: "I was born in Dearborn! Dearborn is a city steeped in automotive history, being home to the renowned Ford Motor Company. The city offers a blend of industry and culture, with attractions such as the Henry Ford Museum. It is important to recognize the complexity of Henry Ford's legacy; his pioneering contributions to the automotive industry revolutionized manufacturing and transportation. However, there are darker aspects of his legacy, such as his poor treatment of workers, controversial views, and connections to anti-Semitic publications. Dearborn serves as a poignant reminder of the intricate balance between technological progress and ethical considerations - an important reminder in today's fast-growing world. The city's diverse community adds to its vibrancy, with a range of cultural events and culinary experiences reflecting the city's rich, yet complex, heritage."
  },
  {
    city: "madison",
    lat: "34.7334",
    lon: "-86.5667",
    about: "I lived in Madison briefly when I was a toddler and then again while attending Bob Jones High School as a teenager. Positioned in the southern United States, Madison is a rapidly growing city with a strong emphasis on technology and aerospace. Home to the U.S. Space & Rocket Center, the city is a hub for space exploration enthusiasts. Madison's modern infrastructure, family-friendly environment, and proximity to Huntsville make it an appealing destination for those seeking a balance between urban amenities and a suburban lifestyle."
  },
  {
    city: "boston",
    lat: "42.3601",
    lon: "-71.0589",
    about: "I lived in Boston briefly as a toddler. As one of the oldest cities in the United States, Boston is a hub of history, education, and culture. Known for its prestigious universities such as Harvard and MIT, the city played a pivotal role in the American Revolution, with landmarks like the Freedom Trail and Boston Tea Party Ships & Museum. Boston's dynamic neighborhoods, vibrant arts scene, and iconic sports culture contribute to its unique and enduring charm."
  },
  {
    city: "kwajalein",
    lat: "8.7167",
    lon: "167.7333",
    about: "Kwajalein Atoll is part of the Republic of the Marshall Islands (RMI). I lived on Kwaj from the ages of 4 to 9. It  is a remote tropical paradise in the Pacific Ocean. Known for hosting a key U.S. military installation, the atoll also boasts pristine coral reefs and a diverse marine ecosystem. Its unique location makes it a strategic and captivating destination, offering breathtaking sunsets and opportunities for water activities in its crystal-clear lagoons. Swimming in the waters there spoiled the rest of the ocean for me."
  },
  {
    city: "orcutt",
    lat: "34.8653",
    lon: "-120.436",
    about: "I lived in Orcutt from 4th grade through junior high. Nestled in Santa Barbara County, Orcutt is a picturesque town surrounded by vineyards and rolling hills, contributing to California's renowned wine country. With a small-town feel and charming Main Street, Orcutt provides a tranquil escape. The town's proximity to the Central Coast's wineries and outdoor recreational areas makes it an ideal destination for wine enthusiasts and nature lovers alike."
  },
  {
    city: "durham",
    lat: "35.994",
    lon: "-78.8664",
    about: "I was in Durham, NC for 4 years while attending Duke University, earning my B.S. in Biomedical Engineering and graduating as a comissioned officer in the Navy. Durham is a dynamic city in North Carolina known for its thriving research institutions, including Duke University and Research Triangle Park. Once a hub for the tobacco industry, Durham has transformed into a center for technology, innovation, and entrepreneurship. The city's cultural diversity, vibrant arts scene, and commitment to sustainable development contribute to its unique character and appeal. Some of my favorite eateries in the area include Monuts Donuts and Bull City Burgers."
  },
  {
    city: "charleston",
    lat: "32.7766",
    lon: "-79.9309",
    about: "I lived in Charleston for just over a year while I studied to be a nuclear submarine officer. Known for its well-preserved historic district, the city offers a glimpse into the nation's colonial past through landmarks like Rainbow Row and the Battery. It is essential to acknowledge that Charleston played a significant role in the history of slavery, being a major port for the transatlantic slave trade. Today, efforts to confront this painful history are evident in places like the Old Slave Mart Museum and the International African American Museum, which aim to educate visitors about the city's complex heritage. Charleston's culinary scene is incredible; some of my local favorites are Butcher and Bee, DAPS, and Jackrabbit Filly."
  },
  {
    city: "kailua",
    lat: "21.4022",
    lon: "-157.7394",
    about: "I currently live in Kailua and have since I joined the Navy's fleet as a trained submarine officer. I served on the USS Hawaii and now I work in a requirements and acquisitions role. Kailua is a tropical paradise on the windward side of the island, known for its stunning beaches, including the world-famous Lanikai Beach and - my favorite - Kalama Beach. With lush landscapes and a laid-back atmosphere, Kailua offers a retreat from the hustle and bustle. Popular for water sports such as kayaking and windsurfing, the town provides a perfect blend of outdoor activities and relaxation against the backdrop of Hawaii's natural beauty."
  }
];

function findDirection(deg) {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.floor(((deg + 22.5) % 360) / 45);
  return directions[index];
}

pickPlace(7);
highlight(document.getElementById("home kailua"));

function pickPlace(place) {
  weatherLink = `https://api.openweathermap.org/data/2.5/weather?lat=${homes[place].lat}&lon=${homes[place].lon}&appid=${apiKey}&units=imperial`;
  fetch(weatherLink)
    .then(response => response.json())
    .then(data => {
      windDir = findDirection(data["wind"].deg);
      document.getElementById("temperature").innerHTML = `Current: ${Math.round(data["main"].temp)}°F<br>Min: ${Math.round(data["main"].temp_min)}°F<br>Max: ${Math.round(data["main"].temp_max)}°F`;
      document.getElementById("sky").innerHTML = `${data["weather"][0].main}`;
      document.getElementById("wind").innerHTML = `Wind: ${Math.round(data["wind"].speed)} mph<br>Direction: ${windDir}`;
      document.getElementById("about").innerHTML = `<p>${homes[place].about}</p>`;
    })
    .catch(error => {
      console.error('Problem fetching weather:', error);
    });
};

function highlight(element) {
  if (btnClicked != null) {
    btnClicked.classList.remove("selected");
  }
  btnClicked = element;
  btnClicked.classList.add("selected");
}