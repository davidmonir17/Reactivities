import { observer } from "mobx-react-lite";
import React from "react"; 
import { Link } from "react-router-dom";
import { List,Image ,Popup} from "semantic-ui-react";
import { Profile } from "../../../app/models/Profile";
import ProfileCard from "../../profiles/ProfileCard";

interface Props{
    attendees: Profile[];
}

export default observer(function ActivityListItemAttendee({attendees}:Props)
{

    const styles={
        borderColor:'orange',
        borderWidth:3
    }
    return(
            <List horizontal >
                {attendees&& attendees.map(attndee => (
                    <Popup
                    hoverable
                    key={attndee.username}
                    trigger={
                        <List.Item key={attndee.username} as={Link} to={`/profiles/${attndee.username}`}>
                        <Image
                        bordered
                        style={attndee.following?styles:null}
                        size="mini" circular src={attndee.image|| '/assets/user.png'}/>
                    </List.Item>
                    }
                    >
                            <Popup.Content>
                                <ProfileCard profile={attndee}/>
                            </Popup.Content>
                    </Popup>
                    
                ))}
            </List>
    )
})





