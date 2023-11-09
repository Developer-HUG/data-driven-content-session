class TableAPI {
  static all(tableId, portalId) {
    let url = `https://api.hubapi.com/cms/v3/hubdb/tables/${tableId}?portalId=${portalId}`;

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
}

export default TableAPI;
