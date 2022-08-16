import { Box, Flex, HStack } from '@chakra-ui/react'
import React from 'react'

import FormPreview from '../components/FormPreview/FormPreview';
import LoginForm from '../components/LoginForm/LoginForm';

const LoginPage = () => {
    return (
        <Box h={"100%"}>
            <Flex bg="blue.100" align="center" justify="center" h="100%">
                <Box bg="white" p={10} width="full" maxW={900} rounded="md">
                    <HStack >
                        <FormPreview />
                        <LoginForm />
                    </HStack>
                </Box>
            </Flex>
        </Box>
    )
}

export default LoginPage