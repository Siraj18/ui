import { Box, Divider, Heading, Text, HStack, Icon, Image, VStack, Button, Spacer, Flex, Badge } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface CourseProps {
    id: number
    name: string
    description: string
    isLocked?: boolean
    level: number
    isBonus?: boolean
    isCompleted?: boolean
}


const Course = ({ id, isCompleted = false, level, name, isBonus = false, isLocked = false, description }: CourseProps) => {

    let colors = ["blue.200", "yellow.300", "red.400"]
    let colorSchemes = ["blue", "yellow", "red"]
    let levels = ["BEGINNER", "MEDIUM", "HARD"]


    let badgeCompleteText = ["", "Закончите хоть один BEGINNER курс", "Закончите хоть один MEDIUM курс"]

    const navigate = useNavigate();

    const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        navigate("/course/" + id);

    }

    return (
        <Box mt="5" mr="10" bg="yellow.50" height="250px" width="300px" boxShadow={"lg"} rounded="md">

            <Flex bg={isBonus ? "pink.300" : colors[level]} justifyContent={"center"} alignItems="center" w="100%" h="50px" overflow={"hidden"} borderTopRadius="md">
                <Heading color={"white"} size="md">{levels[level]}</Heading>
            </Flex>
            <VStack p="5" justifyContent={"center"} alignItems="center">
                <VStack justifyContent={"center"} alignItems="center">
                    <Heading textAlign={"center"} size="md">{name}</Heading>
                </VStack>
                <Divider w="100%" variant={"solid"} orientation="horizontal" />

                <Text textAlign={"center"}>{description}</Text>
                <Spacer />
                <Button onClick={clickHandler} minW={"100px"} colorScheme={isBonus ? "pink" : colorSchemes[level]} disabled={isLocked || isCompleted}>
                    {isLocked && !isCompleted && "Повысьте свой уровень"}
                    {isLocked && isCompleted && "Вы завершили данный курс"}
                    {!isLocked && isCompleted && "Вы завершили данный курс"}
                    {!isLocked && !isCompleted && "Начать"}
                </Button>
                {isLocked && !isCompleted && < Badge colorScheme={"red"}>{badgeCompleteText[level]}</Badge>}
                {isBonus && <Badge colorScheme={"yellow"}>Бонусный урок</Badge>}
                {isCompleted && <Badge colorScheme={"green"}>Вы завершили данный курс</Badge>}
            </VStack>
        </Box >
    );
}

export default Course