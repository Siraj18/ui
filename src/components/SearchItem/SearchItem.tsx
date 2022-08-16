import { Button, Divider, Heading, HStack, Spacer } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface SearchItemProps {
    name: string
    studentClass: string
    id: string
}



function SearchItem({ id, name, studentClass }: SearchItemProps) {

    const navigate = useNavigate();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        navigate("/profile/" + id);
    }

    return (
        <HStack w="100%" boxShadow={"xs"} p="5" rounded={"md"}>
            <Heading size={"md"}>{name}</Heading>
            <Divider orientation="vertical" />
            <Heading size={"sm"}>{studentClass}</Heading>
            <Spacer />
            <Button onClick={handleClick} colorScheme={"green"}>Открыть профиль</Button>
        </HStack>
    )
}

export default SearchItem