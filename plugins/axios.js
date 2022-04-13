export default function ({ $axios, $config }) {
    $axios.setBaseURL($config.API_URL)

}
