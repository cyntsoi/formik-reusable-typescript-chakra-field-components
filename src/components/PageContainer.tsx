import {Container, ContainerProps} from "@chakra-ui/react"
import React, {FC} from "react";

export const PageContainer : FC<ContainerProps> = (props) => {
    return <Container minH="100vh" py="10vh" display="flex" flexDirection="column"
                      justifyContent="center" {...props} />
}