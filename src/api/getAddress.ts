import {Address} from "../types/Address"
import {Customer} from "../types/Customer"
import {formatErrorMessage} from "./utils"

const customers: Array<Customer> = [
    {
        id: "CYN",
        addressId: "cynshome"
    },
    {
        id: "41-ET",
        addressId: "test"
    },
    {
        id: "WEIRD-PERSON",
        addressId: "5"
    }
]

const addresses: Array<Address> = [
    {
        id: "test",
        address: "the test address"
    },
    {
        id: "cynshome",
        address: "ABC Street"
    }
]

export const fetchAddress = (addressId: string) => {
    return new Promise((res, rej) => {
        if (!addressId) {
            rej(formatErrorMessage("Customer does not have an address."))
        }
        setTimeout(() => {
            const address = addresses.find(
                (address) => address.id === addressId
            )
            if (typeof address !== "undefined") {
                res(address)
            }
            rej(formatErrorMessage("Address ID not found."))
        }, 1000)
    })
}

export const fetchCustomer = (customerId: string): Promise<Customer> => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            const customer = customers.find((customer) => customer.id === customerId)
            if (typeof customer !== "undefined") {
                res(customer)
            }
            rej(formatErrorMessage("Customer ID not found."))
        }, 1000)
    })
}

export const fetchCustomerAddress = (customerId: string) => {
    return fetchCustomer(customerId).then(({addressId}) => fetchAddress(addressId))
}

export default fetchCustomerAddress
