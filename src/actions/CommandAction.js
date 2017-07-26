import axios from 'axios'
export const EXECUTE_QUERY = "EXECUTE_QUERY"
export const EXECUTE_QUERY_ERROR = "EXECUTE_QUERY_ERROR"
export const QUERY_RECEIVED = "QUERY_RECEIVED"

function buildQuery(query,setting, isStreaming){
    const host = setting.host
    const port = setting.port
    const collection = setting.collection
    const stmt = isStreaming? "/stream?expr=": "/sql?stmt="
    return host + ":" + port + "/solr/" + collection + stmt + query
}
const isSql = (query) => {
    if(query.startsWith('select') && !query.startsWith('select(')){
        return true
    }
    return false
}

export function getQuery(payload){
    return {
        type : EXECUTE_QUERY,
        payload
    }
}

export function executeCommand(query, setting){
    return function(dispatch){
        let data = {}
        data.docs = []
        dispatch(getQuery(data))
        if(query.startsWith("//")){
            return
        }
        const url = isSql(query) ? buildQuery(query,setting,false)
        : buildQuery(query,setting,true)
        data.url = url

        return axios.get("/query",{params:{data:url}}).then((response)=>{
            console.log('we got results')
            if(response.data['result-set']){
                data.docs = response.data['result-set'].docs
                if(data.docs.length === 1){
                    if(data.docs[0].EXCEPTION){
                        data.error = data.docs[0].EXCEPTION
                        data.responsetime = data.docs[0]['RESPONSE_TIME']
                        dispatch({ type: EXECUTE_QUERY_ERROR, payload: data })
                    }
                } else {
                    const info = data.docs.pop()
                    data.responsetime = info['RESPONSE_TIME']
                }
            }
            dispatch({type: QUERY_RECEIVED, payload : data})
        })
        .catch(error => {
            data.error = error.message
            dispatch({ type: EXECUTE_QUERY_ERROR, payload: data })
        });
    }
}
