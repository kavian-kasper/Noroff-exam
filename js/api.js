const upcomingLaunchesUrl = "https://api.spacexdata.com/v4/launches/upcoming";
const rocketUrl = "https://api.spacexdata.com/v4/rockets/";
const spacexSchedule = document.querySelector("#spacex-schedule");

// parses JSON
async function loadJson(url) {
  try {
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.log(error);
  }
}
// Fetches data from two api calls and returns an obbject of arrays
async function getSpacexData() {
  let rocketName = [];
  let missionName = [];
  let launchDate = [];
  let launchTime = [];
  let missionDetails = [];
  let upcomingLaunchesData = await loadJson(upcomingLaunchesUrl);
  for (i = 0; i < upcomingLaunchesData.length; i++) {
    // rocketId is used as endpoint in the second api call
    const rocketId = upcomingLaunchesData[i].rocket;
    missionName.push(upcomingLaunchesData[i].name);
    missionDetails.push(upcomingLaunchesData[i].details);

    // Formats dates with day.js library
    launchDate.push(
      dayjs(upcomingLaunchesData[i].date_local).format("MMM, ddd D.")
    );

    launchTime.push(dayjs(upcomingLaunchesData[i].date_local).format("h:mm A"));

    // Makes second api call
    const rocketData = await loadJson(`${rocketUrl}${rocketId}`);
    rocketName.push(rocketData.name);
  }

  // returns object of arrays
  return { rocketName, missionName, launchDate, launchTime, missionDetails };
}

// Creates html from the object of arrays
const slider = document.querySelector(".slider");
async function createSpacexSchedule() {
  try {
    const data = await getSpacexData();

    for (i = 0; i < 10; i++) {
      //replaces falsy value with placeholder text
      if (!data.missionDetails[i]) {
        data.missionDetails[i] =
          "Details of this upcoming launch will be added here when they are made public by SPACEX.";
      }

      slider.innerHTML += `<section>
      <div class="schedule-container">
      <div class="cell">
        <p class="blue"><span class="lineBreak text-small uppercase light-gray thin">Mission</span>
          ${data.missionName[i]}
        </p>
        <p class="blue"><span class="lineBreak text-small uppercase light-gray thin">Rocket</span>
        ${data.rocketName[i]}
        </p>
      </div>
      <div class="cell">
      <p class="white"><span class="lineBreak text-small uppercase light-gray thin">Date</span>
        ${data.launchDate[i]}
        </p>
        <p class="white"><span class="lineBreak text-small uppercase light-gray thin">Time</span>
      ${data.launchTime[i]}
        </p>
      </div>
      </div>
      <div>
      <p class="textbox font-yrsa"> ${data.missionDetails[i]}</p>
      </div>
    </section>`;
    }
  } catch (error) {
    slider.innerHTML +=
      "<h2>An error occured while processing the request. Try to reload.";
  }
}

// left and right arrow buttons
const leftArrow = document.querySelector(".left");
const rightArrow = document.querySelector(".right");
//indexes slideshow button clicks
let sectionIndex = 0;

//Calculates transform values for button clicks left and right
rightArrow.addEventListener("click", function () {
  sectionIndex = sectionIndex < 9 ? sectionIndex + 1 : 9;
  slider.style.transform = "translate(" + sectionIndex * -10 + "%)";
});
leftArrow.addEventListener("click", function () {
  sectionIndex = sectionIndex > 0 ? sectionIndex - 1 : 0;
  slider.style.transform = "translate(" + sectionIndex * -10 + "%)";
});

createSpacexSchedule();
