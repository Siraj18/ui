import { Box, Button, Checkbox, Divider, Flex, Heading, HStack, Icon, Image, Radio, RadioGroup, Spacer, Spinner, Stack, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Course from '../components/Course/Course'
import BoxContainer from '../components/UI/BoxContainer/BoxContainer'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'


const LessonsPage = (): JSX.Element => {
    // Сделать список курсов
    // И внутри них уроки

    const [checkedBeginner, setCheckedBeginner] = useState(true);
    const [checkedMedium, setCheckedMedium] = useState(true);
    const [checkedHard, setCheckedHard] = useState(true);

    const lockedEnum = { ALL: "ALL", ONLYOPENED: "ONLYOPENED" }


    const [locked, setLocked] = useState(lockedEnum.ALL);

    // Это брать с сервера, то есть из редакса

    const { courses, loading } = useTypedSelector(state => state.course)

    const { user } = useTypedSelector(state => state.user)

    const { statistic } = useTypedSelector(state => state.statistic)

    const { completedCourses } = useTypedSelector(state => state.completedCourse)
    const { fetchStatistic, fetchCompletedCourses, fetchUsers } = useActions()

    const { fetchCourses } = useActions()

    useEffect(() => {

        fetchUsers()
        if (user.id) {
            fetchStatistic(user.id)
            fetchCompletedCourses(user.id)
        }
        fetchCourses()

    }, []);

    let reduxCourses = [
        {
            id: 0,
            level: 0,
            name: "Базовые навыки",
            description: "Базовый курс для обучения базовым навыкам",
            isBonus: false,
        },
        {
            id: 1,
            level: 1,
            name: "Базовые навыки",
            description: "Базовый курс для обучения базовым навыкам",
            isBonus: false,
        },
        {
            id: 2,
            level: 2,
            name: "Базовые навыки",
            description: "Базовый курс для обучения базовым навыкам",
            isBonus: false,
        },
        {
            id: 3,
            level: 2,
            name: "Базовые навыки",
            description: "Базовый курс для обучения базовым навыкам",
            isBonus: true,
        },
    ]

    let filterCourses = courses.filter((course: any) => {
        if (checkedBeginner && course.level === 0) {
            return course;
        }

        if (checkedMedium && course.level === 1) {
            return course;
        }

        if (checkedHard && course.level === 2) {
            return course;
        }
    });


    // Здесь подгружаем статистику



    filterCourses = filterCourses.filter((course: any) => {
        // Здесь поменять !
        if (statistic.maxCourse < course.level) {
            course["isLocked"] = true;
        }

        completedCourses.forEach((completeCourse: any) => {
            if (completeCourse.id === course.id) {
                course["isCompleted"] = true;
                course["isLocked"] = true;
            }
        });

        if (locked === lockedEnum.ALL) {
            return course;
        }

        if (locked === lockedEnum.ONLYOPENED && !course.isLocked) {
            return course;
        }
    });





    let finalCourses = filterCourses.map((course: any) =>
        <Course
            id={course.id}
            key={course.id}
            level={course.level}
            name={course.name}
            description={course.description}
            isLocked={course.isLocked}
            isBonus={course.isBonus}
            isCompleted={course.isCompleted}
        />
    )


    return (
        <BoxContainer>
            <VStack px="5" alignItems="flex-start" h="100%">
                <Heading pl="5" pt="5" alignSelf={"left"}>Список курсов</Heading>
                <Box px="5" pt="5" h="100%" width={"100%"} rounded={"md"} overflowY="auto">
                    <HStack h="100%">
                        <Flex w="100%" h="100%" flexWrap={"wrap"}>
                            {loading && <Spinner />}
                            {!loading && finalCourses}

                        </Flex>

                        <Box rounded={"md"} alignSelf={"flex-start"} h="500px" w="200px" bg="white" boxShadow={"lg"}>
                            <Flex bg={"teal.200"} justifyContent={"center"} alignItems="center" w="100%" h="30px" overflow={"hidden"} borderTopRadius="md">
                                <Heading color={"white"} size="md">{"Фильтры:"}</Heading>
                            </Flex>

                            <VStack mt="2" px="5" w="100%">
                                <VStack w="100%" >
                                    <Heading alignSelf={"flex-start"} color="gray.500" size={"xs"}>Сложность:</Heading>
                                    <Checkbox
                                        isChecked={checkedBeginner}
                                        alignSelf={"flex-start"}
                                        onChange={(e) => setCheckedBeginner(!checkedBeginner)}
                                    >
                                        Beginner
                                    </Checkbox>
                                    <Checkbox isChecked={checkedMedium} alignSelf={"flex-start"} onChange={(e) => setCheckedMedium(!checkedMedium)}>Medium</Checkbox>
                                    <Checkbox isChecked={checkedHard} alignSelf={"flex-start"} onChange={(e) => setCheckedHard(!checkedHard)}>Hard</Checkbox>
                                </VStack>
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

export default LessonsPage