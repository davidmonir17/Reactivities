import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Grid, Header,Image } from "semantic-ui-react";
import { useStore } from "../../stores/Store";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import PhotoWidgetDropZone from "./PhotoWidgetDropZone";

interface Props{
    loading:boolean;
    uploadPhoto:(file:Blob)=>void;
}
export default function PhotoUploadwidget({loading,uploadPhoto}:Props)
{
    const[files,SetFiles]=useState<any>([]);
    const[cropper,setCropper]=useState<Cropper>();

    function onCrop()
    {
        if(cropper)
        {
            cropper.getCroppedCanvas().toBlob(blob=>uploadPhoto(blob!));
        }
    }

    useEffect(()=>{
        return()=>{
            files.forEach((file:any)=>URL.revokeObjectURL(file.preview));

        }
    },[files])  
    return(
        <Grid>
            <Grid.Column width={4}>
                <Header sub color='teal' content='Step 1 - Add Photo' />
                <PhotoWidgetDropZone SetFiles={SetFiles} />
            </Grid.Column>
            <Grid.Column width={1}/>
            <Grid.Column width={4}>
                <Header sub color='teal' content='Step 2 - Resize Image' />
                {files && files.length > 0 &&(
                <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview}/>
                )}
            </Grid.Column>
            <Grid.Column width={1}/>
            <Grid.Column width={4}>
                <Header sub color='teal' content='Step 3 - Preview & Upload' />
                {files && files.length &&
                <> 
                <div className='img-preview' style={{minHeight:200,overflow:'hidden'}} />
                <Button.Group widths={4}>
                    <Button loading={loading} onClick={onCrop} positive icon='check'/>
                    <Button disabled={loading} onClick={()=>SetFiles([])}  icon='close'/>
                </Button.Group>
                </>}
                            </Grid.Column>
        </Grid>
    )
}