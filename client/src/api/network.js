import http from "./http";

export const network = {
  all() {
    let url = buildNetworkUrl();

    return http.get(url);
  },
  get(networkId) {
    let url = buildNetworkUrl(networkId);

    return http.get(url);
  },
  save(networkToSave) {
    if (networkToSave && networkToSave.id) {
      const networkUrl = buildNetworkUrl(networkToSave.id);
      console.log("update current elemet");
      return http.put(networkUrl, networkToSave);
    }

    const networkUrl = buildNetworkUrl();
    console.log("save new elemnt");
    return http.post(networkUrl, networkToSave);
  },
  delete(networkId) {
    const deleteNetworkUrl = buildNetworkUrl(networkId);

    return http.delete(deleteNetworkUrl);
  }
};

/**
 *
 * @returns {string|*}
 * @param networkId
 */
function buildNetworkUrl(networkId) {
  let url = "api/network";
  url += networkId ? `/${networkId}` : "";

  return url;
}
