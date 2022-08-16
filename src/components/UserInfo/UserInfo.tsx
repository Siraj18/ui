import { Avatar, Badge, Box, Button, CircularProgress, Heading, HStack, SimpleGrid, Skeleton, SkeletonCircle, SkeletonText, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { FaMedal } from 'react-icons/fa';
import zipcelx from 'zipcelx';

const UserInfo = () => {
    const { user, loading, error } = useTypedSelector(state => state.user);

    const studentState = useTypedSelector(state => state.student);

    const { fetchUsers, fetchStudent, fetchCompletedCourses, fetchCourses, fetchStatistic, fetchCounterByCourseIdAndStatisticId } = useActions();

    const { profileId } = useParams();

    const { courses } = useTypedSelector(state => state.course)
    const { completedCourses } = useTypedSelector(state => state.completedCourse)
    const { statistic } = useTypedSelector(state => state.statistic)

    let handleExportStatisticsClick = (e: any) => {
        console.log("allo")

        let config: any = {}

        let rang = "Начинающий"

        switch (statistic.maxCourse) {
            case 0:
                rang = "Начинающий"
                break
            case 1:
                rang = "Средний"
                break
            case 2:
                rang = "Профессионал"
                break
        }


        config = {
            filename: String(currentUser.firstName) + "_statistics",
            sheet: {
                data: [
                    [{
                        value: 'Фамилия',
                        type: 'string'
                    }, {
                        value: 'Имя',
                        type: 'string'
                    },
                    {
                        value: 'Ранг',
                        type: 'string'
                    },
                    {
                        value: 'Кол-во завершенных курсов',
                        type: 'string'
                    },
                    {
                        value: 'Кол-во завершенных задач',
                        type: 'string'
                    },
                    ],
                    [{
                        value: String(currentUser.firstName),
                        type: 'string'
                    }, {
                        value: String(currentUser.lastName),
                        type: 'string'
                    },
                    {
                        value: rang,
                        type: 'string'
                    },
                    {
                        value: String(completedCourses.length),
                        type: 'string'
                    },
                    {
                        value: String(3),
                        type: 'string'
                    }
                    ]
                ]
            }
        };

        zipcelx(config)

    }

    let currentUser: any = {}

    useEffect(() => {
        if (profileId) {
            fetchStudent(profileId);
            fetchCourses();
            fetchCompletedCourses(profileId);
            fetchStatistic(profileId)
        } else {
            fetchUsers();
            fetchCourses();
            fetchCompletedCourses(user.id);
            fetchStatistic(user.id)
        }

    }, []);

    if (loading || studentState.loading) {
        return (
            <HStack>
                <SkeletonCircle size="40" />
                <SkeletonText noOfLines={4} spacing='4' >
                    <Heading size="4xl">
                        Загрузка пользователя
                    </Heading>
                </SkeletonText>
            </HStack>

        );
    }

    if (profileId && !studentState.student) {
        <Box>
            <Heading>Пользователь с таким id не найден</Heading>
        </Box>
    }

    if (profileId && user.role === 2) {
        currentUser = studentState.student
    } else {
        currentUser = user
    }

    let val = 0;

    if (courses.length !== 0) {
        val = (completedCourses.length / courses.length) * 100;
    }

    let levelsComplete = 0;


    return (
        <VStack h="100%" w="100%">
            <HStack w="100%">
                <Avatar size="2xl" name={currentUser.firstName + ' ' + currentUser.lastName} />

                <VStack pl="5" alignItems={"flex-start"}>
                    <Heading size={"lg"}>
                        {
                            currentUser.firstName
                        }
                    </Heading>
                    <Heading size={"md"}>
                        {
                            currentUser.lastName
                        }
                    </Heading>
                    <Badge>
                        {currentUser.role === 0 && "Админ"}
                        {currentUser.role === 1 && "Ученик"}
                        {currentUser.role === 2 && "Преподаватель"}
                    </Badge>
                    {currentUser.role === 1 && <Badge>{currentUser.userClass}</Badge>}
                    <Badge>
                        {
                            currentUser.email
                        }
                    </Badge>
                </VStack>
            </HStack>

            <Box pt="5" alignSelf={"flex-start"}>
                <Heading>Общая статистика:</Heading>
                {currentUser.role === 1 && <SimpleGrid mt="5" columns={3} spacing={2}>
                    <HStack border={"1px"} p="5" rounded={"md"} boxShadow={"md"}>
                        <VStack>
                            <Heading size={"sm"}>Ранг:</Heading>
                            {statistic.maxCourse == 0 && <Heading size="md">Начинающий</Heading>}
                            {statistic.maxCourse == 1 && <Heading size="md">Средний</Heading>}
                            {statistic.maxCourse == 2 && <Heading size="md">Профессионал</Heading>}

                            {statistic.maxCourse == 0 && <FaMedal color="green" size="60px" />}
                            {statistic.maxCourse == 1 && <FaMedal color="yellow" size="60px" />}
                            {statistic.maxCourse == 2 && <FaMedal color="red" size="60px" />}
                        </VStack>
                    </HStack>

                    <HStack border={"1px"} p="5" rounded={"md"} boxShadow={"md"}>
                        <VStack>
                            <Heading size={"sm"}>Пройдено курсов:</Heading>
                            <Heading color={"green.600"}>{completedCourses.length}</Heading>
                            <CircularProgress size="130px" color={"green.600"} value={val} />
                        </VStack>
                    </HStack>

                    <HStack border={"1px"} p="5" rounded={"md"} boxShadow={"md"}>
                        <VStack>
                            <Heading size={"sm"}>Выполнено задач:</Heading>
                            <Heading color={"blue.600"}>3</Heading>
                            <CircularProgress size="130px" color={"blue.600"} value={30} />
                        </VStack>
                    </HStack>
                </SimpleGrid>}

            </Box>

            <HStack alignSelf={"flex-end"}>
                {user.role === 1 &&
                    <Button colorScheme={"blue"} onClick={handleExportStatisticsClick}>
                        Экспорт статистики
                    </Button>
                }

                {user.role === 2 && profileId &&
                    <Button colorScheme={"blue"} onClick={handleExportStatisticsClick}>
                        Экспорт статистики
                    </Button>
                }

            </HStack>

        </VStack >

    )
}

export default UserInfo