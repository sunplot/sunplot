import axios from 'axios'

export function sqlCommand(query){
    return function(dispatch){
        const url = "http://localhost:9191/solr/films/sql?stmt="+query
        axios.get(url).then((response)=>{
            let data = response.data
            if(data['result-set']!== undefined){
                data.docs = data['result-set'].docs
                data.docs.pop()
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
        axios.get(url).then((response)=>{
            let data = response.data
            if(data['result-set']!== undefined){
                data.docs = data['result-set'].docs
                data.docs.pop()
            }
            response.data.url = url
            dispatch({type: "EXECUTE_QUERY", payload : data})
        }).catch(error => {
            console.log(error.message)
            dispatch({ type: "EXECUTE_QUERY_ERROR", payload: error.message })
        });
    }
}
