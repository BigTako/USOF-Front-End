export function optionizeQuery(query, options) {
  if (!options || !Object.keys(options).length) return query;

  let newQuery = query + '/?';
  if (options.sort) {
    newQuery += `sort=${options.sort}&`;
  }
  if (options.order) {
    newQuery += `order=${options.order}&`;
  }
  if (options.limit) {
    newQuery += `limit=${options.limit}&`;
  }
  if (options.page) {
    newQuery += `page=${options.page}&`;
  }

  if (options.fields) {
    // create options fields from all the falsy values
    const clearFields = Object.entries(options.fields).reduce(
      (acc, [key, value]) => {
        if (value && !(Array.isArray(value) && value.length === 0)) {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );

    // make query from clear options
    const fields = Object.keys(clearFields)
      .map((field) => `${field}=${clearFields[field]}`)
      .join('&');
    if (fields) {
      newQuery += fields;
    }
  }

  return newQuery;
}

export function formatNumber(num) {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + 'b';
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + 'm';
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + 'k';
  }
  return num.toString();
}
