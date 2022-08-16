import { Box, Button, Container, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'

const HomePage = () => {
    return (
        <Box h="100%">
            <Container maxW={'5xl'}>
                <Stack
                    textAlign={'center'}
                    align={'center'}
                    spacing={{ base: 8, md: 10 }}
                    py={{ base: 20, md: 28 }}>
                    <Heading
                        fontWeight={600}
                        fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
                        lineHeight={'110%'}>
                        Научитесь программировать{' '}
                        <Text as={'span'} color={"blue.700"}>
                            с нуля!
                        </Text>
                    </Heading>
                    <Text color={'gray.500'} maxW={'3xl'}>
                        Чем раньше вы начнете обучаться у нас, тем большему опыту вы наберетесь!
                    </Text>
                    <Stack spacing={6} direction={'row'}>
                        <Button
                            rounded={'full'}
                            px={6}
                            colorScheme={'orange'}
                            bg={'blue.400'}
                            _hover={{ bg: 'blue.500' }}>
                            Начать сейчас
                        </Button>
                        <Button rounded={'full'} px={6}>
                            Узнать больше
                        </Button>
                    </Stack>
                    <Flex w={'full'}>
                        {/* <Illustration
                            height={{ sm: '24rem', lg: '28rem' }}
                            mt={{ base: 12, sm: 16 }}
                        /> */}
                    </Flex>
                </Stack>
            </Container>
        </Box >
    )
}

export default HomePage