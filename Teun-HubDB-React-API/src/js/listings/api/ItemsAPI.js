class ItemsAPI {
  static all(state) {
    let url = this.getUrl(state);

    return fetch(url, {
      credentials: 'same-origin',
    }).then(this.handleStatus);
  }

  static handleStatus(response) {
    if (!response.ok) {
      // Fetch doesn't reject on HTTP error status
      throw Error(`Request rejected with status ${response.status}`);
    }
    return response;
  }

  static getUrl(params) {
    const { tableId, portalId, count, searchText, after, currentTypes, currentAreas, minPrice, maxPrice, order } = params;

    const encodeTypes = currentTypes.length > 0 ? encodeURIComponent(currentTypes) : '';
    const filterTypes = currentTypes.length > 0 ? `&type__in=${encodeTypes}` : '';

    const encodeAreas = currentAreas.length > 0 ? encodeURIComponent(currentAreas) : '';
    const filterAreas = currentAreas.length > 0 ? `&area__in=${encodeAreas}` : '';

    const filterMinPrice = minPrice > 0 ? `&price__gte=${minPrice}` : '';
    const filterMaxPrice = maxPrice > 0 ? `&price__lte=${maxPrice}` : '';

    const search = searchText ? `&name__icontains=${searchText}` : '';
    const afterParam = after !== '' ? `&after=${after}` : '';

    const orderParam = order !== '' ? (order === 'random' ? `&sort=random()` : `&sort=${order}`) : '';

    return `https://api.hubapi.com/cms/v3/hubdb/tables/${tableId}/rows?portalId=${portalId}&limit=${count}${search}${afterParam}${filterTypes}${filterAreas}${filterMinPrice}${filterMaxPrice}${orderParam}`;
  }
}

export default ItemsAPI;
