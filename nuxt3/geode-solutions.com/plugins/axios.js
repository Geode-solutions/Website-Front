export default function ({ $axios, $config, store }) {
    $axios.setBaseURL($config.API_URL)

    $axios.onRequest(config => {
        store.commit("startRequest")
    })
    $axios.onResponse(response => {
        store.commit("stopRequest")
    })
    $axios.onError(error => {
        store.commit("stopRequest")
    })
}
