import { Avatar, Box, Container, Flex, HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import UserInfo from '../components/UserInfo/UserInfo'

const ProfilePage = (): JSX.Element => {
    return (
        <Box pb="5" h="100%">
            <Flex align="center" justify="center" h="100%">
                <Box h="100%" bg="white" p={10} width="full" rounded="md">
                    <VStack>
                        <UserInfo />
                    </VStack>
                </Box>
            </Flex>
        </Box>
    )
}

export default ProfilePage