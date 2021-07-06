import { observer } from "mobx-react-lite";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/Store";
import React, { Fragment } from "react";
import ActivityListItem from "./ActivityListItem";

export default observer( function ActivityList()
{
    const{activityStore}=useStore();
    const{groupedActivity}=activityStore
    return(

    <>
        {groupedActivity.map(([group,activities]) =>
        (
            <Fragment key={group}>
                <Header sub color='teal'>
                    {group}
                </Header>
                {activities.map(activity=>(

                    <ActivityListItem key={activity.id} activity={activity}/>

                ))}

            

            </Fragment>
        )
    
    )


        }

    </>
    
    )

})