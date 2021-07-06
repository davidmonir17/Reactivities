import { useField } from "formik";
import React from "react";
import ReactDatePicker from "react-datepicker";
import { Form, Label } from "semantic-ui-react";
import DatePicker, {ReactDatePickerProps} from "react-datepicker"

export default function MyDateInput(props:Partial<ReactDatePickerProps>)
{
    const[field,meta,helpers]=useField(props.name!);
    return(
        <Form.Field error={meta.touched&& !!meta.error}>
            <DatePicker
            {...field}
            {...props}
            selected={(field.value && new Date(field.value))||null}
            onChange={values=>helpers.setValue(values)}
            />
            {meta.touched&&meta.error? (
                <Label basic color="red"> {meta.error}</Label>
            ): null}

        </Form.Field>
    )

}