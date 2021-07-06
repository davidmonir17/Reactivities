import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/Store";
import{format} from 'date-fns';
import ActivityListItemAttendee from "./ActivityListItemAttendee";

 interface Props{
     activity:Activity;
 }
export default function ActivityListItem({activity}:Props)
{
        const{activityStore}=useStore();
        const{deleteActivity,loadind}=activityStore;
        const[target,SetTarget]=useState('');

   /*  function handelActivityDeleted(e:SyntheticEvent<HTMLButtonElement>,id:string)
     {
        SetTarget(e.currentTarget.name);
        deleteActivity(id);
     }*/

    return(
        <Segment.Group>
 
<Segment>
    {activity.iscancelled&&
    <Label attached="top" color="red" content="cancelled" style={{textAlign:'centre'}}/>
    }
<Item.Group>
    <Item>
    <Item.Image style={{marginBottom:3}} size='tiny' circular src={activity.host?.image||'/assets/user.png'}/>
    <Item.Content>
        <Item.Header as={Link} to={`/activities/${activity.id}`}>
            {activity.title}
            </Item.Header>
            <Item.Description>Hosted By <Link to={`/profiles/${activity.hostUsername}`}> {activity.host?.displayName} </Link> </Item.Description>
            {activity.isHost&&(
                <Item.Description>
                    <Label basic color='orange'>
                        you Are Hosting this Activity
                    </Label>
                </Item.Description>
            )}
            {activity.isGoing &&!activity.isHost&&(
                <Item.Description>
                    <Label basic color='green'>
                        you Are Going To this Activity
                    </Label>
                </Item.Description>
            )}
            </Item.Content>
            </Item>
            </Item.Group>
            </Segment>      
            <Segment>
                <span>
                    <Icon name='clock'/>{ format(activity.date!,'dd MMM yyyy h:mm aa')}
                    <Icon name='marker'/> {activity.venue}
                </span>
        </Segment>
            
    <Segment secondary>
            <ActivityListItemAttendee attendees={activity.attendence!}/>
    </Segment>
    <Segment clearing >
        <span>{activity.description}</span>   
        <Button 
            as={Link}
            to={`/activities/${activity.id}`}
            color='teal'
            floated='right'
            content='View'
        />
        </Segment>
        </Segment.Group>
        

    )
}