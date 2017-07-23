import axios from 'axios'

export function sqlCommand(query){
    return function(dispatch){
        const url = "http://localhost:9191/solr/films/sql?stmt="+query
        fetch(url).then((response)=>{
            let data = response.data
            if(data['result-set']!== undefined){
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
export function streamingCommand(query){
    return function(dispatch){
        const url = "http://localhost:9191/solr/films/stream?expr="+query
        fetch(url).then((response)=>{
            let data = response.data
            if(data['result-set']){
                data.docs = data['result-set'].docs
                const info = data.docs.pop()
                if(data.docs.length < 2){
                    data = info
                }else{
                    data.responseTime = info['RESPONSE_TIME']
                }

            }
            response.data.url = url
            dispatch({type: "EXECUTE_QUERY", payload : data})
        }).catch(error => {
            console.log(error.message)
            dispatch({ type: "EXECUTE_QUERY_ERROR", payload: error.message })
        });
    }
}
