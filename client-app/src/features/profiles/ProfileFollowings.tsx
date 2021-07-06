import { observer } from "mobx-react-lite";
import React from "react";
import { Card, Grid, Header, Tab } from "semantic-ui-react";
import { useStore } from "../../app/stores/Store";
import ProfileCard from "./ProfileCard";

export default observer( function ProfileFollowings(){
const{ProfileStore} =useStore() ; 
const{profile,loadingFollowings,followings,activeTab}=ProfileStore;

    return(
        <Tab.Pane loading={loadingFollowings}>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='user' content={activeTab===3?`people following${profile?.displayName}`:`people${profile?.displayName} is following`} />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Card.Group itemsPerRow={4}>
                        {followings.map(profile=>(
                            <ProfileCard key={profile.username} profile={profile}/>

                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>

        </Tab.Pane>
    )

} )