import { Button } from '@chakra-ui/react'
import React from 'react'
import { FiLogIn } from 'react-icons/fi'
import { MdOutlineCreate } from 'react-icons/md'
import { Link } from 'react-router-dom'

const BasicLinks = () => {
    return (
        <>
            <Link to="/login">
                <Button size="sm" leftIcon={<FiLogIn />} color="white" colorScheme="cyan">
                    Войти
                </Button>
            </Link>


            <Link to="/register">
                <Button size="sm" leftIcon={<MdOutlineCreate />} colorScheme="blue">
                    Зарегистрироваться
                </Button>
            </Link>
        </>
    )
}

export default BasicLinks