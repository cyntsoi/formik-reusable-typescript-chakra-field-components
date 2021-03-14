import {Input} from "@chakra-ui/react";
import {withFormikFieldWrapper} from "./withFormikFieldWrapper";
import React, {FC} from "react"
import {FieldProps} from "formik";

type V = string
type T = FieldProps<V> & { disabled?: boolean }

export const FormikTextFieldInner: FC<T> = ({field, disabled = false}) => {
    return <Input disabled={disabled} {...field} />;
}

export const FormikTextField = withFormikFieldWrapper<V, T>(FormikTextFieldInner);
