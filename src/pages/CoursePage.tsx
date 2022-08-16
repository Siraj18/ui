import { Box, Flex, Heading, HStack, Radio, RadioGroup, Stack, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import Lesson from '../components/Lesson/Lesson';
import BoxContainer from '../components/UI/BoxContainer/BoxContainer';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import LessonsPage from './LessonsPage';

const CoursePage = () => {

    let { courseId } = useParams();

    // fetchCourseLessons(courseId) примерный запрос

    const lockedEnum = { ALL: "ALL", ONLYOPENED: "ONLYOPENED" }


    const [locked, setLocked] = useState(lockedEnum.ALL);

    const { levels } = useTypedSelector(state => state.level);
    const { user } = useTypedSelector(state => state.user);
    const { statistic } = useTypedSelector(state => state.statistic);

    const { fetchLevelsByCourseId, fetchStatistic, fetchUsers, fetchCounterByCourseIdAndStatisticId } = useActions()

    const { counter } = useTypedSelector(state => state.counter)

    useEffect(() => {

        fetchUsers()
        if (user.id) {
            fetchStatistic(user.id)
            if (statistic.id) {
                fetchCounterByCourseIdAndStatisticId(courseId, statistic.id)
            }

            fetchLevelsByCourseId(courseId)
        }

    }, []);

    let fetchLessons = [
        {
            id: 0,
            name: "Уровень 1",
            description: "Описание",
            starsCount: 3,
            bgImage: "https://kartinkin.net/uploads/posts/2021-07/1625262830_31-kartinkin-com-p-fon-roboti-krasivie-foni-32.jpg",
            isLocked: false,
        },
        {
            id: 1,
            name: "Уровень 2",
            description: "Описание",
            starsCount: 2,
            bgImage: "https://img4.goodfon.ru/original/1280x1024/e/3a/tekstura-poverkhnost-stena-piktogrammy-trassa-shlem-avtomobi.jpg",
            isLocked: false,
        },
        {
            id: 2,
            name: "Уровень 2",
            description: "Описание",
            starsCount: 2,
            bgImage: "https://img4.goodfon.ru/original/1280x1024/e/3a/tekstura-poverkhnost-stena-piktogrammy-trassa-shlem-avtomobi.jpg",
            isLocked: true,
        },


    ]

    let filterLessons = levels.filter((lesson: any) => {
        lesson["isLocked"] = false

        if (Number(counter) + 1 < lesson.counter) {
            lesson["isLocked"] = true
        }

        if (Number(counter) + 1 > lesson.counter) {
            lesson["isComplete"] = true
            lesson["isLocked"] = true
        }

        if (locked === lockedEnum.ALL) {
            return lesson;
        }

        if (locked === lockedEnum.ONLYOPENED && !lesson.isLocked) {
            return lesson;
        }

    });

    let finalLessons = filterLessons.map((lesson: any) => {
        return <Lesson
            id={lesson.id}
            key={lesson.id}
            courseId={lesson.courseId}
            name={lesson.name}
            description={lesson.description}
            starsCount={lesson.stars}
            isComplete={lesson.isComplete}
            bgImage={"https://kartinkin.net/uploads/posts/2021-07/1625262830_31-kartinkin-com-p-fon-roboti-krasivie-foni-32.jpg"}
            isLocked={lesson.isLocked}
        />
    })

    return (
        <BoxContainer>
            <VStack px="5" alignItems="flex-start" h="100%">
                <Heading pl="5" pt="5" alignSelf={"left"}>Список Уроков</Heading>
                <Box px="5" pt="5" h="100%" width={"100%"} rounded={"md"} overflowY="auto">

                    <HStack h="100%">
                        <Flex direction={"column"} w="100%" h="100%" pr="5">
                            {finalLessons}
                        </Flex>


                        {"фильтр"}
                        <Box rounded={"md"} alignSelf={"flex-start"} h="500px" w="200px" bg="white" boxShadow={"lg"}>
                            <Flex bg={"teal.200"} justifyContent={"center"} alignItems="center" w="100%" h="30px" overflow={"hidden"} borderTopRadius="md">
                                <Heading color={"white"} size="md">{"Фильтры:"}</Heading>
                            </Flex>

                            <VStack mt="2" px="5" w="100%">

                                <VStack w="100%" justify={"center"} alignItems="center">
                                    <Heading alignSelf={"flex-start"} color="gray.500" size={"xs"}>Доступность:</Heading>

                                    <RadioGroup onChange={setLocked} value={locked} >
                                        <Stack direction='column'>
                                            <Radio value={lockedEnum.ONLYOPENED}>Только доступные</Radio>
                                            <Radio value={lockedEnum.ALL}>Все</Radio>
                                        </Stack>
                                    </RadioGroup>
                                </VStack>
                            </VStack>
                        </Box>
                    </HStack>

                </Box>

            </VStack >

        </BoxContainer >
    )
}

export default CoursePage