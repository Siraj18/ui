import { Box, Button, FormLabel, Heading, toast, useToast, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import InputField from '../UI/InputField/InputField'
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { BsFillPersonFill } from 'react-icons/bs';
import { useFormik } from 'formik';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';

const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { loginUser } = useActions();

    const toast = useToast();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            try {
                setError("");
                setLoading(true);

                const response = await api.post("users/login", values);

                setLoading(false);

                localStorage.setItem("token", response.data.token);
                loginUser();

                toast({
                    title: 'Успешно.',
                    description: "Вы успешно авторизировались.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })


                navigate("/profile");
            }
            catch (e: any) {
                setLoading(false);

                if (e.message) {
                    if (e.response) {
                        setError(e.response.data.message);
                    } else {
                        setError(e.message);
                    }

                    toast({
                        title: 'Ошибка.',
                        description: error,
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    })
                    return;
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
        <Box w="100%">
            <Heading size="md" pb="4" color="blue.600" textAlign="center">Авторизация</Heading>
            <form onSubmit={formik.handleSubmit}>
                <VStack spacing={3} w="full">
                    <InputField handleChange={formik.handleChange} value={formik.values.email} name="email" text="Email" type="email" > <HiOutlineMail /></InputField>
                    <InputField handleChange={formik.handleChange} value={formik.values.password} name="password" text="Пароль" type="password" > <RiLockPasswordLine /></InputField>

                    <FormLabel color={"red.300"}>{!loading && error ? error : ""}</FormLabel>

                    <Button isLoading={loading} type="submit" isFullWidth colorScheme="blue" >
                        Авторизация
                    </Button>
                </VStack>
            </form>
        </Box>

    )
}

export default LoginForm