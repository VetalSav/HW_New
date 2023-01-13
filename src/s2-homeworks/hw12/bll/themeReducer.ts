const initState = {
    themeId: 1,
}
export type themeReducerType = {
    themeId: any
}
export const themeReducer = (state:themeReducerType = initState, action: changeThemeIdType): any => { // fix any
    switch (action.type) {
        case "SET_THEME_ID":{
            return {...state,themeId:action.id.toString()}
        }
        // дописать

        default:
            return state
    }
}
export type changeThemeIdType = ReturnType<typeof changeThemeId>
export const changeThemeId = (id: string)=> ({ type: 'SET_THEME_ID', id }) // fix any
