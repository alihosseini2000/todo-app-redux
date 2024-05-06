import { produce } from "immer";

export const StatusFilters = {
  All: "all",
  Active: "active",
  Completed: "completed",
};

const initState = {
  status: StatusFilters.All,
  colors: [],
};

const filterReducer = produce((state , action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "filters/changedStatusFilter":
      state.status = action.payload
      break
    case "filters/changedColorFilter":
      const { colors } = state;
      const { color, changeType } = action.payload;
      // eslint-disable-next-line default-case
      switch (changeType) {
        case "added":
          state.colors.push(color)
          break
        case "removed":
          state.colors = colors.filter(c => c !== color)
          break
      }
      break
  }
} , initState) 

export default filterReducer

// export default function filterReducer(state = initState, action) {
//   switch (action.type) {
//     case "filters/changedStatusFilter":
//       return {
//         ...state,
//         status: action.payload,
//       };
//     case "filters/changedColorFilter":
//       const { colors } = state;
//       const { color, changeType } = action.payload;
//       switch (changeType) {
//         case "added":
//             if (colors.includes(color)) {
//                 return state
//             }
//             return{
//                 ...state,
//                 colors:[...colors , color]
//             }
//         case "removed":
//             return{
//                 ...state ,
//                 colors: colors.filter(c => c !== color)
//             }
//         default:
//           return state;
//       }
//     default:
//       return state;
//   }
// }

export const selectStausFilter = state => state.filters.status
export const selectColorsFilter =state => state.filters.colors

export const changedSetatusFilter = (status) => ({
  type: 'filters/changedStatusFilter',
  payload: status
})

export const changedColorsFilter = (color , changeType) => ({
    type: "filters/changedColorFilter" ,
    payload: {
      color, changeType
    }
})