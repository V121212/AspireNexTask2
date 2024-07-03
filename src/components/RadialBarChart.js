import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const RadialBarChart = ({ score }) => {
  const [countQue, setCountQue] = useState(null);
  const email = localStorage.getItem("email");

  useEffect(() => {
    axios.get('http://localhost:1000/get_count', { 
      params: { email: email }
    })
    .then(result => {
      console.log("Your response:", result.data);
      setCountQue(result.data.count);
    })
    .catch(err => {
      console.error("Error while getting count in front end:", err);
    });
  }, [email]);

  if (countQue === null) {
    return <div>Loading...</div>;
  }

  const options = {
    chart: {
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: true,
            fontSize: '22px',
            formatter: function (val) {
              return `${val}%`;
            },
          },
        },
      },
    },
    labels: ['Quiz Score'],
  };

  const series = [(score / countQue) * 100];
  series[0] = parseFloat(series[0].toFixed(2));

  return (
    <div className="radial-bar-chart">
      <Chart options={options} series={series} type="radialBar" height="350" />
      {
        series[0] === 100 && (
          <div className="congratulations text-center">
            <h2>Congratulations!</h2>
            <p>You have scored 100% in the quiz.</p>
          </div>
        )
      }
      {/* // now add for score less than 100 and greater than 65 and say you passed the exam and if score less than 65 then say failed className */}
      {
        series[0] < 70 && (
          <div className="failed text-center">
            <h2>Failed!</h2>
            <p>You have scored {series[0]}% in the quiz. You failed the exam.</p>
          </div>
        )
      }
      {
        series[0] > 70 && series[0] <100  && (
          <div className="passed text-center">
            <h2>Passed!</h2>
            <p>You have scored {series[0]}% in the quiz. You passed the exam.</p>
          </div>
        )
      }
    </div>
  );
};

export default RadialBarChart;
