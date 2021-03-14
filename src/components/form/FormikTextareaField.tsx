import {Textarea} from "@chakra-ui/react";
import {withFormikFieldWrapper} from "./withFormikFieldWrapper";
import React, {FC} from "react"
import {FieldProps} from "formik";

type V = string;
type T = FieldProps<V> & { disabled?: boolean };

export const FormikTextareaFieldInner: FC<T> = ({field, disabled = false}) => {
    return <Textarea disabled={disabled} {...field} />;
}

export const FormikTextareaField = withFormikFieldWrapper<V, T>(FormikTextareaFieldInner);
