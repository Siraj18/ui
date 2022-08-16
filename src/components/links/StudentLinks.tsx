import { Button } from '@chakra-ui/react'
import React from 'react'
import { FiLogIn } from 'react-icons/fi'
import { MdOutlineCreate } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'

interface StudentLinksProps {
    logoutHandler: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const StudentLinks = ({ logoutHandler }: StudentLinksProps) => {

    return (
        <>
            <Link to="/lessons">
                <Button size="sm" color="white" colorScheme="cyan">
                    Уроки
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

export default StudentLinks