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

function showPage(whichPage, items, limitPage) {
            if (whichPage < 1 || whichPage > Math.ceil(items.length / limitPage)) return false;

            var start = (whichPage - 1) * limitPage;
            var end = whichPage * limitPage;

            items.hide().slice(start, end).show();
            return true;
}

function updateContent() {
            var searchBox = $("#search-box").val().toUpperCase();
            var allItems = $("#card .card-content");
            var filteredItems = allItems.filter(function () {
                return $(this).find("h2").text().toUpperCase().indexOf(searchBox) > -1;
            });

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
