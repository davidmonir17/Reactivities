import { createContext, useContext } from "react";
import ActivitySore from "./ActivityStore";
import CommentStore from "./commentStore";
import CommonStore from "./CommonStore";
import modalStores from "./modalStores";
import ProfileStore from "./ProfileStore";
import userStor from "./userStore";

interface Store{
    activityStore:ActivitySore;
    commonstore:CommonStore;
    userstore:userStor;
    modelstore:modalStores;
    ProfileStore:ProfileStore;
    commentStore:CommentStore;
}

export const store: Store={
    activityStore:new ActivitySore(),
    commonstore:new CommonStore(),
   userstore:new userStor(),
   modelstore:new modalStores(),
   ProfileStore:new ProfileStore(),
   commentStore:new CommentStore()
}

export const StoreContext=createContext(store);

export function useStore(){

    return useContext(StoreContext);
}