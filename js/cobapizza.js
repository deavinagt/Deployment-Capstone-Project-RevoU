// Pagination
function getPageList(totalPages, page, maxLength) {
    function range(start, end) {
        return Array.from(Array(end - start + 1), (_, i) => i + start);
    }

    var sideWidth = maxLength < 9 ? 1 : 2;
    var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
    var rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;

    if (totalPages <= maxLength) {
        return range(1, totalPages);
    }

    if (page <= maxLength - sideWidth - 1 - rightWidth) {
        return range(1, maxLength - sideWidth - 1).concat(0, range(totalPages - sideWidth + 1, totalPages));
    }

    if (page >= totalPages - sideWidth - 1 - rightWidth) {
        return range(1, sideWidth).concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages));
    }

    return range(1, sideWidth).concat(0, range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1, totalPages));
}

//mengatur dan memperbarui elemen paginasi berdasarkan total halaman, halaman saat ini, dan ukuran paginasi
function updatePagination(totalPages, currentPage, paginationSize) {
    $(".pagination").empty().append(
        $("<li>").addClass("page-item prev-page").append($("<a>").addClass("page-link").attr({ href: "javascript:void(0)" }).text("Prev")),
        $("<li>").addClass("page-item next-page").append($("<a>").addClass("page-link").attr({ href: "javascript:void(0)" }).text("Next"))
    );
    //$(".pagination").empty() -> Menghapus semua elemen dalam kontainer paginasi dengan kelas .pagination
    // .append($("<li>").addClass dll) -> Menambahkan elemen <li> untuk tombol "Prev" dan "Next"

    getPageList(totalPages, currentPage, paginationSize).forEach(item => {
        $("<li>").addClass("page-item").addClass(item ? "current-page" : "dots")
            .toggleClass("actives", item === currentPage).append($("<a>").addClass("page-link")
                .attr({ href: "javascript:void(0)" }).text(item || "...")).insertBefore(".next-page");
    }); 
    //Menggunakan fungsi getPageList untuk mendapatkan daftar halaman yang akan ditampilkan.

    $(".prev-page").toggleClass("disable", currentPage === 1);
    $(".next-page").toggleClass("disable", currentPage === totalPages);
    // menambahkan atau menghapus prev dan next ketika ada di ujunh halaman
}

function showPage(whichPage, items, limitPage) {
    if (whichPage < 1 || whichPage > Math.ceil(items.length / limitPage)) return false;

    // menghitung rentang item yang akan ditampilkan
    var start = (whichPage - 1) * limitPage; //menentukan indeks awal dari item yang akan ditampilkan pada halaman yang dipilih.
    var end = whichPage * limitPage; // menentukan indeks akhir dari item yang akan ditampilkan pada halaman yang dipilih.

    items.hide().slice(start, end).show(); // menyembunyikan item (.hide()) kemudian menampilkan item dalam rentang start - end
    return true;
}

function updateContent() {
    var searchBox = $("search-box").val().toUpperCase(); // mengambil nilai dari kotak pencarian
    var allItems = $(".card .card-content"); // mengambil semua elemen dengan kelas card-content yang berada dalam elemen dengan class card
    var filteredItems = allItems.filter(function () {
        return $(this).find("h2").text().toUpperCase().indexOf(searchBox) > -1;
    }); // menyaring item berdasarkan input pencarian

    var limitPage = 9;
    var paginationSize = 7;
    var totalPages = Math.ceil(filteredItems.length / limitPage);
    var currentPage = 1;

    if (totalPages > 0) {
        showPage(currentPage, filteredItems, limitPage);
        updatePagination(totalPages, currentPage, paginationSize);
    } else {
        $(".card .card-content").hide();
        $(".pagination").empty();
    }

    $(document).on("click", ".pagination li.current-page:not(.actives)", function () {
        currentPage = +$(this).text();
        showPage(currentPage, filteredItems, limitPage);
        updatePagination(totalPages, currentPage, paginationSize);
    });

    $(".next-page").on("click", function () {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage, filteredItems, limitPage);
            updatePagination(totalPages, currentPage, paginationSize);
        }
    });

    $(".prev-page").on("click", function () {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage, filteredItems, limitPage);
            updatePagination(totalPages, currentPage, paginationSize);
        }
    });
}

$(function () {
    $("#search-box").on("input", updateContent);
    updateContent();
});

// pt2
function getPageList(totalPages, page, maxLength){
    function range(start, end){
        return Array.from(Array(end - start + 1), (_, i) => i + start);
    } // digunakan untuk membuat array dari start sampai end

    var sideWidth = maxLength < 9 ? 1 : 2; //operator tenary -> condition ? valueIfTrue : valueIfFalse
    // tampilan 1 -> [1, 2, 3, ..., 10, 11, 12]
    // tampilan 2 -> [1,2, ..., 4, 5, 6, ..., 9, 10]
    var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
    var rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;
    // operator bitwise (>> 1) -> membagi hasil sebelumnya dengan 2 dan mengambil bagian integer dari hasil pembagian tersebut

    if(totalPages <= maxLength){
        return range(1, totalPages);
    } // jika totalPages <= maxLength -> tidak muncul (...) nya
    
    if(page <= maxLength - sideWidth - 1 - rightWidth){
        return range(1, maxLength - sideWidth -1).concat(0, range(totalPages - sideWidth + 1, totalPages));
    } //menambah (...) sebagai penanda ada halaman yang terlewati
    
    if(page >= totalPages - sideWidth - 1 - rightWidth){
        return range(1, sideWidth).concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages));
    }

    return range(1, sideWidth).concat(0, range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1, totalPages)); //(...) di dua sisi
}

$(function(){
    var numberOfItems = $(".card .card-content").length; // mencari semua elemen dalam dokumen HTML yang memiliki kelas card dan berada di dalam elemen dengan kelas card-content
    var limitPage = 9;
    var totalPages = Math.ceil(numberOfItems / limitPage);
    var paginationSize = 7;
    var currentPage;

    function showPage(whichPage){
        // Memeriksa apakah nomor dalam halaman yang diminta valid
        if(whichPage < 1 || whichPage > totalPages) return false;

        // Mengatur halaman saat ini ke nomor halaman yang diminta
        currentPage = whichPage;

        // Menyembunyikan semua item dan hanya menampilkan item untuk halaman saat ini
        $(".card .card-content").hide().slice((currentPage - 1) * limitPage, currentPage * limitPage).show();

        // Menghapus elemen pagination saat ini kecuali yang pertama dan terakhir
        $(".pagination li").slice(1, -1).remove();

        // Menambahkan elemen pagination baru berdasarkan halaman saat ini
        getPageList(totalPages, currentPage, paginationSize).forEach(item => {
            $("<li>").addClass("page-item").addClass(item ? "current-page" : "dots")
            .toggleClass("actives", item === currentPage).append($("<a>").addClass("page-link")
            .attr({href: "javascript:void(0)"}).text(item || "...")).insertBefore(".next-page");
        });

        // Mengaktifkan/menonaktifkan tombol halaman sebelumnya berdasarkan halaman saat ini
        $(".prev-page").toggleClass("disable", currentPage === 1);
        $(".next-page").toggleClass("disable", currentPage === totalPages);
        return true;
    }

    // Membuat prev dan next
    $(".pagination").append(
        $("<li>").addClass("page-item").addClass("prev-page").append($("<a>").addClass("page-link").attr({href: "javascript:void(0)"}).text("Prev")),
        $("<li>").addClass("page-item").addClass("next-page").append($("<a>").addClass("page-link").attr({href: "javascript:void(0)"}).text("Next")),
    );

    $(".card").show();
    showPage(1);

    $(document).on("click", ".pagination li.current-page:not(.actives)", function(){
        return showPage(+$(this).text());
    });

    $(".next-page").on("click", function(){
        return showPage(currentPage + 1);
    });

    $(".prev-page").on("click", function(){
        return showPage(currentPage - 1);
    });

});




//Search

const search = () => {
    const searchBox = document.getElementById("search-box").value.toUpperCase();
    const listPizza = document.getElementById("card")
    const menuPizza = document.querySelectorAll(".card-content")
    const namePizza = document.getElementsByTagName("h2")

    if (searchBox === '') {
        menuPizza.forEach(pizza => {
            pizza.style.display = "";
        });
        return;
    }

    for(let i=0; i < namePizza.length; i++){
        let textValue = namePizza[i].textContent || namePizza[i].innerHTML;

        if(textValue.toUpperCase().indexOf(searchBox) > -1){
            menuPizza[i].style.display = "";
        } else{
            menuPizza[i].style.display = "none";
        }
    }

    document.getElementById("search-box").addEventListener("input", search);
}

// pt3
$(function () {
    var numberOfItems = $(".card .card-content").length;
    var limitPage = 9;
    var totalPages = Math.ceil(numberOfItems / limitPage);
    var paginationSize = 7;
    var currentPage = 1;

    function getPageList(totalPages, page, maxLength) {
        function range(start, end) {
            return Array.from(Array(end - start + 1), (_, i) => i + start);
        }

        var sideWidth = maxLength < 9 ? 1 : 2;
        var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
        var rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;

        if (totalPages <= maxLength) {
            return range(1, totalPages);
        }

        if (page <= maxLength - sideWidth - 1 - rightWidth) {
            return range(1, maxLength - sideWidth - 1).concat(0, range(totalPages - sideWidth + 1, totalPages));
        }

        if (page >= totalPages - sideWidth - 1 - rightWidth) {
            return range(1, sideWidth).concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages));
        }

        return range(1, sideWidth).concat(0, range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1, totalPages));
    }

    function showPage(whichPage, items) {
        if (whichPage < 1 || whichPage > Math.ceil(items.length / limitPage)) return false;

        var start = (whichPage - 1) * limitPage;
        var end = whichPage * limitPage;

        items.hide().slice(start, end).show();

        $(".pagination li").slice(1, -1).remove();

        getPageList(Math.ceil(items.length / limitPage), whichPage, paginationSize).forEach(item => {
            $("<li>").addClass("page-item").addClass(item ? "current-page" : "dots")
                .toggleClass("actives", item === whichPage).append($("<a>").addClass("page-link")
                    .attr({ href: "javascript:void(0)" }).text(item || "...")).insertBefore(".next-page");
        });

        $(".prev-page").toggleClass("disable", whichPage === 1);
        $(".next-page").toggleClass("disable", whichPage === Math.ceil(items.length / limitPage));
        return true;
    }

    function updatePagination(totalPages, currentPage, paginationSize) {
        $(".pagination").empty().append(
            $("<li>").addClass("page-item prev-page").append($("<a>").addClass("page-link").attr({ href: "javascript:void(0)" }).text("Prev")),
            $("<li>").addClass("page-item next-page").append($("<a>").addClass("page-link").attr({ href: "javascript:void(0)" }).text("Next"))
        );

        getPageList(totalPages, currentPage, paginationSize).forEach(item => {
            $("<li>").addClass("page-item").addClass(item ? "current-page" : "dots")
                .toggleClass("actives", item === currentPage).append($("<a>").addClass("page-link")
                    .attr({ href: "javascript:void(0)" }).text(item || "...")).insertBefore(".next-page");
        });

        $(".prev-page").toggleClass("disable", currentPage === 1);
        $(".next-page").toggleClass("disable", currentPage === totalPages);
    }

    function updateContent() {
        var searchBox = $("#search-box").val().toUpperCase();
        var allItems = $(".card .card-content");
        var filteredItems = allItems.filter(function () {
            return $(this).find("h2").text().toUpperCase().indexOf(searchBox) > -1;
        });

        var totalPages = Math.ceil(filteredItems.length / limitPage);
        var currentPage = 1;

        if (totalPages > 0) {
            showPage(currentPage, filteredItems);
            updatePagination(totalPages, currentPage, paginationSize);
        } else {
            allItems.hide();
            $(".pagination").empty();
        }
    }

    $(".pagination").append(
        $("<li>").addClass("page-item").addClass("prev-page").append($("<a>").addClass("page-link").attr({ href: "javascript:void(0)" }).text("Prev")),
        $("<li>").addClass("page-item").addClass("next-page").append($("<a>").addClass("page-link").attr({ href: "javascript:void(0)" }).text("Next"))
    );

    $(".card").show();
    updateContent();

    $(document).on("click", ".pagination li.current-page:not(.actives)", function () {
        var page = +$(this).text();
        showPage(page, $(".card .card-content:visible"));
    });

    $(".next-page").on("click", function () {
        var nextPage = currentPage + 1;
        showPage(nextPage, $(".card .card-content:visible"));
    });

    $(".prev-page").on("click", function () {
        var prevPage = currentPage - 1;
        showPage(prevPage, $(".card .card-content:visible"));
    });

    $("#search-box").on("input", updateContent);
});
