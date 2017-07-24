export const loadState = () => {
    try{
        const serializedState = localStorage.getItem('state')
        if(serializedState === null ){
            return undefined
        }
        return JSON.parse(serializedState)
    } catch (err){
        return undefined
    }
}
export const saveState = (state) => {
    try {
        const serializedSate = JSON.stringify(state)
        localStorage.setItem('state',serializedSate)
    } catch (err) {
        console.log("Error save to browser storage ",err)
    }
}
