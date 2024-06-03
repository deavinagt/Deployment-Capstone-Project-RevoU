document.addEventListener('DOMContentLoaded', function () {
    const a = document.getElementById('barchart1');
    let chartInstance = null;
    let selectedMonth = 'All';
    let selectedCategory = 'All-category';
    let selectedSize = 'All-size';
    let prevSelectedCategory = null;
    let prevSelectedMonth = null;
    let precSelectedSize = null;

    function loadChart(filejson, filterMonth = null, filterCategory = null, filterSize = null) {
        fetch(filejson)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(function (data) {
                if (data !== null) {
                    if (filterMonth && filterMonth !== 'All') {
                        data = data.filter(row => row.bulan == filterMonth);
                    }
                    if (filterCategory && filterCategory !== 'All-category') {
                        data = data.filter(row => row.Category == filterCategory);
                    }
                    if (filterSize && filterSize !== 'All-size') {
                        data = data.filter(row => row.size == filterSize);
                    }
                }
                createPieChart(data, a);
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
                        '#6F4E37',
                        '#A67B5B',
                        '#ECB176',
                        '#FED8B1'
                    ],
                }],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    },
                    x: {
                        grid: {
                            offset: true
                        }
                    }
                },
                maintainAspectRatio: true,
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Total Sold by Category',
                    }
                }
            }
        });
    }

    function updateChart() {
        let filejson;
        if (selectedMonth !== 'All' && selectedCategory !== 'All-category' && selectedSize !== 'All-size') {
            // Jika ketiga filter bulan, kategori, dan ukuran (size) dipilih bersama-sama
            filejson = '../json/sold_category_bulan_size.json';
        } else if (selectedMonth !== 'All' && selectedSize !== 'All-size') {
            // Jika hanya bulan dan ukuran (size) yang difilter bersama-sama
            filejson = '../json/sold_category_bulan_size.json';
        } else if (selectedMonth !== 'All' && selectedCategory !== 'All-category') {
            // Jika hanya bulan dan kategori yang difilter bersama-sama
            filejson = '../json/sold_category_bulan.json';
        } else if (selectedMonth !== 'All') {
            // Jika hanya bulan yang difilter, gunakan file yang berisi data per bulan
            filejson = '../json/sold_category_bulan.json';
        } else if (selectedSize !== 'All-size' && selectedCategory !== 'All-category') {
            // Jika hanya ukuran (size) dan kategori yang difilter bersama-sama
            filejson = '../json/sold_category_size.json';
        } else if (selectedSize !== 'All-size') {
            // Jika hanya ukuran (size) yang difilter, gunakan file yang berisi data per ukuran
            filejson = '../json/sold_category_size.json';
        } else {
            // Jika hanya kategori atau tidak ada filter, gunakan file utama
            filejson = '../json/sold_categories.json';
        }
    
        loadChart(filejson, selectedMonth, selectedCategory, selectedSize);
    }

    updateChart();

    // Month filters
    document.querySelectorAll('.filter.month').forEach(button => {
        button.addEventListener('click', function () {
            if (selectedMonth === this.id) { 
                selectedMonth = 'All'; 
            } else {
                selectedMonth = this.id === 'All' ? 'All' : this.id;
            }
            updateChart();
        });
    });

    // Category filters
    document.querySelectorAll('.filter.category').forEach(button => {
        button.addEventListener('click', function(){
            if (selectedCategory === this.id) { 
                selectedCategory = 'All-category'; 
            } else {
                selectedCategory = this.id === 'All-category' ? 'All-category' : this.id;
            }
            updateChart();
        });
    });

    // SIZE filters
    document.querySelectorAll('.filter.size').forEach(button => {
        button.addEventListener('click', function(){
            if (selectedSize === this.id) { 
                selectedSize = 'All-size'; 
            } else {
                selectedSize = this.id === 'All-size' ? 'All-size' : this.id;
            }
            updateChart();
        });
    });

});


document.addEventListener('DOMContentLoaded', function () {
    const b = document.getElementById('barchart2');
    let chartInstance = null;
    let selectedMonth = 'All';
    let selectedCategory = 'All-category';
    let selectedSize = 'All-size';
    let prevSelectedCategory = null;

    function loadChart(filejson, filterMonth = null, filterCategory = null, filterSize = null) {
        fetch(filejson)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(function (data) {
                if (data !== null) {
                    if (filterMonth && filterMonth !== 'All') {
                        data = data.filter(row => row.bulan == filterMonth);
                    }
                    if (filterCategory && filterCategory !== 'All-category') {
                        data = data.filter(row => row.Category == filterCategory);
                    }
                    if (filterSize && filterSize !== 'All-size') {
                        data = data.filter(row => row.size == filterSize);
                    }
                }
                createLineChart(data, b);
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

    function updateChart() {
        let filejson;
        if (selectedMonth !== 'All' && selectedCategory !== 'All-category' && selectedSize !== 'All-size') {
            filejson = '../json/peak_hour_category_bulan_size.json';
        } else if (selectedMonth !== 'All' && selectedSize !== 'All-size') {
            
            filejson = '../json/peak_hour_bulan_size.json';
        } else if (selectedMonth !== 'All' && selectedCategory !== 'All-category') {
            // Jika hanya bulan dan kategori yang difilter bersama-sama
            filejson = '../json/peak_hour_category_bulan.json';
        } else if (selectedMonth !== 'All') {
            // Jika hanya bulan yang difilter, gunakan file yang berisi data per bulan
            filejson = '../json/peak_hour_bulan.json';
        } else if (selectedSize !== 'All-size' && selectedCategory !== 'All-category') {
            // Jika hanya ukuran (size) dan kategori yang difilter bersama-sama
            filejson = '../json/peak_hour_size_category.json';
        } else if (selectedCategory !== 'All-category') {
            // Jika hanya kategori yang difilter
            filejson = '../json/peak_hour_category_year.json';
        } else if (selectedSize !== 'All-size') {
            // Jika hanya ukuran (size) yang difilter
            filejson = '../json/peak_hour_size.json';
        } else {
            // Jika tidak ada filter yang dipilih
            filejson = '../json/peak_hour.json';
        }
    
        loadChart(filejson, selectedMonth, selectedCategory, selectedSize);
    }
    
    

    updateChart();

    // Month filters
    document.querySelectorAll('.filter.month').forEach(button => {
        button.addEventListener('click', function () {
            if (selectedMonth === this.id) { // Jika kategori yang sama diklik dua kali berturut-turut
                selectedMonth = 'All'; // Setel filter kategori ke 'All'
            } else {
                selectedMonth = this.id === 'All' ? 'All' : this.id;
            }
            updateChart();
        });
    });

    // Category filters
    document.querySelectorAll('.filter.category').forEach(button => {
        button.addEventListener('click', function(){
            if (selectedCategory === this.id) { // Jika kategori yang sama diklik dua kali berturut-turut
                selectedCategory = 'All-category'; // Setel filter kategori ke 'All'
            } else {
                selectedCategory = this.id === 'All-category' ? 'All-category' : this.id;
            }
            updateChart();
        });
    });

    document.querySelectorAll('.filter.size').forEach(button => {
        button.addEventListener('click', function(){
            if (selectedSize === this.id) { // Jika kategori yang sama diklik dua kali berturut-turut
                selectedSize = 'All-size'; // Setel filter kategori ke 'All'
            } else {
                selectedSize = this.id === 'All-size' ? 'All-size' : this.id;
            }
            updateChart();
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const c = document.getElementById('barchart3');
    let chartInstance = null;
    let selectedMonth = 'All';
    let selectedCategory = 'All-category';
    let selectedSize = 'All-size';
    let prevSelectedCategory = null;

    function loadChart(filejson, filterMonth = null, filterCategory = null, filterSize = null) {
        fetch(filejson)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(function (data) {
                if (data !== null) {
                    if (filterMonth && filterMonth !== 'All') {
                        data = data.filter(row => row.bulan == filterMonth);
                    }
                    if (filterCategory && filterCategory !== 'All-category') {
                        data = data.filter(row => row.Category == filterCategory);
                    }
                    if (filterSize && filterSize !== 'All-size') {
                        data = data.filter(row => row.size == filterSize);
                    }
                }
                createBarChart(data, c);
            });
    }

    function createBarChart(data, targetElement) {
        if (chartInstance) {
            chartInstance.destroy();
        }

        chartInstance = new Chart(targetElement, {
            type: 'bar',
            data: {
                labels: data.map(row => row.bulan),
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
                        text: 'Revenue by Month'
                    },
                    tooltip:{
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
        
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }

    function updateChart() {
        let filejson;
        if (selectedMonth !== 'All' && selectedCategory !== 'All-category' && selectedSize !== 'All-size'){
            filejson = '../json/revenue_month_category_size.json';
        }else if (selectedMonth !== 'All' && selectedCategory !== 'All-category') {
            // Category dan bulan
            filejson = '../json/revenue_category.json';
        }else if (selectedSize !== 'All-size' && selectedCategory !== 'All-category') {
            // Size dan Category
            filejson = '../json/revenue_month_category_size.json';
        } else if (selectedSize !== 'All-size' && selectedMonth !== 'All') {
            // Size dan Bulan
            filejson = '../json/revenue_month_size.json';
        } else if (selectedMonth !== 'All') {
             //  Bulan
            filejson = '../json/revenue_month.json';
        } else if (selectedSize !== 'All-size') {
            // Size
            filejson = '../json/revenue_month_size.json';
        } else if (selectedCategory !== 'All-category') {
             // Category
            filejson = '../json/revenue_category.json';
        } else {
            filejson = '../json/revenue_month.json';
        }
    
        loadChart(filejson, selectedMonth, selectedCategory, selectedSize);
    }
    

    updateChart();

    document.querySelectorAll('.filter.month').forEach(button => {
        button.addEventListener('click', function () {
            if (selectedMonth === this.id) { // Jika kategori yang sama diklik dua kali berturut-turut
                selectedMonth = 'All'; // Setel filter kategori ke 'All'
            } else {
                selectedMonth = this.id === 'All' ? 'All' : this.id;
            }
            updateChart();
        });
    });

    document.querySelectorAll('.filter.category').forEach(button => {
        button.addEventListener('click', function () {
            if (selectedCategory == this.id) {
                selectedCategory = 'All-category';
            } else {
                selectedCategory = this.id == this.id === 'All-category' ? 'All-category' : this.id;
            }
            updateChart();
        })
    });

    document.querySelectorAll('.filter.size').forEach(button => {
        button.addEventListener('click', function () {
            if (selectedSize == this.id) {
                selectedSize = 'All-size';
            } else {
                selectedSize = this.id == this.id === 'All-size' ? 'All-size' : this.id;
            }
            updateChart();
        })
    });

});



// HIGHHESTSOLD
const tableBodyHighest = document.querySelector("#data-table tbody");
let originalDataHighest = null;
let selectedMonthHighest = 'All'; 
let selectedCategoryHighest = 'All-category'; 
let selectedSizeHighest = 'All-size'
let currentPageHighest = 1;
let itemsPerPageHighest = 10;

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayTableDataHighest(data, page = 1) {
    if (!data) {
        console.error('Data is undefined or null.');
        return;
    }
    tableBodyHighest.innerHTML = '';
    const start = (page - 1) * itemsPerPageHighest;
    const pageData = data.slice(start, start + itemsPerPageHighest);

    pageData.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${start + 1 + index}</td>
            <td>${item.Name}</td>
            <td>${item.Sold}</td>
            <td>$${item.Revenue}</td>
        `;
        tableBodyHighest.appendChild(row);
    });

    displayPaginationHighest(data.length, page);
}

function displayPaginationHighest(totalItems, currentPage) {
    const paginationDiv = document.getElementById('pagination');
    const totalPages = Math.ceil(totalItems / itemsPerPageHighest);

    const pageIndicator = document.getElementById('page-indicator');
    pageIndicator.textContent = `${currentPage} of ${totalPages}`;

    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;

    // Menghapus event listener yang ada sebelumnya
    prevButton.removeEventListener('click', handlePrevClickHighest);
    nextButton.removeEventListener('click', handleNextClickHighest);

    // Menambahkan event listener baru
    prevButton.addEventListener('click', handlePrevClickHighest);
    nextButton.addEventListener('click', handleNextClickHighest);
}

function handlePrevClickHighest() {
    if (currentPageHighest > 1) {
        currentPageHighest--;
        updateTableHighest();
    }
}

function handleNextClickHighest() {
    const totalPages = Math.ceil(originalDataHighest.length / itemsPerPageHighest);
    if (currentPageHighest < totalPages) {
        currentPageHighest++;
        updateTableHighest();
    }
}

function updateTableHighest() {
    let filejson;
    if (selectedMonthHighest !== 'All' && selectedCategoryHighest !== 'All-category' && selectedSizeHighest !== 'All-size') {
        // Jika ketiga filter digunakan bersama-sama
        filejson = '../json/highest_sold_month_size.json';
    } else if (selectedMonthHighest !== 'All' && selectedCategoryHighest !== 'All-category') {
        // Jika hanya bulan dan kategori yang difilter bersama-sama
        filejson = '../json/highest_sold_bulan.json';
    } else if (selectedSizeHighest !== 'All-size' && selectedCategoryHighest !== 'All-category') {
        // Jika hanya ukuran (size) dan kategori yang difilter bersama-sama
        filejson = '../json/highest_sold_size.json';
    } else if (selectedSizeHighest !== 'All-size' && selectedMonthHighest !== 'All') {
        // Jika hanya ukuran (size) dan bulan yang difilter bersama-sama
        filejson = '../json/highest_sold_month_size.json';
    } else if (selectedSizeHighest !== 'All-size') {
        // Jika hanya ukuran (size) yang difilter
        filejson = '../json/highest_sold_size.json';
    } else if (selectedMonthHighest !== 'All') {
        // Jika hanya bulan yang difilter
        filejson = '../json/highest_sold_bulan.json';
    } else if (selectedCategoryHighest !== 'All-category') {
        // Jika hanya kategori yang difilter
        filejson = '../json/highest_sold_bulan.json';
    } else {
        // Jika tidak ada filter yang dipilih, gunakan file utama
        filejson = '../json/highest_sold.json';
    }

    fetchData(filejson).then(data => {
        originalDataHighest = data;

        let filteredData = originalDataHighest;

        if (selectedMonthHighest !== 'All') {
            filteredData = filteredData.filter(item => item.bulan === selectedMonthHighest.toString());
        }

        if (selectedCategoryHighest !== 'All-category') {
            filteredData = filteredData.filter(item => item.category === selectedCategoryHighest);
        }
        if (selectedSizeHighest !== 'All-size') {
            filteredData = filteredData.filter(item => item.size === selectedSizeHighest);
        }

        displayTableDataHighest(filteredData, currentPageHighest);
    });
}

// Memuat data awal
fetchData('../json/highest_sold.json').then(data => {
    originalDataHighest = data;
    displayTableDataHighest(originalDataHighest, currentPageHighest);
});

document.querySelectorAll('.filter.month').forEach(button => {
    button.addEventListener('click', function () {
        if (selectedMonthHighest === this.id) {
            selectedMonthHighest = 'All';
        } else {
            selectedMonthHighest = this.id === 'All' ? 'All' : this.id;
        }
        currentPageHighest = 1;
        updateTableHighest();
    });
});

document.querySelectorAll('.filter.category').forEach(button => {
    button.addEventListener('click', function () {
        if (selectedCategoryHighest === this.id) {
            selectedCategoryHighest = 'All-category';
        } else {
            selectedCategoryHighest = this.id === 'All-category' ? 'All-category' : this.id;
        }
        currentPageHighest = 1;
        updateTableHighest();
    });
});

document.querySelectorAll('.filter.size').forEach(button => {
    button.addEventListener('click', function () {
        if (selectedSizeHighest === this.id) {
            selectedSizeHighest = 'All-size';
        } else {
            selectedSizeHighest = this.id === 'All-size' ? 'All-size' : this.id;
        }
        currentPageHighest = 1;
        updateTableHighest();
    });
});


//--------------------------- LOWEST --------------------
const tableBodyLowest = document.querySelector("#data-table-chart5 tbody");
let originalDataLowest = null;
let selectedMonthLowest = 'All'; 
let selectedCategoryLowest = 'All-category'; 
let selectedSizeLowest = 'All-size';
let currentPageLowest = 1;
let itemsPerPageLowest = 10;

function displayTableDataLowest(data, page = 1) {
    if (!data) {
        console.error('Data is undefined or null.');
        return;
    }
    tableBodyLowest.innerHTML = '';
    const start = (page - 1) * itemsPerPageLowest;
    const pageData = data.slice(start, start + itemsPerPageLowest);

    pageData.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${start + 1 + index}</td>
            <td>${item.Name}</td>
            <td>${item.Sold}</td>
            <td>$${item.Revenue}</td>
        `;
        tableBodyLowest.appendChild(row);
    });

    displayPaginationLowest(data.length, page);
}

function displayPaginationLowest(totalItems, currentPage) {
    const paginationDiv = document.getElementById('pagination-chart5');
    const totalPages = Math.ceil(totalItems / itemsPerPageLowest);

    const pageIndicator = document.getElementById('page-indicator-chart5');
    pageIndicator.textContent = `${currentPage} of ${totalPages}`;

    const prevButton = document.getElementById('prev-button-chart5');
    const nextButton = document.getElementById('next-button-chart5');

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;

    // Menghapus event listener yang ada sebelumnya
    prevButton.removeEventListener('click', handlePrevClickLowest);
    nextButton.removeEventListener('click', handleNextClickLowest);

    // Menambahkan event listener baru
    prevButton.addEventListener('click', handlePrevClickLowest);
    nextButton.addEventListener('click', handleNextClickLowest);
}

function handlePrevClickLowest() {
    if (currentPageLowest > 1) {
        currentPageLowest--;
        updateTableLowest();
    }
}

function handleNextClickLowest() {
    const totalPages = Math.ceil(originalDataLowest.length / itemsPerPageLowest);
    if (currentPageLowest < totalPages) {
        currentPageLowest++;
        updateTableLowest();
    }
}

function updateTableLowest() {
    let filejson;
    if (selectedMonthLowest !== 'All' && selectedCategoryLowest !== 'All-category' && selectedSizeLowest !== 'All-size') {
        filejson = '../json/lowest_sold_month_size.json';
    } else if (selectedSizeLowest !== 'All-size' && selectedMonthLowest !== 'All') {
        filejson = '../json/lowest_sold_month_size.json';
    } else if (selectedCategoryLowest !== 'All-category' && selectedMonthLowest !== 'All') {
        filejson = '../json/lowest_sold_bulan.json';
    } else if (selectedSizeLowest !== 'All-size') {
        filejson = '../json/lowest_sold_size.json';
    } else if (selectedMonthLowest !== 'All') {
        filejson = '../json/lowest_sold_bulan.json';
    } else if (selectedCategoryLowest !== 'All-category') {
        filejson = '../json/lowest_sold_bulan.json';
    } else {
        filejson = '../json/lowest_sold.json';
    }

    fetchData(filejson).then(data => {
        originalDataLowest = data;

        let filteredData = originalDataLowest;

        if (selectedMonthLowest !== 'All') {
            filteredData = filteredData.filter(item => item.bulan === selectedMonthLowest.toString());
        }

        if (selectedCategoryLowest !== 'All-category') {
            filteredData = filteredData.filter(item => item.category === selectedCategoryLowest);
        }
        if (selectedSizeLowest !== 'All-size') {
            filteredData = filteredData.filter(item => item.size === selectedSizeLowest);
        }

        displayTableDataLowest(filteredData, currentPageLowest);
    });
}

// Memuat data awal
fetchData('../json/lowest_sold.json').then(data => {
    originalDataLowest = data;
    displayTableDataLowest(originalDataLowest, currentPageLowest);
});

document.querySelectorAll('.filter.month').forEach(button => {
    button.addEventListener('click', function () {
        if (selectedMonthLowest === this.id) {
            selectedMonthLowest = 'All';
        } else {
            selectedMonthLowest = this.id === 'All' ? 'All' : this.id;
        }
        currentPageLowest = 1;
        updateTableLowest();
    });
});

document.querySelectorAll('.filter.category').forEach(button => {
    button.addEventListener('click', function () {
        if (selectedCategoryLowest === this.id) {
            selectedCategoryLowest = 'All-category';
        } else {
            selectedCategoryLowest = this.id === 'All-category' ? 'All-category' : this.id;
        }
        currentPageLowest = 1;
        updateTableLowest();
    });
});

document.querySelectorAll('.filter.size').forEach(button => {
    button.addEventListener('click', function () {
        if (selectedSizeLowest === this.id) {
            selectedSizeLowest = 'All-size';
        } else {
            selectedSizeLowest = this.id === 'All-size' ? 'All-size' : this.id;
        }
        currentPageLowest = 1;
        updateTableLowest();
    });
});




// dropDown Month

function toggleDropdown() {
    let dropdownContent = document.getElementById("filter");
    dropdownContent.classList.toggle("show");
}

let filterButton = document.querySelectorAll('.month')

filterButton.forEach(function (button) {
    button.addEventListener('click', function () {
        filterButton.forEach(btn => {
            if (btn !== button) {
                btn.classList.remove('filter-active');
            }
        });

        button.classList.toggle('filter-active')

        let dropDownCategory = document.getElementById('filter'); 
        dropDownCategory.classList.remove('show');
    });

});

//dropDown Category

function toggleDropDownCategory() {
    let dropDownCategory = document.getElementById('filterCategory'); 
    dropDownCategory.classList.toggle('show-category');
}

let filterButtonCategory = document.querySelectorAll('.category');

filterButtonCategory.forEach(function (button) {
    button.addEventListener('click', function () {
        filterButtonCategory.forEach(btn => {
            if (btn !== button) { 
                btn.classList.remove('filter-active');
            }
        });

        button.classList.toggle('filter-active');

        let dropDownCategory = document.getElementById('filterCategory'); 
        dropDownCategory.classList.remove('show-category');

        
    });
});

// dropdown Size
function toggleDropDownSize() {
    let dropDownSize = document.getElementById('filterSize'); 
    dropDownSize.classList.toggle('show-size');
}

let filterButtonSize = document.querySelectorAll('.size');

filterButtonSize.forEach(function (button) {
    button.addEventListener('click', function () {
        filterButtonSize.forEach(btn => {
            if (btn !== button) { 
                btn.classList.remove('filter-active');
            }
        });

        button.classList.toggle('filter-active');

        let dropDownSize = document.getElementById('filterSize'); 
        dropDownSize.classList.remove('show-size');     
    });
});