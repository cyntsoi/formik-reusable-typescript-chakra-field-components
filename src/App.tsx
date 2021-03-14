import {Button, Heading} from "@chakra-ui/react"
import {FormikTextField, FormikRatingField, FormikTextareaField} from "./components/form"
import {Form, Field, Formik, FormikConfig} from "formik"
import fetchCustomerAddress from "./api/getAddress"
import React, {KeyboardEventHandler} from "react"
import {PageContainer} from "./components/PageContainer";
import {isGoodRating} from "./api/isGoodRating";

interface FormValues {
    customerId: string,
    addressId: string,
    addressText: string,
    customerRating: number,
    customerComment: string
}

interface FormStatus {
    customerIdLoading: boolean,
    customerIdVerified: boolean,
    addressConfirmedByUser: boolean
}

const initialValues: FormValues = {
    customerId: "",
    addressId: "",
    addressText: "",
    customerRating: 0,
    customerComment: ""
}

const initialStatus: FormStatus = {
    customerIdLoading: false,
    customerIdVerified: false,
    addressConfirmedByUser: false
}



const onSubmit: FormikConfig<FormValues>['onSubmit'] = (values, {setSubmitting}) => {
    setSubmitting(true)
    setTimeout(() => {
        setSubmitting(false)
        alert(JSON.stringify(values, null, 2))
    }, 1000)
}


function App() {
    return (
        <PageContainer>
            <Heading as="h1" size="lg" mb={4}>How did we do? </Heading>
            <Formik initialValues={initialValues} initialStatus={initialStatus} onSubmit={onSubmit}>
                {({
                      values,
                      values: {customerRating},
                      status,
                      status: {
                          customerIdVerified,
                          addressConfirmedByUser,
                          customerIdLoading
                      },
                      dirty,
                      setFieldValue,
                      setFieldError,
                      setStatus,
                      isSubmitting
                  }) => {
                    const confirmCustomerId = async () => {
                        const customerId = values.customerId
                        if (customerId === "") {
                            setFieldError("customerId", "Customer ID cannot be empty.")
                            return
                        }
                        setStatus({
                            ...status,
                            customerIdVerified: false,
                            customerIdLoading: true
                        })
                        try {
                            const {id, address} = await fetchCustomerAddress(customerId)
                            setFieldValue("addressId", id)
                            setFieldValue("addressText", address)
                            setStatus({
                                ...status,
                                customerIdVerified: true,
                                customerIdLoading: false
                            })
                        } catch (err) {
                            setStatus({
                                ...status,
                                customerIdVerified: false,
                                customerIdLoading: false
                            })
                            setFieldError("customerId", err.message)
                        }
                    }
                    const confirmAddress = () => setStatus({...status, addressConfirmedByUser: true})
                    const onFormKeyDown: KeyboardEventHandler<HTMLFormElement> = (event) => {
                        if ((event.charCode || event.keyCode) === 13 && (!dirty || !customerIdVerified || !addressConfirmedByUser || customerIdLoading)) {
                            event.preventDefault()
                            if (!customerIdVerified) {
                                confirmCustomerId()
                                return
                            }
                            if (!addressConfirmedByUser) {
                                confirmAddress()
                            }
                        }
                    }
                    return (<Form onKeyDown={onFormKeyDown}>
                        <Field
                            labelText="Please Enter Your Customer ID:"
                            name="customerId"
                            formControlProps={{id: "customer_id"}}
                            disabled={customerIdLoading || customerIdVerified}
                            component={FormikTextField}
                            afterInput={
                                <Button
                                    px={10}
                                    onClick={() => confirmCustomerId()}
                                    isLoading={customerIdLoading}
                                    disabled={!dirty || customerIdVerified || customerIdLoading}
                                    loadingText="Submitting"
                                    colorScheme={customerIdVerified ? "green" : "gray"}
                                >
                                    {customerIdVerified ? "Submitted" : "Submit"}
                                </Button>
                            }
                        />
                        {customerIdVerified && (
                            <>
                                <Field
                                    name="addressText"
                                    disabled={true}
                                    labelText="Please Confirm Your Address:"
                                    component={FormikTextField}
                                    formControlProps={{id: "customer_address"}}
                                    afterInput={
                                        <Button
                                            px={10}
                                            disabled={addressConfirmedByUser}
                                            onClick={() => confirmAddress()}
                                            colorScheme={addressConfirmedByUser ? "green" : "gray"}
                                        >
                                            {addressConfirmedByUser
                                                ? "Confirmed"
                                                : "Confirm"}
                                        </Button>
                                    }
                                />
                                {addressConfirmedByUser && (
                                    <>
                                        <Field
                                            formControlProps={{id: "customer_rating"}}
                                            labelText="How would you rate our service?"
                                            name="customerRating"
                                            component={FormikRatingField}
                                        />
                                        {customerRating > 0 && (
                                            <>
                                                <Field
                                                    formControlProps={{id: "customer_comment"}}
                                                    labelText={
                                                        isGoodRating(customerRating)
                                                            ? "Please provide additional comments for us to improve upon."
                                                            : "Sorry about that. Can you tell us what went wrong?"
                                                    }
                                                    name="customerComment"
                                                    component={FormikTextareaField}
                                                />
                                                <Button mt={5} type="submit" isLoading={isSubmitting}
                                                        disabled={!values.customerComment || isSubmitting}>
                                                    Submit Comment
                                                </Button>
                                            </>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </Form>)
                }
                }
            </Formik>
        </PageContainer>)
}

export default App;
