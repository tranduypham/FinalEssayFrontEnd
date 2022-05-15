import { GenRandomString } from "../../Axios"

export const Client_Request_Rand_String_For_Pre_Master_Secret = async () => {
    return await GenRandomString(20)
                .then(res => {
                    return res.data
                }).catch(err => {
                    throw Error("Can not return a Random String");
                    return null;
                })
}