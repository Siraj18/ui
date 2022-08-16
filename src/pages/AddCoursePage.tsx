import { Box, Heading, HStack, SimpleGrid, VStack, Text, Spacer, Button, Spinner, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, Checkbox, ModalFooter, useDisclosure, useToast } from '@chakra-ui/react'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import api from '../api/api'
import AddCourseItem from '../components/AddCourseItem/AddCourseItem'
import BoxContainer from '../components/UI/BoxContainer/BoxContainer'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'

const AddCoursePage = () => {

    const { courses, loading, error } = useTypedSelector(state => state.course);
    const { fetchCourses } = useActions();

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [isBonus, setIsBonus] = useState(false);

    useEffect(() => {
        fetchCourses();
    }, []);


    const [loadingCreate, setLoading] = useState(false);
    const [errorCreate, setError] = useState("");
    const toast = useToast();


    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            level: 0,
            isBonus: false,
        },
        onSubmit: async (values) => {
            try {
                console.log("submit")
                setError("");
                setLoading(true);

                const response = await api.post("courses", values);

                setLoading(false);

                toast({
                    title: 'Успешно.',
                    description: "Вы успешно создали курс.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
                fetchCourses();

            }
            catch (e: any) {
                setLoading(false);

                if (e.message) {
                    if (e.response) {
                        setError(e.response.data.message);
                    } else {
                        setError(e.message);
                    }
                }
            }
        },
    });


    return (
        <BoxContainer>
            <VStack px="5" w="100%" h="100%">
                <Heading pt="5">Управление курсами</Heading>
                <Box alignSelf={"flex-start"}>
                    <HStack>
                        <Heading pr="5" size={"md"}>Список курсов:</Heading>
                        <Button colorScheme={"blue"} onClick={onOpen}>Создать+</Button>
                    </HStack>

                    {loading ? <Spinner alignSelf={"center"} /> :
                        <SimpleGrid spacing={30} columns={2} pt="5">

                            {courses.map((course: any) => {
                                return <AddCourseItem key={course.id} course={course} />
                            })}

                        </SimpleGrid>
                    }

                </Box>
            </VStack>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Создать курс</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Название</FormLabel>
                            <Input value={formik.values.name} onChange={formik.handleChange} name="name" placeholder='Название' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Описание</FormLabel>
                            <Input value={formik.values.description} onChange={formik.handleChange} name="description" placeholder='Описание' />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Сложность</FormLabel>
                            <Input name="level" placeholder='Сложность' onChange={formik.handleChange} value={formik.values.level} type={"number"} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Бонусный</FormLabel>
                            <Checkbox name="isBonus" isChecked={formik.values.isBonus} onChange={formik.handleChange}>Да</Checkbox>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button isLoading={loadingCreate} onClick={(e) => formik.submitForm()} type="submit" colorScheme='blue' mr={3}>
                            Создать
                        </Button>
                        <Button onClick={onClose}>Отмена</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </BoxContainer>
    )
}

export default AddCoursePage