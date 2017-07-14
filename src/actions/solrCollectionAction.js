export function getSolr(){
    return {type:"GET_SOLR_COLLECTIONS"
            payload:{name:"local solr", url:"http://localhost:8983"}
    }
}

export function setSolrName(name){
    return {
        type:"SET_NAME",
        payload: name
    }
}

export function setSolrURL(url){
    return {
        type:"SET_URL",
        payload: name
    }
}
