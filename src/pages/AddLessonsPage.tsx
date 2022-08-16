import { Box, Button, Checkbox, FormControl, FormLabel, Heading, HStack, SimpleGrid, Spinner, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import BoxContainer from '../components/UI/BoxContainer/BoxContainer'
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';

const AddLessonsPage = () => {
    const { courses, loading, error } = useTypedSelector(state => state.course);
    const { fetchCourses } = useActions();

    useEffect(() => {
        fetchCourses();
    }, []);

    const navigate = useNavigate()

    const handleNavigate = (id: any) => {
        navigate("/addLessons/" + id)
    }

    
    return (
        <BoxContainer>
            <VStack px="5" w="100%" h="100%">
                <Heading pt="5">Управление уроками</Heading>
                <Box alignSelf={"flex-start"}>
                    <HStack>
                        <Heading pr="5" size={"md"}>Список курсов:</Heading>
                    </HStack>

                    {loading ? <Spinner alignSelf={"center"} /> :
                        <SimpleGrid spacing={30} columns={2} pt="5">

                            {courses.map((course: any) => {
                                return <VStack p="5" rounded={"md"} boxShadow="md">
                                    <Heading size="md">{course.name}</Heading>
                                    <Button colorScheme={"green"} onClick={(e) => handleNavigate(course.id)}>Открыть курс</Button>
                                </VStack>
                            })}

                        </SimpleGrid>
                    }

                </Box>
            </VStack>
            
        </BoxContainer>
    )
}

export default AddLessonsPage