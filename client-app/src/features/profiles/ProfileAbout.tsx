import { observer } from "mobx-react-lite";
import React from "react";
import { useState } from "react";
import { Button, Grid, Header, Tab } from "semantic-ui-react";
import { useStore } from "../../app/stores/Store";
import ProfileEditForm from "./ProfileEditForm";

export default observer(function ProfileAbout()
{
    const{ProfileStore}=useStore();
    const{profile,isCurrentUser}=ProfileStore;
    const[editeMode,setEditeMode]=useState(false);
    return(
        <Tab.Pane>
            <Grid >
                <Grid.Column width={16}>
                    <Header floated='left' icon='user' content={`About ${profile?.displayName}`} />
                    {isCurrentUser&&(
                        <Button basic floated='right'
                        content={editeMode?'cancel':'Edite Profile'}
                        onClick={()=>setEditeMode(!editeMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {editeMode?<ProfileEditForm setEditMode={setEditeMode} /> :
                    <span style={{whiteSpace: 'pre-wrap'}} >
                        {profile?.bio}
                    </span>
                    }
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})