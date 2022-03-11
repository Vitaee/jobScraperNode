const paginator = (items, page, per_page = 10) => {
    let item = items.datas;

    item ? "" : (item = items);

    var page = page || 1,
        per_page = per_page || 10,
        offset = (page - 1) * per_page,
        paginatedItems = item.slice(offset).slice(0, per_page),
        total_pages = Math.ceil(item.length / per_page);
    return {
        page: page,
        per_page: per_page,
        pre_page: page - 1 ? page - 1 : null,
        next_page: total_pages > page ? parseInt(page) + 1 : null,
        total: item.length,
        total_pages: total_pages,
        data: paginatedItems
    };
};

export default paginator;
