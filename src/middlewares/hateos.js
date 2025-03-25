export default (req, res, next) => {
  res.hateos_item = (data) => {
    return {
      ...data._doc,
      _links: [
        { rel: "self", href: req.originalUrl, method: req.method },
        { rel: "list", href: req.baseUrl, method: "GET" },
        { rel: "update", href: `${req.baseUrl}/${req.params._id}`, method: "PUT" },
        { rel: "delete", href: `${req.baseUrl}/${req.params._id}`, method: "DELETE" },
      ],
    }
  }

  res.hateos_list = (name, data, totalPages) => {
    const page = parseInt(req.query._page);
    const sortField = req.query._sort || "name";

    return {
      [name]: data.map((item) => ({
        ...item._doc,
        _links: [
          { rel: "self", href: `${req.baseUrl}/${item._id}`, method: "GET" },
        ],
      })),
      _page: {
        current: page,
        total: totalPages,
        size: data.length,
      },
      _links: [
        { rel: "self", href: req.baseUrl, method: "GET" },
        { rel: "create", href: req.baseUrl, method: "POST" },
        { rel: "previous", href: page > 1 ? `${req.baseUrl}?_page=${page - 1}` : null, method: "GET" },
        { rel: "next", href: page < totalPages ? `${req.baseUrl}?_page=${page + 1}` : null, method: "GET" },
        { rel: "sort_asc", href: `${req.baseUrl}?_sort=${sortField}&_order=asc`, method: "GET" },
        { rel: "sort_desc", href: `${req.baseUrl}?_sort=${sortField}&_order=desc`, method: "GET" },
      ],
    }
  }
  next();
}