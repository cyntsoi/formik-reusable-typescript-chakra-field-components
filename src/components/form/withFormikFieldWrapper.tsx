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
    labelWrapperProps?: FormLabelProps,
    errorMessageProps?: FormErrorMessageProps
}

interface FieldWrapperProps {
    labelText?: string,
    beforeInput?: React.ReactNode,
    afterInput?: React.ReactNode
}

const createFormikFieldWrapperHOC = ({
                                         formControlProps: baseFormControlProps = {},
                                         inputWrapperProps: baseInputWrapperProps = {},
                                         labelWrapperProps: baseLabelWrapperProps = {},
                                         errorMessageProps: baseErrorMessageProps = {}
                                     }: FieldWrapperComponentProps) => {
    return <V, T extends FieldProps<V> = FieldProps<V>>(Component: React.ComponentType<Omit<Omit<T, keyof FieldWrapperProps>, keyof FieldWrapperComponentProps>>) => {
        return ({
                    field,
                    formControlProps = {},
                    inputWrapperProps = {},
                    labelWrapperProps = {},
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
                    {...baseFormControlProps}
                    {...formControlProps}
                    isInvalid={!!error}
                >
                    {labelText && <FormLabel {...baseLabelWrapperProps} {...labelWrapperProps}>{labelText}</FormLabel>}
                    <HStack {...baseInputWrapperProps} {...inputWrapperProps}>
                        {beforeInput}
                        <Component {...({
                            ...componentProps,
                            form,
                            field,
                            meta
                        } as Omit<Omit<T, keyof FieldWrapperProps>, keyof FieldWrapperComponentProps>)} />
                        {afterInput}
                    </HStack>
                    {error &&
                    <FormErrorMessage {...baseErrorMessageProps} {...errorMessageProps}>{error}</FormErrorMessage>}
                </FormControl>
            )
        }
    }
}


export const withFormikFieldWrapper = createFormikFieldWrapperHOC({
    formControlProps: {
        my: 5
    },
    inputWrapperProps: {
        my: 4
    }
})