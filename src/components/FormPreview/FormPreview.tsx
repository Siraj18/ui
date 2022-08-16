import { Heading, HStack, Icon, Image, Spacer, VStack } from '@chakra-ui/react'
import React from 'react'
import { BsJournalCode } from 'react-icons/bs';

const FormPreview = () => {
    return (

        <VStack justifyContent="center" width="100%">
            <Icon color="blue.600" w="20" h="20" as={BsJournalCode} width="60%" />
            <Heading fontWeight="extrabold" pb="5" size="lg" color="blue.600">LEARN CODE</Heading>

            <Image width="70%" src="https://learnsql.com/blog/how-to-practice-sql-joins/How-to-Practice-SQL-JOINs.jpg" />

        </VStack>


    )
}

export default FormPreview