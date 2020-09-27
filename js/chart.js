const ctxObjectsInSpace = document
  .querySelector("#objectsInSpace")
  .getContext("2d");
const ctxPrivateSatellites = document
  .querySelector("#privateSatellites")
  .getContext("2d");
const ctxNationSatellites = document
  .querySelector("#nationSatellites")
  .getContext("2d");
Chart.defaults.global.responsive = true;
chartObjectsInSpace();
chartPrivateSatellites();
chartNationSatellites();
async function chartObjectsInSpace() {
  const data = await getObjectsInSpaceData(objectsInSpace);
  Chart.defaults.global.defaultFontColor = "#b9b9b9";

  let objectsInSpaceChart = new Chart(ctxObjectsInSpace, {
    type: "bar",
    data: {
      labels: data.xs,
      datasets: [
        {
          label: "Deployed objects",
          data: data.ys,
          backgroundColor: "#008fd5",
          borderColor: "#008fd5",
          borderWidth: 1,
        },
      ],
    },
    options: {
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

async function chartPrivateSatellites() {
  Chart.defaults.global.defaultFontColor = "#b9b9b9";

  let privateSatellites = new Chart(ctxPrivateSatellites, {
    type: "bar",
    data: {
      labels: ["SpaceX", "OneWeb", "Intelsat", "SES"],
      datasets: [
        {
          label: "Deployed objects",
          data: [715, 74, 69, 52],
          backgroundColor: "#008fd5",
          borderColor: "#008fd5",
          borderWidth: 1,
        },
      ],
    },
    options: {
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
async function chartNationSatellites() {
  Chart.defaults.global.defaultFontColor = "#b9b9b9";

  let privateSatellites = new Chart(ctxNationSatellites, {
    type: "bar",
    data: {
      labels: ["US & SpaceX", "Russia", "China", "Japan"],
      datasets: [
        {
          label: "SpaceX",
          data: [715, 0, 0, 0],
          backgroundColor: "#d50069",
          borderColor: "#d50069",
          borderWidth: 1,
        },
        {
          label: "America",
          data: [1822, 0, 0, 0],
          backgroundColor: "#008fd5",
          borderColor: "#008fd5",
          borderWidth: 1,
        },
        {
          label: "Russia",
          data: [0, 1528, 0, 0],
          backgroundColor: "#008fd5",
          borderColor: "#008fd5",
          borderWidth: 1,
        },
        {
          label: "China",
          data: [0, 0, 424, 0],
          backgroundColor: "#008fd5",
          borderColor: "#008fd5",
          borderWidth: 1,
        },
        {
          label: "japan",
          data: [0, 0, 0, 186],
          backgroundColor: "#008fd5",
          borderColor: "#008fd5",
          borderWidth: 1,
        },
      ],
    },
    options: {
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            stacked: true,
            ticks: {
              beginAtZero: true,
            },
          },
        ],
        yAxes: [
          {
            stacked: true,
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

async function getObjectsInSpaceData(objectsInSpace) {
  const xs = [];
  const ys = [];
  objectsInSpace.forEach((objectsInSpace) => {
    xs.push(objectsInSpace.year);
    ys.push(objectsInSpace.total);
  });
  return { xs, ys };
}
