import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity, ActivityFormValues } from "../models/activity";
import{format} from 'date-fns';
import { store } from "./Store";
import { Profile } from "../models/Profile";
import { Pagination, PagingParams } from "../models/Pagination";


 
export default class ActivitySore{
 activityRegister=new Map<string,Activity>();
 selectedActivity:Activity|undefined=undefined;
 editeMode=false;
 loadind=false;
 loadingInitial=false;
 pagination:Pagination|null=null;
 pagingParams=new PagingParams();
 predicate=new Map().set('all',true);
    constructor()
    {
    makeAutoObservable(this)
    reaction(
        ()=>this.predicate.keys(),
        ()=> {
            this.pagingParams=new PagingParams();
            this.activityRegister.clear();
            this.loadActivity();
        }
    )
    }
    setPagingParams=(pagingParams:PagingParams)=>
    {
        this.pagingParams=pagingParams; 
    }
    setPredicate=(predicate:string,value:string|Date)=>{
        const restPredicate=()=>{
            this.predicate.forEach((value,key)=>{
                if(key!=='startDate')this.predicate.delete(key) ;
            })
        }
        switch(predicate){
            case'all':
                restPredicate();
                this.predicate.set('all',true);
                break;
            case'isGoing':
                restPredicate();
                this.predicate.set('isGoing',true);
                break;
            case'isHost':
                restPredicate();
                this.predicate.set('isHost',true);
                break;
            case'startDate':
                restPredicate();
                this.predicate.delete('startDate');
                this.predicate.set('startDate',value)
                break;
            }
    }
    get axiosParams()
    {
        const Params = new URLSearchParams();
        Params.append('pageNumber',this.pagingParams.pageNumber.toString());
        Params.append('pageSize',this.pagingParams.pageSize.toString());
        this.predicate.forEach((value,key)=>{
            if(key=== 'startDate')
            {
                Params.append(key,(value as Date).toISOString())
            }
            else{
                Params.append(key,value);
            }

        })
        return Params;
    }
    get activitiesByDate(){
        return Array.from(this.activityRegister.values()).sort((a,b)=>
         a.date!.getTime()- b.date!.getTime());
    }

    loadActivity=async ()=>{
        this.loadingInitial=true;
        try{
            const res=await agent.Activities.list(this.axiosParams);
        
            res.data.forEach(activity=>{
            this.setActivity(activity);
            })
            this.setPagination(res.pagination);
            this.loadingInitial=false;
            
        } catch (error) {
            console.log(error);
            runInAction(()=>{
                this.loadingInitial=false;
            })
            
        }
 
    }
    setPagination=(pagination:Pagination)=>{
        this.pagination=pagination;
    }

    LoadOneActivity=async(id:string)=>{
        let activity=this.getActivity(id);
        if(activity)
        {
            this.selectedActivity=activity
            return activity;
        }
        else{
            this.loadingInitial=true;
            try {
              activity = await agent.Activities.details(id); 
              this.setActivity(activity);
              runInAction(()=>{
                this.selectedActivity=activity;

              })
              this.loadingInitial=false;
              return activity;
              
                
            } catch (error) {
                console.log(error);
                this.loadingInitial=false;
            }
        }
    }

    private setActivity=(activity:Activity)=>{
    
        const user=store.userstore.user;
        if(user){
            activity.isGoing=activity.attendence!.some(
                a=>a.username===user.username
            )
            activity.isHost=activity.hostUsername===user.username;
            activity.host=activity.attendence?.find(x=>x.username === activity.hostUsername);
        }
        activity.date=new Date(activity.date! )
        this.activityRegister.set(activity.id,activity);
    }

private getActivity=(id:string)=> {
    return this.activityRegister.get(id);
}


   

   selectActivity=(id:string)=>{
        this.selectedActivity=this.activityRegister.get(id);
   }


   createActivity=async(activity:ActivityFormValues)=>{
        const user=store.userstore.user;
        const attendee=new Profile(user!)
    try {
        await agent.Activities.Create(activity);
        const newActivity= new Activity(activity);
        newActivity.hostUsername=user!.username;
        newActivity.attendence=[attendee];
        this.setActivity(newActivity)
        runInAction(()=>{
            this.selectedActivity=newActivity;
          
        })
    } catch (error) {
        console.log(error);
       
    }

   }
   get groupedActivity()
   {
       return Object.entries(

        this.activitiesByDate.reduce((activities,activity)=>{
            const date=format(activity.date!,'dd MMM yyyy')
            activities[date]=activities[date]?[...activities[date],activity]:[activity];
           
            //const category=activity.category;
            //activities[category]=activities[category]?[...activities[category],activity]:[activity];
             return activities;
        },{} as{[key:string]:Activity[]})
       )

   }

  updateActivity=async(activity:ActivityFormValues)=>{
    
      try {
          await agent.Activities.update(activity);
          runInAction(()=>{
              if(activity.id)
              {
                  let updatedActivity={...this.getActivity(activity.id),...activity}
                  this.activityRegister.set(activity.id,updatedActivity as Activity);
                this.selectedActivity=updatedActivity as Activity;
              }
              
            
        
          })
          
      } catch (error) {
        console.log(error);
        
      }
  }

deleteActivity=async(id:string)=>
{
        this.loadind=true;
    try {
    
        await agent.Activities.dele(id);
        this.activityRegister.delete(id);
       
        this.loadind=false;

} catch (error) {
    
    console.log(error);
    runInAction(()=>{
        this.loadind=false;
    })
}   
}


    updateAttendance= async ()=>{
        //msh htshta8l
        const user=store.userstore.user;
        this.loadind=true;
        try {
            await agent.Activities.attend(this.selectedActivity!.id);
            runInAction(()=>{
                if(this.selectedActivity?.isGoing)
                {
                    this.selectedActivity.attendence=
                    this.selectedActivity.attendence?.filter(a=>a.username!==user?.username);
                    this.selectedActivity.isGoing=false;
                }else{

                    const attendee=new Profile(user!);
                    this.selectedActivity?.attendence?.push(attendee);
                    this.selectedActivity!.isGoing=true;
                }
                this.activityRegister.set(this.selectedActivity!.id,this.selectedActivity!)
            })
        } catch (error) {
            console.log(error)
        }finally{
            runInAction(()=>this.loadind=false);
            
        }
    }

    cancelActivityToggle =async()=>{
        this.loadind=true;
        try {
            await agent.Activities.attend(this.selectedActivity!.id);
            runInAction(()=>{
                this.selectedActivity!.iscancelled=!this.selectedActivity?.iscancelled;
                this.activityRegister.set(this.selectedActivity!.id,this.selectedActivity!);
            })
            
        } catch (error) {
            console.log(error);
        }finally{
            runInAction(()=>this.loadind=false);
        }
    }
    ClearSelectedActivity=()=>{
        this.selectedActivity=undefined;
    }
    updateAttendeeFolowing=(username:string)=>{
        this.activityRegister.forEach(activity=>{
            activity.attendence.forEach(attndee=>{
                if(attndee.username=== username)
                {
                    attndee.following? attndee.followersCount-- : attndee.followersCount++;
                    attndee.following=!attndee.following;
                }
            })
        })
    }
}