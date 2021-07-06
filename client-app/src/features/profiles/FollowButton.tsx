import { observer } from "mobx-react-lite";
import React, { SyntheticEvent } from "react";
import { Reveal, Button } from "semantic-ui-react";
import { Profile } from "../../app/models/Profile";
import { useStore } from "../../app/stores/Store";

interface Props{
    profile:Profile
}
export default observer(function FollowButton({profile}:Props){
    const{ProfileStore,userstore}=useStore();
    const{updateFollowing,loading}=ProfileStore;
    if(userstore.user?.username===profile.username) return null;
    function handleFollow(e:SyntheticEvent,username:string){
        e.preventDefault();
        profile.following?updateFollowing(username,false):updateFollowing(username,true);
    }
    return(
        <Reveal animated='move' >
                        <Reveal.Content visible style={{width:'100%'}}>
                            <Button
                            fluid 
                            color='teal'
                            content={profile.following?'Following':'Not following'}
                            />
                        </Reveal.Content> 
                        <Reveal.Content hidden style={{width:'100%'}}>
                            <Button 
                            fluid 
                            //basic
                            color={profile.following? 'red' : 'green'} 
                            content={profile.following? 'Unfollow':'Follow'} 
                            loading={loading}
                            onClick={(e)=>handleFollow(e,profile.username)}
                            />
                        </Reveal.Content>
                    </Reveal>
    )

})