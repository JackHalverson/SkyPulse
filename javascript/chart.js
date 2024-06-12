import {daysTempList, daysList} from "./main.js"


// Data and configuration for the chart
const data = {
  labels: daysList,
  datasets: [
    {
      label: "Highs",
      data: daysTempList,
      backgroundColor: [
        "rgba(54, 162, 235, 1)",
      ],
      borderColor: [
        "rgba(54, 162, 235, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const config = {
  type: 'bar',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart'
      }
    },
    // maintainAspectRatio: false,
  },
};

// Render the chart
window.onload = function () {
  const ctx = document.getElementById("myChart")
  new Chart(ctx, config);
};