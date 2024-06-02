// document.addEventListener("DOMContentLoaded", function() {
//     fetch('../json/pizza.json')
//         .then(response => response.json())
//         .then((data) => {

//             const cardPizza = document.getElementById('card');

//             data.forEach((item, index) => {

//                 let className;
//                 if (index % 9 === 0 || index % 9 === 5 || index % 9 === 7) {
//                     className = 'card-content card-pizza-1';
//                 } else if (index % 9 === 1 || index % 9 === 3 || index % 9 === 8) {
//                     className = 'card-content card-pizza-2';
//                 } else if (index % 9 === 2 || index % 9 === 4 || index % 9 === 6) {
//                     className = 'card-content card-pizza-3';
//                 }
                
//                 const cardContent = document.createElement('div');
//                 cardContent.className = className;
//                 cardPizza.appendChild(cardContent);

//                 const imgPizza = document.createElement('img');
//                 imgPizza.src = item.image;
//                 imgPizza.alt = item.name;
//                 cardContent.appendChild(imgPizza);

//                 const itemContent = document.createElement('span');
//                 cardContent.appendChild(itemContent);
    
//                 const pizzaName = document.createElement('h3');
//                 pizzaName.textContent = item.name;
//                 itemContent.appendChild(pizzaName);
    
//                 const pizzaCategory = document.createElement('h4');
//                 pizzaCategory.textContent = item.category;
//                 itemContent.appendChild(pizzaCategory);
    
//                 const pizzaSize = document.createElement('h4');
//                 pizzaSize.textContent = item.size;
//                 itemContent.appendChild(pizzaSize);
    
//                 const pizzaPrice = document.createElement('h4');
//                 pizzaPrice.textContent = `$${item.price}`;
//                 itemContent.appendChild(pizzaPrice);

//             });

//         })
//         .catch(error => console.error('Error fetching menu data:', error));
// });

document.addEventListener("DOMContentLoaded", function() {
    const itemsPerPage = 9; // Number of items per page
    let currentPage = 1; // Current page
    let data = []; // Array to store fetched data

    const cardPizza = document.getElementById('card');
    const paginationContainer = document.getElementById('pagination');
    const searchInput = document.getElementById('input');

    const pizzaPreview = document.getElementById('pizza-preview');
    const popup = document.getElementById('popup-pizza');
    const preview = document.getElementById('preview');
    const closePopup = document.querySelector('.material-symbols-outlined');

    pizzaPreview.style.display = 'none';

    window.onload = function () {
        pizzaPreview.style.display = 'none';
    }

    // Function to display items for the current page
    function displayItems(pageNumber) {
        // Clear previous items
        cardPizza.innerHTML = "";

        // Calculate start and end indexes for the current page
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // Display items for the current page
        data.slice(startIndex, endIndex).forEach((item, index) => {

            let className;
            if (index % 9 === 0 || index % 9 === 5 || index % 9 === 7) {
                className = 'card-content card-pizza-1';
            } else if (index % 9 === 1 || index % 9 === 3 || index % 9 === 8) {
                className = 'card-content card-pizza-2';
            } else if (index % 9 === 2 || index % 9 === 4 || index % 9 === 6) {
                className = 'card-content card-pizza-3';
            }

            const cardContent = document.createElement('div');
            cardContent.className = className;
            cardPizza.appendChild(cardContent);

            const imgPizza = document.createElement('img');
            imgPizza.src = item.image;
            imgPizza.alt = item.name;
            cardContent.appendChild(imgPizza);

            const itemContent = document.createElement('span');
            cardContent.appendChild(itemContent);

            const pizzaName = document.createElement('h3');
            pizzaName.textContent = item.name;
            itemContent.appendChild(pizzaName);

            const pizzaCategory = document.createElement('h4');
            pizzaCategory.textContent = item.category;
            itemContent.appendChild(pizzaCategory);

            const pizzaSize = document.createElement('h4');
            pizzaSize.textContent = item.size;
            itemContent.appendChild(pizzaSize);

            const pizzaPrice = document.createElement('h4');
            pizzaPrice.textContent = `$${item.price}`;
            itemContent.appendChild(pizzaPrice);

            
            // Add click event listener to show pop-up
            cardContent.addEventListener('click', () => {

                preview.innerHTML= "";

                const previewImg = document.createElement('img');
                previewImg.src = item.image;
                preview.appendChild(previewImg);

                const previewName = document.createElement('h3')
                previewName.textContent = item.name;
                preview.appendChild(previewName);

                const previewIngredients = document.createElement('h4');
                previewIngredients.textContent = item.ingredients;
                preview.appendChild(previewIngredients);

                const previewCategory = document.createElement('h4');
                previewCategory.textContent = item.category;
                preview.appendChild(previewCategory);

                const previewSize = document.createElement('h4');
                previewSize.textContent = item.size;
                preview.appendChild(previewSize);

                const previewPrice = document.createElement('h4');
                previewPrice.className = 'popup-price';
                previewPrice.textContent = `$${item.price}`;
                preview.appendChild(previewPrice);

                pizzaPreview.style.display = 'flex';
            });
        });

    }

    // Function to generate pagination buttons with ellipsis
    function generatePaginationButtons(totalPages) {
        paginationContainer.innerHTML = "";

        // menambahkan tombol button
        function createButton(page) {
            const button = document.createElement('button');
            button.textContent = page;
            button.classList.add('number'); //Menambahkan kelas tanpa menghapus kelas yang ada sebelumnya. className = '' -> menghapus kelas sebelumnya
            if (page === currentPage) {
                button.classList.add('actives');
            }
            button.addEventListener('click', () => {
                currentPage = page;
                displayItems(currentPage);
                generatePaginationButtons(totalPages);
            });
            return button;
        }

        // Always show first three pages
        paginationContainer.appendChild(createButton(1));
        if (totalPages > 1) paginationContainer.appendChild(createButton(2));
        // if (totalPages > 2) paginationContainer.appendChild(createButton(3));

        if (currentPage > 3) {
            const textNode = document.createElement('button');
            textNode.className = 'dots';
            textNode.innerHTML = '...';
            paginationContainer.appendChild(textNode);
        }

        // Show the three pages around the current page if necessary

        if (currentPage > 2 && currentPage < totalPages - 2) {
            if (currentPage - 1 > 2) {
                paginationContainer.appendChild(createButton(currentPage - 1));
            }
            paginationContainer.appendChild(createButton(currentPage));
            if (currentPage + 1 < totalPages - 1) {
                paginationContainer.appendChild(createButton(currentPage + 1));
            }
        }

        if (currentPage >= totalPages - 2) {
            for (let i = totalPages - 3; i <= totalPages; i++) {
                if (i > 3) paginationContainer.appendChild(createButton(i));
            }
        } else {
            const textNode = document.createElement('button');
            textNode.className = 'dots';
            textNode.innerHTML = '...';
            paginationContainer.appendChild(textNode);
            
            paginationContainer.appendChild(createButton(totalPages - 1));
            paginationContainer.appendChild(createButton(totalPages));
        }

        //Asumsikan semua elemen dengan kelas 'number' dan 'dots'
        const clickButton = document.querySelectorAll('.number, .dots');
        
        function handleClickButton(event) {
            // Hapus kelas aktif dari semua elemen
            clickButton.forEach(button => button.classList.remove('actives'));

            // Tambahkan kelas aktif ke elemen yang diklik
            event.target.classList.add('actives')

            updatePagination();
        }

        // Tambahkan event listener ke semua tombol
        clickButton.forEach(button => {
            button.addEventListener('click', handleClickButton);
        });

    }


    function nextPage() {
        if (currentPage < Math.ceil(data.length / itemsPerPage)) {
            currentPage++;
            displayItems(currentPage);
            generatePaginationButtons(Math.ceil(data.length / itemsPerPage));
            updatePagination();
        }
    }

    function prevPage() {
        if (currentPage > 1) {
            currentPage--;
            displayItems(currentPage);
            generatePaginationButtons(Math.ceil(data.length / itemsPerPage));
            updatePagination();
        }
    }

    function updatePagination() {
        const nextBtn = document.querySelector('.next-button');
        const prevBtn = document.querySelector('.prev-button');

        if (currentPage === 1) {
          nextBtn.classList.add('first-last-page');
          prevBtn.classList.remove('first-last-page');
        } else if (currentPage === Math.ceil(data.length / itemsPerPage)) {
          prevBtn.classList.add('first-last-page');
          nextBtn.classList.remove('first-last-page');
        } else {
          prevBtn.classList.add('first-last-page');
          nextBtn.classList.add('first-last-page');
        }
      }

    function filterData(keyword){
        return data.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()));
    }

    function displayFilteredItems(pageNumber, keyword) {

        const filteredData = filterData(keyword);
        
        // Clear previous items
        cardPizza.innerHTML = "";

        // Calculate start and end indexes for the current page
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // Display items for the current page
        filteredData.slice(startIndex, endIndex).forEach((item, index) => {

            let className;
            if (index % 9 === 0 || index % 9 === 5 || index % 9 === 7) {
                className = 'card-content card-pizza-1';
            } else if (index % 9 === 1 || index % 9 === 3 || index % 9 === 8) {
                className = 'card-content card-pizza-2';
            } else if (index % 9 === 2 || index % 9 === 4 || index % 9 === 6) {
                className = 'card-content card-pizza-3';
            }

            const cardContent = document.createElement('div');
            cardContent.className = className;
            cardPizza.appendChild(cardContent);

            const imgPizza = document.createElement('img');
            imgPizza.src = item.image;
            imgPizza.alt = item.name;
            cardContent.appendChild(imgPizza);

            const itemContent = document.createElement('span');
            cardContent.appendChild(itemContent);

            const pizzaName = document.createElement('h3');
            pizzaName.textContent = item.name;
            itemContent.appendChild(pizzaName);

            const pizzaCategory = document.createElement('h4');
            pizzaCategory.textContent = item.category;
            itemContent.appendChild(pizzaCategory);

            const pizzaSize = document.createElement('h4');
            pizzaSize.textContent = item.size;
            itemContent.appendChild(pizzaSize);

            const pizzaPrice = document.createElement('h4');
            pizzaPrice.textContent = `$${item.price}`;
            itemContent.appendChild(pizzaPrice);


            // Add click event listener to show pop-up
            cardContent.addEventListener('click', () => {

                preview.innerHTML="";

                const previewImg = document.createElement('img');
                previewImg.src = item.image;
                preview.appendChild(previewImg);

                const previewName = document.createElement('h3')
                previewName.textContent = item.name;
                preview.appendChild(previewName);

                const previewIngredients = document.createElement('h4');
                previewIngredients.textContent = item.ingredients;
                preview.appendChild(previewIngredients);

                const previewCategory = document.createElement('h4');
                previewCategory.textContent = item.category;
                preview.appendChild(previewCategory);

                const previewSize = document.createElement('h4');
                previewSize.textContent = item.size;
                preview.appendChild(previewSize);

                const previewPrice = document.createElement('h4');
                previewPrice.className = 'popup-size';
                previewPrice.textContent = `$${item.price}`;
                preview.appendChild(previewPrice);

                pizzaPreview.style.display = 'flex';
            });
        });
    }

    function handleSearch(){
        const keyword = searchInput.value.trim(); // Get search keyword
        currentPage = 1; // reset current page to 1

        if(keyword === ''){
            displayItems(currentPage);
            const totalPages = Math.ceil(data.length / itemsPerPage);
            generatePaginationButtons(totalPages);
        } else {
            displayFilteredItems(currentPage, keyword); // display filtered items
            const totalPages = Math.ceil(filterData(keyword).length / itemsPerPage);
            generatePaginationButtons(totalPages); // Generate pagination buttons for filtered data
        }
    }

    // Add event listener for search input
    searchInput.addEventListener('keyup', handleSearch);


    // Fetch data
    fetch('../json/pizza.json')
    .then(response => response.json())
    .then((jsonData) => {
        data = jsonData; // Store fetched data
        const totalPages = Math.ceil(data.length / itemsPerPage); // Calculate total pages

        // Initial display
        displayItems(currentPage);
        generatePaginationButtons(totalPages);
        updatePagination();
    })
    .catch(error => console.error('Error fetching menu data:', error));

    document.getElementById('next-button').addEventListener('click', nextPage);
    document.getElementById('prev-button').addEventListener('click', prevPage);

    closePopup.addEventListener('click', () => {
        pizzaPreview.style.display = 'none';
    });

    pizzaPreview.addEventListener('click', (event) => {
        if (event.target === pizzaPreview) {
            pizzaPreview.style.display = 'none';
        }
    });
});

// function pagination() {
//     let thisPage = 1;
//     let limit = 9;
    
//     function loadPage() {
//         let sumPizza = document.querySelectorAll('.card-content');
//         let beginGet = limit * (thisPage - 1);
//         let endGet = limit * thisPage - 1;
//         sumPizza.forEach((item, key) => {
//             if(key >= beginGet && key <= endGet){
//                 item.style.display = 'block';
//             } else {
//                 item.style.display = 'none';
//             }
//         })
//         listPage();
//     }
//     loadPage();

//     function listPage(){
//         let sumPizza = document.querySelectorAll('.card-content');
//         let count = Math.ceil(sumPizza.length / limit);
//         let pagination = document.querySelector('.pagination');
//         pagination.innerHTML = '';

//         if(thisPage != 1) {
//             let prev = document.createElement('li');
//             prev.innerText = 'Prev';
//             prev.onclick = function() {
//                 changePage(thisPage - 1);
//             };
//             // prev.setAttribute('onclick', "changePage(" + (thisPage - 1) + ")");
//             pagination.appendChild(prev);
//         }

//         for(let i = 1; i <= count; i++) {
//             let newPage = document.createElement('li')
//             newPage.innerText = i;

//             if(i == thisPage){
//                 newPage.classList.add('actives');
//             }

            
//             newPage.onclick = function() {
//                 changePage(i);
//             };
//             // newPage.setAttribute('onclick', "changePage(" + i + ")");
//             pagination.appendChild(newPage);
//         }

//         if(thisPage != count){
//             let next = document.createElement('li');
//             next.innerText = 'Next';
//             next.onclick = function() {
//                 changePage(thisPage + 1);
//             };
//             // next.setAttribute('onclick', "changePage(" + (thisPage + 1) + ")");
//             pagination.appendChild(next);
//         }
//     }

//     function changePage(i){
//         thisPage = i;
//         loadPage();
//     }
// }



// function getPageList(totalPages, page, maxLength) {
//             function range(start, end) {
//                 return Array.from(Array(end - start + 1), (_, i) => i + start);
//             }

//             var sideWidth = maxLength < 9 ? 1 : 2;
//             var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
//             var rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;

//             if (totalPages <= maxLength) {
//                 return range(1, totalPages);
//             }

//             if (page <= maxLength - sideWidth - 1 - rightWidth) {
//                 return range(1, maxLength - sideWidth - 1).concat(0, range(totalPages - sideWidth + 1, totalPages));
//             }

//             if (page >= totalPages - sideWidth - 1 - rightWidth) {
//                 return range(1, sideWidth).concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages));
//             }

//             return range(1, sideWidth).concat(0, range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1, totalPages));
// }

// function updatePagination(totalPages, currentPage, paginationSize) {
//     $(".pagination").empty().append(
//         $("<li>").addClass("page-item prev-page").append($("<a>").addClass("page-link").attr({ href: "javascript:void(0)" }).text("Prev")),
//         $("<li>").addClass("page-item next-page").append($("<a>").addClass("page-link").attr({ href: "javascript:void(0)" }).text("Next"))
//     );

//     getPageList(totalPages, currentPage, paginationSize).forEach(item => {
//         $("<li>").addClass("page-item").addClass(item ? "current-page" : "dots")
//         .toggleClass("actives", item === currentPage).append($("<a>").addClass("page-link")
//         .attr({ href: "javascript:void(0)" }).text(item || "...")).insertBefore(".next-page");
//     });

//     $(".prev-page").toggleClass("disable", currentPage === 1);
//     $(".next-page").toggleClass("disable", currentPage === totalPages);
// }

// function showPage(whichPage, items, limitPage) {
//             if (whichPage < 1 || whichPage > Math.ceil(items.length / limitPage)) return false;

//             var start = (whichPage - 1) * limitPage;
//             var end = whichPage * limitPage;

//             items.hide().slice(start, end).show();
//             return true;
// }

// function updateContent() {
//             var searchBox = $("#search-box").val().toUpperCase();
//             var allItems = $("#card .card-content");
//             var filteredItems = allItems.filter(function () {
//                 return $(this).find("h2").text().toUpperCase().indexOf(searchBox) > -1;
//             });

//             var limitPage = 9;
//             var paginationSize = 7;
//             var totalPages = Math.ceil(filteredItems.length / limitPage);
//             var currentPage = 1;

//             if (totalPages > 0) {
//                 showPage(currentPage, filteredItems, limitPage);
//                 updatePagination(totalPages, currentPage, paginationSize);
//             } else {
//                 $(".card .card-content").hide();
//                 $(".pagination").empty();
//             }

//             $(document).on("click", ".pagination li.current-page:not(.actives)", function () {
//                 currentPage = +$(this).text();
//                 showPage(currentPage, filteredItems, limitPage);
//                 updatePagination(totalPages, currentPage, paginationSize);
//             });

//             $(".next-page").on("click", function () {
//                 if (currentPage < totalPages) {
//                     currentPage++;
//                     showPage(currentPage, filteredItems, limitPage);
//                     updatePagination(totalPages, currentPage, paginationSize);
//                 }
//             });

//             $(".prev-page").on("click", function () {
//                 if (currentPage > 1) {
//                     currentPage--;
//                     showPage(currentPage, filteredItems, limitPage);
//                     updatePagination(totalPages, currentPage, paginationSize);
//                 }
//             });
// }

// $(function () {
//             $("#search-box").on("input", updateContent);
//             updateContent();
// });
