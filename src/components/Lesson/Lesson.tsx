import { Box, Divider, Heading, Text, HStack, Icon, Image, VStack, Button, Spacer, Badge } from '@chakra-ui/react'
import React from 'react'
import { AiFillStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

interface LessonProps {
    id: number
    courseId: number
    name: string
    description: string
    starsCount: number
    bgImage: string
    isLocked?: boolean
    isComplete?: boolean
}


const Lesson = ({ isLocked = false, isComplete = false, courseId, id, name, description, starsCount, bgImage }: LessonProps) => {
    let stars = [];

    const navigate = useNavigate();

    for (let i = 0; i < starsCount; i++) {
        stars.push(<Icon key={i} w="8" h="8" color="yellow.500" as={AiFillStar} />)
    }

    const handleLaunchClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        navigate("/lesson/" + id + "/" + courseId)
    };

    return (
        <Box mb="5" bg="yellow.50" width="100%" boxShadow={"lg"} rounded="md">

            <Box textAlign={"center"} w="100%" h="50px" overflow={"hidden"} borderTopRadius="md">
                <Image w="100%" src={bgImage} />
            </Box>
            <HStack p="5">
                <VStack justifyContent={"center"} alignItems="center">
                    <Heading textAlign={"center"} size="md">{name}</Heading>
                    <HStack alignItems={"center"} wrap="wrap">

                        {stars}
                    </HStack>

                </VStack>
                <Divider w="5px" h="10px" variant={"solid"} orientation="vertical" />

                <Text alignSelf="flex-start">{description}</Text>
                <Spacer />
                {isLocked && !isComplete && <Badge colorScheme={"red"}>Пройдите предыдущий уровень, чтобы открыть этот</Badge>}
                {isLocked && isComplete && <Badge colorScheme={"yellow"}>Вы закончили этот урок</Badge>}


                <Button onClick={handleLaunchClick} minW={"100px"} colorScheme={"yellow"} disabled={isLocked}>{isLocked ? "Недоступно" : "Начать"}</Button>

            </HStack>
        </Box>
    );
}

export default Lesson