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
        
        
        cardPizza.innerHTML = "";

        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

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
        const keyword = searchInput.value.trim();
        currentPage = 1;

        if(keyword === ''){
            displayItems(currentPage);
            const totalPages = Math.ceil(data.length / itemsPerPage);
            generatePaginationButtons(totalPages);
        } else {
            displayFilteredItems(currentPage, keyword);
            const totalPages = Math.ceil(filterData(keyword).length / itemsPerPage);
            generatePaginationButtons(totalPages);
        }
    }

    searchInput.addEventListener('keyup', handleSearch);



    fetch('../json/pizza.json')
    .then(response => response.json())
    .then((jsonData) => {
        data = jsonData; 
        const totalPages = Math.ceil(data.length / itemsPerPage); 

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