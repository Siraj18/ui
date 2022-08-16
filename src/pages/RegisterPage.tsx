import { Box, Flex, HStack, Icon, Spacer } from '@chakra-ui/react'
import React from 'react'

import RegisterForm from '../components/RegisterForm/RegisterForm'
import FormPreview from '../components/FormPreview/FormPreview';

const RegisterPage = () => {
    return (
        <Box h={"100%"}>
            <Flex align="center" justify="center" h="100%">
                <Box boxShadow="xl" bg="white" p={10} width="full" maxW={900} rounded="md">
                    <HStack >
                        <FormPreview />
                        <RegisterForm />
                    </HStack>
                </Box>
            </Flex>
        </Box>
    )
}

export default RegisterPage