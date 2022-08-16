import { Box, Flex, VStack } from '@chakra-ui/react'
import React from 'react'

interface BoxContainerProps {
    children: React.ReactNode
}

const BoxContainer = ({ children }: BoxContainerProps) => {
    return (
        <Flex mb="5" h="100%" rounded="md" bg="white" align="center" justify="center" overflowY="auto">
            <Box h="100%" width="full" >

                {children}

            </Box>
        </Flex>
    )
}

export default BoxContainer