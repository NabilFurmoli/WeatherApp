"strict mode";

let imageArray = []; // global variable to hold stack of images for animation
let count = 0; // global var

function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true); // call its open method
  return xhr;
}

// Make the actual CORS request.
function makeCorsRequest() {
  let url;
  let city_name = document.getElementById("search_city").value;

  if (city_name === "") {
    url = "http://api.openweathermap.org/data/2.5/forecast?q=Davis,CA,US&units=imperial&APPID=a2fe98634e0dc2691fd866d259db0e4c";
      //"http://api.openweathermap.org/data/2.5/forecast/hourly?q=Davis,CA,US&units=imperial&APPID=a2fe98634e0dc2691fd866d259db0e4c";
  } else {
    url =
      "http://api.openweathermap.org/data/2.5/forecast?q=" +
      city_name +
      "&units=imperial&APPID=a2fe98634e0dc2691fd866d259db0e4c";
  }

  let xhr = createCORSRequest("GET", url);

  // checking if browser does CORS
  if (!xhr) {
    alert("CORS not supported");
    return;
  }

  // Load some functions into response handlers.
  xhr.onload = function() {
    let object = JSON.parse(xhr.responseText);
    // if (
    //   object.city.coord.lat > 40.6 ||
    //   object.city.coord.lat < 36.5 ||
    //   object.city.coord.long > 123.5 ||
    //   object.city.coord.long < 199.5
    // ) {
    //   alert("City out of 150 miles radius.");
    //   return;
    // }

    submit(xhr.responseText);
  };

  xhr.onerror = function() {
    alert("Woops, there was an error making the request.");
  };

  // Actually send request to server
  xhr.send();
  return;
}

function submit(responseStr) {
  let object = JSON.parse(responseStr); // turn it into an object

  const update = function() {
    setTemperatures(object.list);

    //set times
    setTimes(object.list[0].dt_txt);

    // update sky icons
    //validateSkyStatus(object.list[0].weather[0].description);
    validateSkyStatus(object.list); // list is an array

    //update dopplar images.
    //updateImages();
  };

  update();
}

function setTemperatures(temp_list) {
  var content = document.getElementById("curr_temp_text_id");
  content.textContent =
    Math.floor(temp_list[0].main.temp) + String.fromCharCode(176);

  content = document.getElementById("hour_+1_temp_id");
  content.textContent =
    Math.floor(temp_list[1].main.temp) + String.fromCharCode(176);

  content = document.getElementById("hour_+2_temp_id");
  content.textContent =
    Math.floor(temp_list[2].main.temp) + String.fromCharCode(176);

  content = document.getElementById("hour_+3_temp_id");
  content.textContent =
    Math.floor(temp_list[3].main.temp) + String.fromCharCode(176);

  content = document.getElementById("hour_+4_temp_id");
  content.textContent =
    Math.floor(temp_list[4].main.temp) + String.fromCharCode(176);

  content = document.getElementById("hour_+5_temp_id");
  content.textContent =
    Math.floor(temp_list[5].main.temp) + String.fromCharCode(176);
}

function setTimes(current_time) {
  let curr_minutes;
  let pm_hour;
  let am_hour;
  let done = false;

  let validateTime = function(current_time, add_hour) {
    let result;

    curr_hour = current_time.substring(11, 13);
    let date = new Date();
    date.setHours(curr_hour - 8 + add_hour);

    let int_curr_hour = date.getHours();

    if (int_curr_hour < 12) {
      if (int_curr_hour == 0) {
        int_curr_hour = 12;
      }
      result = int_curr_hour + ":" + "00" + " AM";
    } else {
      if (int_curr_hour == 0) {
        int_curr_hour = 12;
      }
      int_curr_hour = int_curr_hour % 12;
      result = int_curr_hour.toString() + ":" + "00" + " PM";
    }

    return result;
  };

  let content = document.getElementById("current_time_id");
  content.textContent = validateTime(current_time, 0);

  content = document.getElementById("current_time_+1_id");
  content.textContent = validateTime(current_time, 1);

  content = document.getElementById("current_time_+2_id");
  content.textContent = validateTime(current_time, 2);

  content = document.getElementById("current_time_+3_id");
  content.textContent = validateTime(current_time, 3);

  content = document.getElementById("current_time_+4_id");
  content.textContent = validateTime(current_time, 4);

  content = document.getElementById("current_time_+5_id");
  content.textContent = validateTime(current_time, 5);
}

function validateSkyStatus(arrayOfHours_fullStatus) {
  let validateIcons = function(sky_status) {
    switch (sky_status) {
      case "01d":
        content.src = "./assets/clearsky.svg";
        break;
      case "01n":
        content.src = "./assets/clear-night.svg";
        break;
      case "02d":
        content.src = "./assets/fewclouds-day.svg";
        break;
      case "02n":
        content.src = "./assets/fewclouds-night.svg";
        break;
      case "03d":
      case "03n":
        content.src = "./assets/scatteredclouds.svg";
        break;
      case "04d":
      case "04n":
        content.src = "./assets/brokencloud.svg";
        break;
      case "09d":
      case "09n":
        content.src = "./assets/showerrain.svg";
        break;
      case "10d":
        content.src = "./assets/rain-day.svg";
        break;
      case "10n":
        content.src = "./assets/rain-night.svg";
        break;
      case "11d":
      case "11n":
      case "10d":
        content.src = "./assets/thunderstorms.svg";
        break;
      case "13d":
      case "13n":
        content.src = "./assets/snow.svg";
        break;
      case "50d":
      case "50n":
        content.src = "./assets/mist.svg";
        break;
      default:
        console.log("Error: Icon not found");
    }
  };

  var content = document.getElementById("current_img_id");
  validateIcons(arrayOfHours_fullStatus[0].weather[0].icon);

  var content = document.getElementById("current_img_id_tablet");
  validateIcons(arrayOfHours_fullStatus[0].weather[0].icon);

  content = document.getElementById("sky_status_+1_id");
  validateIcons(arrayOfHours_fullStatus[1].weather[0].icon);

  content = document.getElementById("sky_status_+2_id");
  validateIcons(arrayOfHours_fullStatus[2].weather[0].icon);

  content = document.getElementById("sky_status_+3_id");
  validateIcons(arrayOfHours_fullStatus[3].weather[0].icon);

  content = document.getElementById("sky_status_+4_id");
  validateIcons(arrayOfHours_fullStatus[4].weather[0].icon);

  content = document.getElementById("sky_status_+5_id");
  validateIcons(arrayOfHours_fullStatus[5].weather[0].icon);
}

makeCorsRequest();

function getgreenMapImage() {
  let dateObj = new Date();
  let newImage = new Image();

  newImage.onload = function() {
    updateGreenMapImg(newImage);
  };
  newImage.onerror = function() {};
  newImage.src =
    "http://radar.weather.gov/ridge/Overlays/Topo/Short/DAX_Topo_Short.jpg";
}

function updateGreenMapImg(greenMapImg) {
  let content = document.getElementById("doppler_img1");
  content.src = greenMapImg.src;

  content = document.getElementById("green_map_tablet_img_id");
  content.src = greenMapImg.src;
}

function cityNamesImage() {
  let dateObj = new Date();
  let newImage = new Image();

  newImage.onload = function() {
    updateCityNameImg(newImage);
  };
  newImage.onerror = function() {};
  newImage.src =
    "http://radar.weather.gov/ridge/Overlays/Cities/Short/DAX_City_Short.gif";
}

function updateCityNameImg(namesImg) {
  let nam_img_elem = document.createElement("img");
  nam_img_elem.src = namesImg.src;
  let parent = document.getElementById("map_img_container_id");
  parent.appendChild(nam_img_elem);

  let nam_tablet_img_elem = document.createElement("img");
  nam_tablet_img_elem.src = namesImg.src;
  parent = document.getElementById("tablet_map_img_container_id");
  parent.appendChild(nam_tablet_img_elem);
}

function addToArray(newImage) {
  if (count < 10) {
    newImage.id = "doppler_" + count;
    newImage.style.display = "block";
    imageArray.push(newImage);
    count = count + 1;
    if (count >= 10) {
      updateImages();
      cityNamesImage();
      myMove();
    }
  }
}

function tryToGetImage(dateObj) {
  let dateStr = dateObj.getUTCFullYear();
  dateStr += String(dateObj.getUTCMonth() + 1).padStart(2, "0"); //January is 0!
  dateStr += String(dateObj.getUTCDate()).padStart(2, "0");

  let timeStr = String(dateObj.getUTCHours()).padStart(2, "0");
  timeStr += String(dateObj.getUTCMinutes()).padStart(2, "0");

  let filename = "DAX_" + dateStr + "_" + timeStr + "_N0R.gif";
  let newImage = new Image();

  newImage.onload = function() {
    // console.log("got image "+filename);
    addToArray(newImage);
  };
  newImage.onerror = function() {
    // console.log("failed to load "+filename);
  };
  newImage.src = "http://radar.weather.gov/ridge/RadarImg/N0R/DAX/" + filename;
}

function getTenImages() {
  let dateObj = new Date(); // defaults to current date and time
  // if we try 150 images, and get one out of every 10, we should get enough
  for (let i = 0; i < 150; i++) {
    newImage = tryToGetImage(dateObj);
    dateObj.setMinutes(dateObj.getMinutes() - 1); // back in time one minute
  }
}

function updateImages() {
  for (let i = 0; i < 10; i++) {
    let dopler_img = document.createElement("img");
    dopler_img.id = "dopler_img" + i;
    dopler_img.src = imageArray[i].src;
    let parent = document.getElementById("map_img_container_id");
    parent.appendChild(dopler_img);
    dopler_img.style.opacity = 0;

    let dopler_tablet_img = document.createElement("img");
    dopler_tablet_img.id = "dopler_tablet_img" + i;
    dopler_tablet_img.src = imageArray[i].src;
    let parent1 = document.getElementById("tablet_map_img_container_id");
    parent1.appendChild(dopler_tablet_img);
    dopler_tablet_img.style.opacity = 0;

    //dopler_img.id = "dopler_tablet_img" + i;
    //parent = document.getElementById("tablet_map_img_container_id");
    //parent.appendChild(dopler_img);
  }
}

function myMove() {
  let doppler_img_array = [];
  let doppler_tablet_img_array = [];

  for (let i = 0; i < 10; i++) {
    let dop_img = document.getElementById("dopler_img" + i);
    doppler_img_array.push(dop_img);

    let dop_tablet_img = document.getElementById("dopler_tablet_img" + i);
    doppler_tablet_img_array.push(dop_tablet_img);
  }

  var currentImg = 0;
  var nextImg = 1;
  var id = setInterval(frame, 300);
  function frame() {
    doppler_img_array[currentImg].style.opacity = 0;
    doppler_img_array[nextImg].style.opacity = 1;

    doppler_tablet_img_array[currentImg].style.opacity = 0;
    doppler_tablet_img_array[nextImg].style.opacity = 1;

    currentImg + 1 > 9 ? (currentImg = 0) : currentImg++;
    nextImg + 1 > 9 ? (nextImg = 0) : nextImg++;
  }
}

function mobileTransition() {
  let header = document.getElementById("sliderHeader");
  header.classList.toggle("close");

  let main = document.getElementById("sliderMain");
  main.classList.toggle("close");
}

getgreenMapImage();
getTenImages();
