import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterChange( _ , action){ return action.payload },
    }
})

// export const filterChange = filter => {
//     return {
//         type: 'FILTER',
//         payload: filter
//     }
// }

// const filterReducer = (state = '', action) => {
//     console.log('state in filter reducer: ', state)
//     switch(action.type){
//         case 'FILTER':
//             return action.payload
//         default:
//             return state
//     }
// }

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer