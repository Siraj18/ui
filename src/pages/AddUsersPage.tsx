import { Box, Button, FormLabel, Heading, useToast, VStack } from '@chakra-ui/react'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { BsFillPersonFill } from 'react-icons/bs'
import { HiOutlineMail } from 'react-icons/hi'
import { RiLockPasswordLine } from 'react-icons/ri'
import api from '../api/api'
import BoxContainer from '../components/UI/BoxContainer/BoxContainer'
import InputField from '../components/UI/InputField/InputField'

const AddUsersPage = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const toast = useToast();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            inviteCode: 'sample',
        },
        onSubmit: async (values) => {
            // api.post("")
            try {
                setError("");
                setSuccess(false);
                setLoading(true);
                const response = await api.post("users/registerTeacher", values);
                setLoading(false);
                setSuccess(true);

                toast({
                    title: 'Успешно.',
                    description: "Вы успешно создали пользователя.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })

            }
            catch (err: any) {
                setSuccess(false);
                setLoading(false);

                if (err.response) {
                    setError(err.response.data.message);
                } else {
                    setError(error);
                }

                toast({
                    title: 'Ошибка.',
                    description: error,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })


            }

        },
    });


    return (
        <BoxContainer>
            <VStack px="5" h="100%" w="100%">
                <Heading alignSelf={"flex-start"} pt="5" size="lg">Добавление нового преподавателя</Heading>
                <Box w="50%" alignSelf={"flex-start"}>
                    <form onSubmit={formik.handleSubmit}>
                        <VStack spacing={3} w="100%">
                            <InputField handleChange={formik.handleChange} value={formik.values.firstName} name="firstName" text="Имя" type="text" > <BsFillPersonFill /> </InputField>
                            <InputField handleChange={formik.handleChange} value={formik.values.lastName} name="lastName" text="Фамилия" type="text" > <BsFillPersonFill /></InputField>
                            <InputField handleChange={formik.handleChange} value={formik.values.email} name="email" text="Email" type="email" > <HiOutlineMail /></InputField>
                            <InputField handleChange={formik.handleChange} value={formik.values.password} name="password" text="Пароль" type="password" > <RiLockPasswordLine /></InputField>

                            <FormLabel color={error ? "red.300" : "green.300"}>
                                {!loading && error ? error : ""} {!loading && success && !error ? "Успешно" : ""}
                            </FormLabel>

                            <Button isLoading={loading} type="submit" isFullWidth colorScheme="blue" >
                                Добавить
                            </Button>
                        </VStack>
                    </form>
                </Box>

            </VStack>
        </BoxContainer>
    )
}

export default AddUsersPage