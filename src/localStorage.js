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
        //Only intrested in presisting setting state.
        if(state.setting){
        try {
            const setting = {setting: state.setting} 
            const serializedSate = JSON.stringify(setting)
            localStorage.setItem('state',serializedSate)
        } catch (err) {
            console.log("Error, unable to save to browser storage ",err)
        }
    }
}
