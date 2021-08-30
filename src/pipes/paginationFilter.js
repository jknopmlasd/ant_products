import {store} from "../App";
import {countItem} from "../actions";

export const paginationPipe = (state,args) => {
    console.log("pagination pipe: ",state,args);
    if (!args || !args.perPage || !args.currentPage) {
        return state;
    }
    const location = (args.perPage * (args.currentPage - 1)) || 0 ;
    console.log(location, location + args.perPage);
    return state.slice(location, location + args.perPage);
};

