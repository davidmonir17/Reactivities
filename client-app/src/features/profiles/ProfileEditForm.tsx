import { Formik,Form } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../app/stores/Store";
import * as Yup from 'yup';
import { Button } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyTextArea from "../../app/common/form/MyTextArea";

interface Props {
    setEditMode: (editMode: boolean) => void;
    }
export default observer( function ProfileEditForm({setEditMode}: Props)
{
    const{ProfileStore:{updateProfile,profile}}=useStore();
    return(
        <Formik initialValues={{displayName:profile?.displayName,bio:profile?.bio}}
        
        onSubmit={values=>{
            console.log(values);
            updateProfile(values).then(()=>{
                setEditMode(false);
            })
        }}
        validationSchema={Yup.object({displayName:Yup.string().required()})}>

        {({dirty,isSubmitting,isValid})=>(
        <Form className='ui form'>
            <MyTextInput PlaceHolder='Display Name' name='displayName'/>
            <MyTextArea rows={3}PlaceHolder="Add You BIO" name='bio'/>
            <Button positive 
            type='submit'
            loading={isSubmitting}
            content='Update Profile'
            floated='right'
            disabled={!isValid||!dirty}
            />

        </Form>
        )}

        </Formik>

    )
})