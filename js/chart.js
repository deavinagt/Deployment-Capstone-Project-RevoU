document.addEventListener('DOMContentLoaded', function () {
    const a = document.getElementById('barchart1');
    let chartInstance = null;

    function loadChart(filejson, filterMonth = null) {
        fetch(filejson)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
            })

            .then(function (data) {
                if (data !== null) {
                    data = data.filter(row => row.bulan == filterMonth)
                }
                createPieChart(data, a)
            });
    }

    function createPieChart(data, targetElement) {
        if (chartInstance) {
            chartInstance.destroy();
        }
        
        chartInstance = new Chart(targetElement, {
            type: 'pie',
            data: {
                labels: data.map(function (row) { return row.Category }),
                datasets: [{
                    label: 'Quantity',
                    data: data.map(row => row.Quantity),
                    borderWidth: 1,
                    backgroundColor: [
                        '#3d341e',
                        '#bf8030',
                        '#d3a552',
                        '#e6ca73'
                    ],
                }],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                maintainAspectRatio: true,
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'category'
                    }
                }
            }
        });
    }
    
    // load default
    loadChart('../json/sold_categories.json')

    // load All
    document.getElementById('All').addEventListener('click', function(){
        loadChart('../json/sold_categories.json');
    })

    //load Januari
    document.getElementById('Januari').addEventListener('click', function(){
        loadChart('../json/sold_category_bulan.json', '1')
    });

    document.getElementById('February').addEventListener('click', function(){
        loadChart('../json/sold_category_bulan.json', '2')
    });
});
// fetch('../json/sold_categories.json')
//     .then(function (response) {
//         if (response.ok == true) {
//             return response.json();
//         }
//     })
//     .then(function (data) {
//         console.log(data);
//         createPieChart(data, a);
//     });

// function createPieChart(data, targetElement) {
//     new Chart(targetElement, {
//         type: 'pie',
//         data: {
//             labels: data.map(function (row) { return row.Category }),
//             datasets: [{
//                 label: 'Quantity',
//                 data: data.map(row => row.Quantity),
//                 borderWidth: 1,
//                 backgroundColor: [
//                     '#3d341e',
//                     '#bf8030',
//                     '#d3a552',
//                     '#e6ca73'
//                 ],
//             }],
//         },
//         options: {
//             scales: {
//                 y: {
//                     beginAtZero: true
//                 }
//             },
//             maintainAspectRatio: true,
//             responsive: true,
//             plugins: {
//                 title: {
//                     display: true,
//                     text: 'category'
//                 }
//             }
//         }
//     });
// }

//chart 2
document.addEventListener('DOMContentLoaded', function() {
    const b = document.getElementById('barchart2');
    let chartInstance = null;

    function loadChart(filejson, filterMonth = null) {
        fetch(filejson)
            .then(function(response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .then(function(data) {
                if (filterMonth !== null) {
                    data = data.filter(row => row.bulan == filterMonth);
                }
                createLineChart(data, b);
            })
            .catch(function(error) {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    function createLineChart(data, targetElement) {
        if (chartInstance) {
            chartInstance.destroy();
        }
        chartInstance = new Chart(targetElement, {
            type: 'line',
            data: {
                labels: data.map(row => row.Jam),
                datasets: [{
                    label: 'Quantity',
                    data: data.map(row => row.Pesanan),
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                }],
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Peak Hour'
                    }
                }
            }
        });
    }

    // Load default chart data
    loadChart('../json/peak_hour.json');

    // Load tombol All
    document.getElementById('All').addEventListener('click', function () {
    loadChart('../json/peak_hour.json');        
    })

    // Load tombol Januari
    document.getElementById('Januari').addEventListener('click', function() {
        loadChart('../json/peak_hour_bulan.json', '1');
    });

    document.getElementById('February').addEventListener('click', function() {
        loadChart('../json/peak_hour_bulan.json', '2');
    });
});



// document.getElementById


// fetch('../json/peak_hour.json')
//     .then(function (response) {
//         if (response.ok == true) {
//             return response.json();
//         }
//     })
//     .then(function (data) {
//         console.log(data);
//         createLineChart(data, b);
//     });

// function createLineChart(data, targetElement) {
//     new Chart(targetElement, {
//         type: 'line',
//         data: {
//             labels: data.map(row  => row.Jam),
//             datasets: [{
//                 label: 'Quantity',
//                 data: data.map(row => row.Pesanan),
//                 fill: false,
//                 borderColor: 'rgb(75, 192, 192)',
//                 tension: 0.1,
//             }],
//         },
//         options: {
//             plugins: {
//                 title: {
//                     display: true,
//                     text: 'Peak Hour'
//                 }
//             }
//         }
//     })
// };

// Chart 3
document.addEventListener('DOMContentLoaded', function () {
    const c = document.getElementById('barchart3');
    let chartInstance = null;

    function loadChart(filejson, filterMonth = null) {
        fetch(filejson)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .then(function (data) {
                if (filterMonth !== null) {
                    data = data.filter(row => row.Bulan == filterMonth);
                }
                createBarChart(data, c);
                
            })
            .catch(function (error) {
                console.error('Terjadi masalah dengan operasi fetch:', error);
            });
    }

    function createBarChart(data, targetElement) {
        if (chartInstance) {
            chartInstance.destroy();
        }
        chartInstance = new Chart(targetElement, {
            type: 'bar',
            data: {
                labels: data.map(row => row.Bulan),
                datasets: [{
                    label: 'Pendapatan',
                    data: data.map(row => row.Pendapatan),
                    backgroundColor: '#c9770c',
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    }
                },
                maintainAspectRatio: true,
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Pendapatan per Bulan'
                    }
                }
            }
        });
    }

    // load default
    loadChart('../json/revenue_month.json');

    // load all
        document.getElementById('All').addEventListener('click', function () {
        loadChart('../json/revenue_month.json');
    });

    // load Januari
    document.getElementById('Januari').addEventListener('click', function () {
        loadChart('../json/revenue_month.json', '1');
    });

        document.getElementById('February').addEventListener('click', function () {
        loadChart('../json/revenue_month.json', '2');
    });
});




// fetch('../json/revenue_month.json')
//     .then(function (response) {
//         if (response.ok == true) {
//             return response.json();
//         }
//     })

//     .then(function (data) {
//         data.forEach(row => {
//             row.Pendapatan = parseFloat(row.Pendapatan.replace('$', ''));
//         });
//         console.log(data);
//         createBarChart(data, c);
//     })
//     ;

// function createBarChart(data, targetElement) {
//     new Chart(targetElement, {
//         type: 'bar',
//         data: {
//             labels: data.map(row => row.Bulan),
//             datasets: [{
//                 label: 'Pendapatan',
//                 data: data.map(row => row.Pendapatan),
//                 backgroundColor: '#c9770c',
//             }]
//         },
//         options: {
//             scales: {
//                 y: {
//                     beginAtZero: true,
//                 }
//             },
//             maintainAspectRatio: true,
//             responsive: true,
//             plugins: {
//                 title: {
//                     display: true,
//                     text: 'Pendapatan per Bulan'
//                 }
//             }
//         }
//     });
// }

// Fungsi untuk Chart4User
let currentPage = 1;
const itemsPerPage = 10;

fetch('../json/highest_sold.json')
    .then(response => response.json())
    .then(data => {
        renderData(data);
        prepareNavigation(data);
        updatePageIndicator(currentPage, Math.ceil(data.length / itemsPerPage));
        addRowIndex(data);
    });

function renderData(data) {
    let start = (currentPage - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let currentData = data.slice(start, end);
    highestTable(currentData);
}

function prepareNavigation(data) {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    prevButton.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            renderData(data);
            updatePageIndicator(currentPage, totalPages);
            addRowIndex(data);
        }
    });

    nextButton.addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            renderData(data);
            updatePageIndicator(currentPage, totalPages);
            addRowIndex(data);
        }
    });
}

function updatePageIndicator(currentPage, totalPages) {
    const pageIndicator = document.getElementById('page-indicator');
    pageIndicator.textContent = currentPage + '/' + totalPages;
}

function highestTable(data) {
    let tbody = document.querySelector('#data-table tbody');

    tbody.innerHTML = '';

    data.forEach(function (item) {
        let row = document.createElement('tr');
        
        
        let cellIndex = document.createElement('td');
        cellIndex.textContent = '';
        row.appendChild(cellIndex);

    
        for (let i = 0; i < 3; i++) { 
            let cell = document.createElement('td');
            cell.textContent = item[Object.keys(item)[i]]; 
            row.appendChild(cell);
        }
        
        tbody.appendChild(row);
    });
}

function addRowIndex() {
    let rows = document.querySelectorAll('#data-table tbody tr');
    rows.forEach((row, index) => {
        let existingIndex = row.querySelector('td:first-child');
        if (existingIndex) {
            existingIndex.textContent = (currentPage - 1) * itemsPerPage + index + 1;
        }
    });
}
// Fungsi untuk Chart5
let currentPageLowest = 1;
const itemsPerPageLowest = 10;
let currentData = null;

fetch('../json/lowest_sold.json')
    .then(response => response.json())
    .then(data => {
        currentData = data;
        renderDataLowest(data);
        prepareNavigationLowest(data);
        updatePageIndicatorLowest(currentPageLowest, Math.ceil(data.length / itemsPerPageLowest));
        addRowIndexLowest(data);
    });

function renderDataLowest(data) {
    let start = (currentPageLowest - 1) * itemsPerPageLowest;
    let end = start + itemsPerPageLowest;
    let currentData = data.slice(start, end);
    lowestTable(currentData);
}

function prepareNavigationLowest(data) {
    const totalPages = Math.ceil(data.length / itemsPerPageLowest);
    const prevButton = document.getElementById('prev-button-chart5');
    const nextButton = document.getElementById('next-button-chart5');

    prevButton.addEventListener('click', function() {
        if (currentPageLowest > 1) {
            currentPageLowest--;
            renderDataLowest(data);
            updatePageIndicatorLowest(currentPageLowest, totalPages);
            addRowIndexLowest(data);
        }
    });

    nextButton.addEventListener('click', function() {
        if (currentPageLowest < totalPages) {
            currentPageLowest++;
            renderDataLowest(data);
            updatePageIndicatorLowest(currentPageLowest, totalPages);
            addRowIndexLowest(data);
        }
    });
}

function updatePageIndicatorLowest(currentPage, totalPages) {
    const pageIndicator = document.getElementById('page-indicator-chart5');
    pageIndicator.textContent = currentPage + '/' + totalPages;
}

function lowestTable(data) {
    let tbody = document.querySelector('#data-table-chart5 tbody');

    tbody.innerHTML = '';

    data.forEach(function (item) {
        let row = document.createElement('tr');
        
        let cellIndex = document.createElement('td');
        cellIndex.textContent = '';
        row.appendChild(cellIndex);

        for (let i = 0; i < 3; i++) { 
            let cell = document.createElement('td');
            cell.textContent = item[Object.keys(item)[i]]; 
            row.appendChild(cell);
        }
        
        tbody.appendChild(row);
    });
}

function addRowIndexLowest(data) {
    let rows = document.querySelectorAll('#data-table-chart5 tbody tr');
    rows.forEach((row, index) => {
        let existingIndex = row.querySelector('td:first-child');
        if (existingIndex) {
            existingIndex.textContent = (currentPageLowest - 1) * itemsPerPageLowest + index + 1;
        }
    });
}