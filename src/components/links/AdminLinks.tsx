import { Button } from '@chakra-ui/react'
import React from 'react'
import { FiLogIn } from 'react-icons/fi'
import { MdOutlineCreate } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'

interface AdminLinksProps {
    logoutHandler: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const AdminLinks = ({ logoutHandler }: AdminLinksProps) => {

    return (
        <>
            <Link to="/addUsers">
                <Button size="sm" color="white" colorScheme="cyan">
                    Добавить пользователей
                </Button>
            </Link>
            <Link to="/addCourse">
                <Button size="sm" color="white" colorScheme="cyan">
                    Добавить курсы
                </Button>
            </Link>
            <Link to="/addLessons">
                <Button size="sm" color="white" colorScheme="cyan">
                    Добавить уроки
                </Button>
            </Link>

            <Link to="/profile">
                <Button size="sm" colorScheme="blue">
                    Личный кабинет
                </Button>
            </Link>

            <Link to="/login">
                <Button onClick={logoutHandler} size="sm" colorScheme="red">
                    Выйти
                </Button>
            </Link>
        </>
    )
}

export default AdminLinks