import { Button, Checkbox, FormControl, FormLabel, Heading, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, useDisclosure, useToast } from '@chakra-ui/react'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import api from '../../api/api'
import { useActions } from '../../hooks/useActions'

interface AddLevelItemProps {
    level: any
}

const AddLevelItem = ({ level }: AddLevelItemProps) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [isBonus, setIsBonus] = useState(false);

    const { fetchLevelsByCourseId } = useActions();
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [error, setError] = useState("");

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            setError("");
            setLoadingDelete(true);

            const response = await api.delete("levels/" + level.id);
            setLoadingDelete(false);
            fetchLevelsByCourseId(level.courseId)

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
            id: level.id,
            name: level.name,
            description: level.description,
            stars: level.stars,
            tutorial: level.tutorial,
            answer: level.answer,
            type: level.type,
        },
        onSubmit: async (values) => {
            try {
                setError("");
                setLoading(true);

                const response = await api.put("levels/update", values);

                setLoading(false);

                toast({
                    title: 'Успешно.',
                    description: "Вы успешно обновили урок.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
                fetchLevelsByCourseId(level.courseId)

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
                <Heading size={"xs"}>{level.name}</Heading>
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
                    <ModalHeader>Редактировать урок</ModalHeader>
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

export default AddLevelItem