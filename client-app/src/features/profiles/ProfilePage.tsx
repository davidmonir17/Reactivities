import { observer } from "mobx-react-lite";
import React from "react";  
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/Loadingcomponent";
import { useStore } from "../../app/stores/Store";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";

export default observer(function ProfilePage()
{
    const{username}=useParams<{username:string}>();
    const{ProfileStore}=useStore();
    const{loadingProfile,loadProfile,profile,setActiveTab}=ProfileStore; 

    useEffect(()=>{
        loadProfile(username);
        return()=>{
            setActiveTab(0);
        }
    },[loadProfile,username])

    if(loadingProfile) return <LoadingComponent content="Loading Profile...." />

    return(
        <Grid>
            <Grid.Column width={16}>
                {profile&& <> 
                <ProfileHeader profile={profile} />
                <ProfileContent  profile={profile} /> 
                </>}
            </Grid.Column>
        </Grid>

    )
})