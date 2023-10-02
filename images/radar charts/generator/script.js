window.onload = function () {
    var chrt = document.getElementById("chartId").getContext("2d");
    var chartId = new Chart(chrt, {
        type: 'radar',
        data: {
        labels: ["Carisma", "Amabilidad", "Inteligencia", "Humor", "Suerte"],
        datasets: [{
            label: "",
            // data: [0, 0, 0, 0, 0],
            data: [document.getElementById('carisma').value, 
            document.getElementById('amabilidad').value, 
            document.getElementById('inteligencia').value, 
            document.getElementById('humor').value, 
            document.getElementById('suerte').value],
            pointBackgroundColor: ['rgb(241, 120, 151, 0.8)'],
            borderColor: ['rgb(241, 120, 151, 0.8)'],
            borderWidth: 5,
            pointRadius: 5,
        }],
        },
        defaults: {
            font: {
                family: "Lato",
            },
        },
        options: {
            plugins: {
                legend: {
                    display: false,
                    labels: {
                        color: 'pink',
                    }
                }
            },
            pointStyle: false,
            responsive: false,
            animation: {
                onComplete: function () {
                    console.log(chartId.toBase64Image());
                },
                },
            elements: {
                line: {
                    borderWidth: 3,
                    backgroundColor: 'rgba(241, 120, 151, 0.5)',
                }
            },
            scales: {
                r: {
                    pointLabels: {
                        color: 'rgba(241, 120, 151, 1)',
                        font: {
                            size: 20,
                            weight: 'bold'  ,
                        },
                    },
                    backgroundColor: 'rgba(241, 120, 151, 0.1)',
                    animate: false,
                    angleLines: {
                        display: false
                    },
                    grid: {
                        lineWidth: 2,
                        //borderDash: [5*2, 5*2],
                        //borderDashOffset: 0.5,
                        color: 'rgba(235, 196, 206, 0.8)',
                    },
                    beginAtZero: true,
                    min: 0,
                    max: 5,
                    ticks: {
                        stepSize: 1,    
                        display: false,
                    }
                }
            }
        },
    });
    var image = chartId.toBase64Image();
    console.log('>>> Inserta este enlace en la barra de tu navegador: <<<');
    console.log(image);

    var form = document.querySelector('form[name=crear]');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        chartId.config.data.datasets[0].data[0] = document.getElementById('carisma').value;
        chartId.config.data.datasets[0].data[1] = document.getElementById('amabilidad').value;
        chartId.config.data.datasets[0].data[2] = document.getElementById('inteligencia').value;
        chartId.config.data.datasets[0].data[3] = document.getElementById('humor').value;
        chartId.config.data.datasets[0].data[4] = document.getElementById('suerte').value;
        chartId.update();
        var image = chartId.toBase64Image();
        console.log('>>> Inserta este enlace en la barra de tu navegador: <<<');
        console.log(image);
    });
}
