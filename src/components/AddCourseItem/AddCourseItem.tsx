import { Button, Checkbox, FormControl, FormLabel, Heading, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, useDisclosure, useToast } from '@chakra-ui/react'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import api from '../../api/api'
import { useActions } from '../../hooks/useActions'

interface AddCourseItemProps {
    course: any
}

const AddCourseItem = ({ course }: AddCourseItemProps) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [isBonus, setIsBonus] = useState(false);

    const { fetchCourses } = useActions();
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [error, setError] = useState("");

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            setError("");
            setLoadingDelete(true);

            const response = await api.delete("courses/" + course.id);
            setLoadingDelete(false);
            fetchCourses();

        }
        catch (e: any) {
            setLoadingDelete(false);

            if (e.message) {
                if (e.response) {
                    setError(e.response.data.message);
                } else {
                    setError(e.message);
                }

            }

        }
    }

    // Здесь апдейт
    const toast = useToast();
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            id: course.id,
            name: course.name,
            description: course.description,
            level: course.level,
            isBonus: course.isBonus,
        },
        onSubmit: async (values) => {
            try {
                setError("");
                setLoading(true);

                const response = await api.put("courses/update", values);

                setLoading(false);

                toast({
                    title: 'Успешно.',
                    description: "Вы успешно обновили курс.",
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
        <>
            <HStack maxW="400px" p="2" rounded={"md"} boxShadow="base">
                <Heading size={"xs"}>{course.name}</Heading>
                <Spacer />
                <Button colorScheme={"green"} onClick={onOpen}>Редактировать</Button>
                <Button isLoading={loadingDelete} onClick={handleDelete} colorScheme={"red"}>X</Button>
            </HStack>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Редактировать курс</ModalHeader>
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
                        <Button isLoading={loading} onClick={(e) => formik.submitForm()} type="submit" colorScheme='blue' mr={3}>
                            Сохранить
                        </Button>
                        <Button onClick={onClose}>Отмена</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>

    )
}

export default AddCourseItem