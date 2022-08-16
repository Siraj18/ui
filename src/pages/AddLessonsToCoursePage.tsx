import { Button, Checkbox, FormControl, FormLabel, Heading, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Spinner, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/api'
import AddLevelItem from '../components/AddLevelItem/AddLevelItem'
import BoxContainer from '../components/UI/BoxContainer/BoxContainer'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'

const AddLessonsToCoursePage = () => {

    const { courseId } = useParams()

    const { levels, loading, error } = useTypedSelector(state => state.level)

    const { fetchLevelsByCourseId } = useActions()

    useEffect(() => {
        if (courseId) {
            fetchLevelsByCourseId(courseId);
        }

    }, []);


    const [loadingCreate, setLoading] = useState(false);
    const [errorCreate, setError] = useState("");

    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            stars: 0,
            tutorial: '',
            courseId: '',
            type: '',
            answer: '',
        },
        onSubmit: async (values) => {
            try {
                console.log("submit")
                setError("");
                setLoading(true);

                if (courseId) {
                    values["courseId"] = courseId
                }
                const response = await api.post("levels", values);

                setLoading(false);

                toast({
                    title: 'Успешно.',
                    description: "Вы успешно создали урок.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
                fetchLevelsByCourseId(courseId)

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
            <VStack px="5" pt="5" h="100%" w="100%">
                <Heading>
                    Управление уроками в курсе
                </Heading>
                <HStack alignSelf={"flex-start"}>
                    <Heading size="md">
                        Список уроков:
                    </Heading>
                    <Button colorScheme={"blue"} onClick={onOpen}>Создать+</Button>
                </HStack>

                {loading ? <Spinner alignSelf={"center"} /> :
                    <SimpleGrid alignSelf={"flex-start"} spacing={30} columns={2} pt="5">

                        {levels.map((level: any) => {
                            return <AddLevelItem key={level.id} level={level} />
                        })}

                    </SimpleGrid>
                }
            </VStack>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size="6xl"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Создать урок</ModalHeader>
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
                            <FormLabel>Инструкции:</FormLabel>
                            <Input name="tutorial" placeholder='Инструкции' onChange={formik.handleChange} value={formik.values.tutorial} type="text" />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Ответ:</FormLabel>
                            <Input name="answer" placeholder='Ответ' onChange={formik.handleChange} value={formik.values.answer} type="text" />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Тип игры:</FormLabel>
                            <Input name="type" placeholder='Тип игры' onChange={formik.handleChange} value={formik.values.type} type="text" />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Количество звезд</FormLabel>
                            <Input name="stars" placeholder='stars' onChange={formik.handleChange} value={formik.values.stars} type="number" />
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

export default AddLessonsToCoursePage