import { Avatar, Box, Button, Flex, Heading, HStack, Icon, Spacer } from '@chakra-ui/react'
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from 'react'
import { BsJournalCode } from 'react-icons/bs';
import { FiLogIn } from 'react-icons/fi';
import { MdOutlineCreate } from 'react-icons/md';
import BasicLinks from '../links/BasicLinks';
import StudentLinks from '../links/StudentLinks';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import TeacherLinks from '../links/TeacherLinks';
import AdminLinks from '../links/AdminLinks';

interface HeaderProps {
    isAuth: boolean
    role: number
}

const Header = ({ isAuth, role }: HeaderProps) => {

    const navigate = useNavigate();
    const { loginUser } = useActions();
    const { user, loading, error } = useTypedSelector(state => state.user);

    const logoutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        localStorage.setItem("token", "");
        loginUser();
        navigate("/");
    }


    return (
        <Flex
            bg="white"
            my="3"
            as="header"
            minHeight="70"
            width="full"
            boxShadow="sm"
            rounded="md"

        >
            <Flex px="5" alignItems="center" w="full">
                <HStack w="100%">
                    <Link to="/">
                        <HStack>
                            <Icon w="8" h="8" color="blue.600" as={BsJournalCode} />
                            <Heading fontWeight="600" pl="2" color="blue.600" size="sm">
                                LEARN CODE
                            </Heading>
                        </HStack>

                    </Link>

                    <Spacer />
                    <HStack>
                        {!isAuth && <BasicLinks />}
                        {isAuth && user.role === 1 && <StudentLinks logoutHandler={logoutHandler} />}
                        {isAuth && user.role === 2 && <TeacherLinks logoutHandler={logoutHandler} />}
                        {isAuth && user.role === 0 && <AdminLinks logoutHandler={logoutHandler} />}
                    </HStack>

                </HStack>


            </Flex>

        </Flex >
    )
}

export default Header