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
        let data = {}
        data.url = url
        return axios.get(url).then((response)=>{
            console.log('we got results')
            if(response.data['result-set']){
                data.docs = response.data['result-set'].docs
                const info = data.docs.pop()
                data.responsetime = info['RESPONSE_TIME']
            }
            dispatch({type: "EXECUTE_QUERY", payload : data})
        })
        .catch(error => {
            data.error = error.message
            dispatch({ type: "EXECUTE_QUERY_ERROR", payload: data })
        });
    }
}
export function sqlCommand(query,setting){
    return function(dispatch){
        const url = buildQuery(query,setting,false)

    }
}
