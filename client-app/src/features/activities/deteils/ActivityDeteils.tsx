import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/Loadingcomponent";
import { useStore } from "../../../app/stores/Store";
import ActivityDeteiledChat from "./ActivityDeteiledChat";
import ActivityDeteiledHeader from "./ActivityDeteiledHeader";
import ActivityDeteiledInfo from "./ActivityDeteiledInfo";
import ActivityDeteiledSideBar from "./ActivityDeteiledSideBar";



export default observer( function ActivityDeteils()
{
  const{activityStore}=useStore();
  const{selectedActivity:activity,LoadOneActivity,loadingInitial,ClearSelectedActivity}=activityStore
  const{id}=useParams<{id:string}>();
useEffect(()=>{
if (id) {
  LoadOneActivity(id);
  return()=>ClearSelectedActivity();
}
},[id,LoadOneActivity,ClearSelectedActivity])

  if(loadingInitial|| !activity) return <LoadingComponent/>;
  
    return(
      <Grid>
        <Grid.Column width={10}>
          <ActivityDeteiledHeader activity={activity}/>
          <ActivityDeteiledInfo activity={activity}/>
          <ActivityDeteiledChat activityId={activity.id}/>
        </Grid.Column>
        <Grid.Column width={6}>
          
        <ActivityDeteiledSideBar activity={activity}/>
        </Grid.Column>
      </Grid>

    )

})