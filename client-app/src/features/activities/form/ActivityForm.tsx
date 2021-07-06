import { observer } from "mobx-react-lite";
import React, { ChangeEvent } from "react";  
import { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Segment ,Label, Header} from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/Loadingcomponent";
import { Activity, ActivityFormValues } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/Store";
import{v4 as uuid}from 'uuid';
import { Formik,Form, ErrorMessage } from "formik";
import* as Yup from'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { CategoryOptions } from "../../../app/common/options/CategoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";

export default observer( function ActivityForm()
{
    const history=useHistory();
    const{activityStore}=useStore();
    const{createActivity,updateActivity,LoadOneActivity,loadingInitial}=activityStore;
    const{id}=useParams<{id:string}>();

    const[activity,SetActivity]=useState<ActivityFormValues>(new ActivityFormValues());
    const validationschema=Yup.object({
        title:Yup.string().required('the activity title is required'),
        description:Yup.string().required('the activity Descreption is required'),
        category:Yup.string().required('the activity Category is required'),
        city:Yup.string().required('the activity city is required'),
        venue:Yup.string().required('the activity venue is required'),
        date:Yup.string().required('the activity date is required').nullable(   ),

    })
    useEffect(()=>{
        if(id) LoadOneActivity(id).then(activity=>SetActivity(new ActivityFormValues(activity)))
    },[id,LoadOneActivity]);



function handelformsubmit( activity:ActivityFormValues)
{
    if(!activity.id)
    { 
        let newactivity={
            ...activity,id:uuid()
        };
            createActivity(newactivity).then(()=>history.push(`/activities/${newactivity.id}`))
    }else{
        updateActivity(activity).then(()=>history.push(`/activities/${activity.id}`))
    }
}

        if(loadingInitial) return<LoadingComponent content='Loading activity ....'/>
    return(

        <Segment  clearing>
            <Header color="teal"content="Activity Detials" sub/>
            <Formik
             validationSchema={validationschema} 
             enableReinitialize initialValues={activity}
              onSubmit={values=>handelformsubmit(values)}>
                {({handleSubmit,isValid,isSubmitting,dirty})=>(
                         <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' >
                            <MyTextInput name='title' PlaceHolder='Title'/>
                        <MyTextArea rows={3} PlaceHolder='Descreption'  name='description'  />
                        <MySelectInput options={CategoryOptions} PlaceHolder='Category'  name='category'  />
                        <MyDateInput 
                        showTimeSelect
                        timeCaption='time'
                        dateFormat='MMMM d,yyyy h:mm aa'
                         placeholderText='Date' name='date' />
                    
                        <Header color="teal"content="Location Detials" sub/>

                        <MyTextInput PlaceHolder='City' name='city' />
                        <MyTextInput PlaceHolder='Venue' name='venue' />
                        <Button 
                        disabled={isSubmitting||!dirty||!isValid}
                        loading={isSubmitting} floated='right' positive type='submit' content='Submit'/>
                        <Button as={Link} to='/activities' floated='right'  type='button' content='cancel'/>
                    </Form>
                )}
               
            </Formik>
            
            
        </Segment>
    )

})