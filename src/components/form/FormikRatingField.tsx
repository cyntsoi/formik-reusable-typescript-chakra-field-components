import {StarIcon} from "@chakra-ui/icons"
import {IconButton, Input} from "@chakra-ui/react"
import {withFormikFieldWrapper} from "./withFormikFieldWrapper"
import React, {useState} from "react"
import {FieldProps} from "formik"

type V = number

export const FormikRatingFieldInner: React.FC<FieldProps<V>> = ({field, form: {setFieldValue}}) => {
    const [selected, setSelected] = useState(0)
    return (
        <div>
            <Input type="hidden" {...field} />
            {new Array(5).fill(undefined).map((_, idx) => {
                const select = () => setSelected(idx + 1)
                const unselect = () => setSelected(selected => selected === idx + 1 ? 0 : selected)
                return (
                    <IconButton
                        key={idx}
                        sx={{backgroundColor: "transparent !important"}}
                        color={(selected || field.value) > idx ? "yellow.300" : "gray.300"}
                        display={"inline-block"}
                        variant="ghost"
                        aria-label={`Rate ${idx + 1}`}
                        icon={<StarIcon/>}
                        onMouseEnter={() => select()}
                        onMouseLeave={() => unselect()}
                        onFocus={() => select()}
                        onBlur={() => unselect()}
                        onClick={() => setFieldValue(field.name, idx + 1)}
                    />
                )
            })}
        </div>
    )
}

export const FormikRatingField = withFormikFieldWrapper<V>(FormikRatingFieldInner)
