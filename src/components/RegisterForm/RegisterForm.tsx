import { Box, Button, FormLabel, Heading, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import InputField from '../UI/InputField/InputField'
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { BsFillPersonFill } from 'react-icons/bs';
import { useFormik } from 'formik';
import api from '../../api/api';

const RegisterForm = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const toast = useToast()

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            userClass: '',
            inviteCode: 'sample',
        },
        onSubmit: async (values) => {
            // api.post("")
            try {
                setError("");
                setSuccess(false);
                setLoading(true);
                const response = await api.post("users/register", values);
                setLoading(false);
                setSuccess(true);
                toast({
                    title: 'Успешно.',
                    description: "Вам на почту отправлено письмо с активацией.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })

            }
            catch (error: any) {
                setSuccess(false);
                setLoading(false);
                setError(error.response.data.message);
            }

        },
    });

    return (
        <Box w="100%">
            <Heading size="md" pb="4" color="blue.600" textAlign="center">Регистрация</Heading>
            <form onSubmit={formik.handleSubmit}>
                <VStack spacing={3} w="full">
                    <InputField handleChange={formik.handleChange} value={formik.values.firstName} name="firstName" text="Имя" type="text" > <BsFillPersonFill /> </InputField>
                    <InputField handleChange={formik.handleChange} value={formik.values.lastName} name="lastName" text="Фамилия" type="text" > <BsFillPersonFill /></InputField>
                    <InputField handleChange={formik.handleChange} value={formik.values.userClass} name="userClass" text="Класс" type="text" > <BsFillPersonFill /></InputField>
                    <InputField handleChange={formik.handleChange} value={formik.values.email} name="email" text="Email" type="email" > <HiOutlineMail /></InputField>
                    <InputField handleChange={formik.handleChange} value={formik.values.password} name="password" text="Пароль" type="password" > <RiLockPasswordLine /></InputField>

                    <FormLabel color={error ? "red.300" : "green.300"}>{!loading && error ? error : ""} {!loading && success && !error ? "Успешно" : ""}</FormLabel>

                    <Button isLoading={loading} type="submit" isFullWidth colorScheme="blue" >
                        Регистрация
                    </Button>
                </VStack>
            </form>
        </Box >

    )
}

export default RegisterForm