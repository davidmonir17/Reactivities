import { observer } from "mobx-react-lite";
import React from "react";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";
import { useStore } from "../../../app/stores/Store";

export default observer(function ActivityFilter()
{
    const{activityStore:{predicate,setPredicate}}=useStore();
    return(
        <>
        <Menu vertical size="large" style={{width:'86%',marginTop:25 }}>
            <Header icon='filter' attached color='teal' content="Filters"  />
            <Menu.Item content=" All Activities"
            active={predicate.has('all')}
            onClick={()=>setPredicate('all','true') }
            />
            <Menu.Item 
            active={predicate.has('isGoing')}
            onClick={()=>setPredicate('isGoing','true') }
            content=" I'm going"/>
            <Menu.Item content=" I'm Hosting"
            active={predicate.has('isHost')}
            onClick={()=>setPredicate('isHost','true') }
            />
        </Menu>
        <Header/>
        <Calendar 
            onChange={(date)=>setPredicate('startDate',date as Date)}
            value={predicate.get('startDate')||new Date()}
        />
        </>
        
    )
})