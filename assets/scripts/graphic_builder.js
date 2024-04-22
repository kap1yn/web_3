const basketLabels = ['Phones', 'Laptops', 'Peripherals'];

const basketData = []

let countPhones = 0;
let countLaptops = 0;
let countPeripherals = 0;

basket.forEach(item => {
    if (item.category === 'phone') {
        countPhones += item.count;
    } else if (item.category === 'laptop') {
        countLaptops += item.count;
    } else if (item.category === 'peripherals') {
        countPeripherals += item.count;
    }
});
basketData.push(countPhones, countLaptops, countPeripherals);

const ctx = document.getElementById('myChart').getContext('2d');
let myChart = JSON.parse(localStorage.getItem('myChart')) || null;

$(document).ready(function() {
    createChart();

    $('#graphic_bar').click(function() {
        createChart('bar');
    });

    $('#graphic_line').click(function() {
        createChart('line');
    });

    $('#graphic_pie').click(function() {
        createChart('pie');
    });
});


function createChart(type='pie') {
    console.log('createChart');
    if (myChart) {
        myChart.destroy();
    }
    myChart = new Chart(ctx, {
        type: type,
        data: {
            labels: ['Phones', 'Laptops', 'Peripherals'],
            datasets: [{
                label: 'Your basket',
                data: basketData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

