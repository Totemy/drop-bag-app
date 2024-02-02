export const paginationService = {
    paginate(items, currentPage, itemsPerPage) {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return items.slice(startIndex, endIndex);
    },
    getTotalPages(items, itemsPerPage) {
        return Math.ceil(items.length / itemsPerPage);
    }
};
