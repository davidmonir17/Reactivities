import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { Header, Icon } from 'semantic-ui-react'
interface Props{
    SetFiles:(files:any)=>void;
}
export default function PhotoWidgetDropZone({SetFiles}:Props) {
    const dzstyles={
        border:'dashed 3px #eee',
        borderColor:'#eee',
        borderRaduis:'5px',
        paddingTop:'30px',
        textAlign:'center' as 'center',
        height:200
    }
    const dzActive={
        borderColor:'green',
    }

const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
    SetFiles(acceptedFiles.map((file:any)=>Object.assign(file,{
        preview:URL.createObjectURL(file)
    })))
    // Do something with the files
}, [SetFiles])
const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

return (
    <div {...getRootProps()} style={isDragActive ?{...dzstyles,...dzActive}:dzstyles} >
    <input {...getInputProps()} />
    <Icon name='upload' size='huge' />
    <Header content="Drop image here"/>
    </div>
)
}
