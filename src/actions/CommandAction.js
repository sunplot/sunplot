import axios from 'axios'

function buildQuery(query,setting, isStreaming){
    const host = setting.host
    const port = setting.port
    const collection = setting.collection
    const stmt = isStreaming? "/stream?expr=": "/sql?stmt="
    return host + ":" + port + "/solr/" + collection + stmt + query
}
export function executeCommand(query, setting){
    return function(dispatch){
        const url = query.startsWith("select") ? buildQuery(query,setting,false)
        : buildQuery(query,setting,true)
        axios.get(url).then((response)=>{
            let data = response.data
            if(data['result-set']){
                data.docs = data['result-set'].docs
                const info = data.docs.pop()
                data.responsetime = info['RESPONSE_TIME']
            }
            data.url = url
            dispatch({type: "EXECUTE_QUERY", payload : data})
        }).catch(error => {
            dispatch({ type: "EXECUTE_QUERY_ERROR", payload: error.message })
        });
    }
}
export function sqlCommand(query,setting){
    return function(dispatch){
        const url = buildQuery(query,setting,false)

    }
}
