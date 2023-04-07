import axios from "axios";

const ApiManager = axios.create(
    {
        baseURL:"https://witty-dragon-98.loca.lt/login",
        responseType:"json",
        withCredentials:"true",
    }
)
export default ApiManager