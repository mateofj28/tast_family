import axios from 'axios'
axios.defaults.baseURL = "http://localhost:9230/api"


export class TastService {

    async getTast(){
        return await axios.get("/tasts")
    }

    async postTast(tast){
        return await axios.post("/tast/create", tast)
    }

    async putTast(id, tast){
        return await axios.put(`/tast/${id}`, tast)
    }

    async removeTast(id){
        return await axios.delete(`/tast/${id}`)
    }

    async sigin(data){
        return await axios.post("/user/sigin", data)
    }

    
}