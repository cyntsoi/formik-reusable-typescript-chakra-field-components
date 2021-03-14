import {
    HStack,
    FormLabel,
    FormErrorMessage,
    FormControl,
    FormControlProps,
    StackProps, FormLabelProps, FormErrorMessageProps
} from "@chakra-ui/react"
import React from "react"
import {FieldProps} from "formik";

interface FieldWrapperComponentProps {
    formControlProps?: FormControlProps,
    inputWrapperProps?: StackProps,
    labelProps?: FormLabelProps,
    errorMessageProps?: FormErrorMessageProps
}

interface FieldWrapperProps {
    labelText?: string,
    beforeInput?: React.ReactNode,
    afterInput?: React.ReactNode
}

export const withFormikFieldWrapper = <V, T extends FieldProps<V> = FieldProps<V>>(Component: React.ComponentType<Omit<Omit<T, keyof FieldWrapperProps>, keyof FieldWrapperComponentProps>>) => {
    return ({
                field,
                formControlProps = {},
                inputWrapperProps = {},
                labelProps = {},
                errorMessageProps = {},
                form, meta,
                labelText,
                beforeInput,
                afterInput,
                ...componentProps
            }: FieldWrapperComponentProps & FieldWrapperProps & T) => {
        const error = form.errors[field.name]
        return (
            <FormControl
                {...formControlProps}
                isInvalid={!!error}
            >
                {labelText && <FormLabel {...labelProps}>{labelText}</FormLabel>}
                <HStack {...inputWrapperProps}>
                    {beforeInput}
                    <Component {...({
                        ...componentProps,
                        form,
                        field,
                        meta
                    } as Omit<Omit<T, keyof FieldWrapperProps>, keyof FieldWrapperComponentProps>)} />
                    {afterInput}
                </HStack>
                <FormErrorMessage {...errorMessageProps}>{error}</FormErrorMessage>
            </FormControl>
        )
    }
}
