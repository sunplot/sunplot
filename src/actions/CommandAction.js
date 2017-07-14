import axios from 'axios'

export function sqlCommand(query){
    return function(dispatch){
        const url = "http://localhost:9191/solr/films/sql?stmt="+query
        console.log(url)
        axios.get(url).then((response)=>{
            dispatch({type: "EXECUTE_QUERY", payload : response.data})
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
                let docs = data['result-set'].docs
                docs.pop()
            }
            dispatch({type: "EXECUTE_QUERY", payload : response.data})
        }).catch(error => {
            console.log(error.message)
            dispatch({ type: "EXECUTE_QUERY_ERROR", payload: error.message })
        });
    }
}
