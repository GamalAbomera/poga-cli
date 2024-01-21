import axios from "@/common/HTTPClient";
const DEFAULT_API_VERSION = import.meta.env.VITE_DEFAULT_API_VERSION;

class ApiClient {
  constructor(resource, options = {}) {
    this.apiVersion = `api/${options.apiVersion || DEFAULT_API_VERSION}`;
    this.options = options;
    this.resource = resource;
  }

  get url() {
    return `${import.meta.env.VITE_URL}/${this.apiVersion}/${this.resource}`;
  }

  get(options = {}, resource = "") {
    const handledResource = resource && `/${resource}`;
    return axios.get(`${this.url}${handledResource}`, options);
  }

  show(id) {
    return axios.get(`${this.url}/${id}`);
  }

  create(options = {}, resource = "") {
    const handledResource = resource && `/${resource}`;
    return axios.post(`${this.url}${handledResource}`, options);
  }

  update(id, data) {
    return axios.patch(`${this.url}/${id}`, data);
  }

  delete(id, resource = "") {
    const handledResource = resource && `/${resource}`;
    return axios.delete(`${this.url}${handledResource}/${id}`);
  }
}

export default ApiClient;
