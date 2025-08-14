import axios from "axios";

export default async function checkIsResourceAlive(call: any, callback: any) {
    const url = call.request.url;
    try {
        const res = await axios.get(url);
        callback(null, {status: String(res.status)});
    } catch (e: any) {
        callback(null, {status: "error"});
    }
}
