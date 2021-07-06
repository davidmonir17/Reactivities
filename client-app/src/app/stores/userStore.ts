import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { User, userFormValues } from "../models/User";
import { store } from "./Store";

export default class userStor{
    user: User| null=null;

    constructor()
    {
        makeAutoObservable(this);
    }
    get IsLoggedIn()
    {
        return !!this.user;
    }
    login=async(creds:userFormValues)=>
    {
        try {
            const user=await agent.Account.login(creds);
            store.commonstore.setToken(user.token);
            runInAction(()=> this.user=user);
            history.push('./activities');
            store.modelstore.closeModal();
            console.log(user.username);
            console.log(this.user?.username);
        } catch (error) {
            throw error;
        }
    }

    logout=()=>{
        store.commonstore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user=null;
        history.push('/')
    }

    getUser= async()=>{
        try {
            const user=await agent.Account.current();
            runInAction(()=> this.user=user);
        } catch (error) {
            console.log(error);
            
        }
    }

    register= async(creds:userFormValues)=>{
        try {
             const user=await agent.Account.register(creds);
             store.commonstore.setToken(user.token);
             runInAction(()=>this.user=user);
             history.push('/activities');
             store.modelstore.closeModal();
        } catch(error)
        {
            
            throw error;
         
            
        }
    }
    setImage=(image:string)=>{
        if(this.user)
        this.user.image=image
    }
    setDisplayname=(name:string)=>{
        if(this.user)
        this.user.displayName=name
    }
}
