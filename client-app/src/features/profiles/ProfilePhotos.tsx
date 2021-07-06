import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Card, Grid, Header,Image ,Tab } from "semantic-ui-react";
import PhotoUploadwidget from "../../app/common/imageUpload/PhotoUploadwidget";
import { photo, Profile } from "../../app/models/Profile";
import { useStore } from "../../app/stores/Store";

interface Props{
    profile:Profile;
}

export default observer( function ProfilePhotos({profile}:Props)
{
    const{ProfileStore:{isCurrentUser,uploadPhoto,uploading,setMainPhoto,loading,deletePhoto}}=useStore(); 
    const[addPhotoMode,setAddPhotoMode]=useState(false);
    const[target,SetTarget]=useState('');

    function handelPhotoUpload(file:Blob){
        uploadPhoto(file).then(()=>setAddPhotoMode(false));

    }
    function handelSetMainPhoto(photo:photo,e:SyntheticEvent<HTMLButtonElement>)
    {
        SetTarget(e.currentTarget.name);
        setMainPhoto(photo);

    }
    function handeldeletePhoto(photo:photo,e:SyntheticEvent<HTMLButtonElement>)
    {
        SetTarget(e.currentTarget.name);
        deletePhoto(photo);

    }
    return(
        <Tab.Pane>

            <Grid>
                <Grid.Column width={16}>
                <Header floated="left" icon="image" content='Photos' />
                {isCurrentUser&&(
                    <Button floated='right' basic
                    content={addPhotoMode?'cancel':'Add Photo' }
                    onClick={()=>setAddPhotoMode(!addPhotoMode)}
                    />
                )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode?(
                        <PhotoUploadwidget uploadPhoto={handelPhotoUpload} loading={uploading} />
                    ):(
                        <Card.Group itemsPerRow={5}>
                        {profile.photos?.map(photo=>(
                        <Card key={photo.id}>
                            <Image src={ photo.url }/>
                            {isCurrentUser&&(
                                <Button.Group fluid  widths={2}>
                                        <Button basic color='green' content='Main' name={'main'+photo.id}
                                        disabled={photo.isMain}
                                        loading={target==='main'+photo.id&&loading}
                                        onClick={e=>handelSetMainPhoto(photo,e)}
                                        />
                                        <Button 
                                        basic
                                        color='red'
                                        icon='trash'
                                        loading={target===photo.id&&loading}
                                        onClick={e=>handeldeletePhoto(photo,e)}
                                        disabled={photo.isMain}
                                        name={photo.id}
                                        />
                                </Button.Group>
                            )}
                        </Card>
                        ))} 
                    </Card.Group>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})