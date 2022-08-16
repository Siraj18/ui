import { Button } from '@chakra-ui/react'
import React from 'react'
import { FiLogIn } from 'react-icons/fi'
import { MdOutlineCreate } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'

interface TeacherLinksProps {
    logoutHandler: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const TeacherLinks = ({ logoutHandler }: TeacherLinksProps) => {

    return (
        <>

            <Link to="/searchStudents">
                <Button size="sm" color="white" colorScheme="cyan">
                    Поиск учеников
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

export default TeacherLinks