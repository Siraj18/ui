import { Button, Divider, Text, Heading, HStack, Select, Spacer, Spinner, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs';
import SearchItem from '../components/SearchItem/SearchItem';
import BoxContainer from '../components/UI/BoxContainer/BoxContainer'
import InputField from '../components/UI/InputField/InputField'
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';

function SearchStudentsPage() {

    const [searchValue, setSearchValue] = useState("");
    const [searchOption, setSearchOption] = useState("По имени")

    let { students, loading, error } = useTypedSelector(state => state.search);
    const { searchStudents } = useActions();

    const changeSelect = (e: any) => {
        setSearchOption(e.target.value)
    }

    const handleInput = (e: any) => {
        setSearchValue(e.target.value)
    }

    const search = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (searchOption === "По имени") {
            searchStudents(searchValue, false)
        } else {
            searchStudents(searchValue, true)
        }


    }

    return (
        <BoxContainer>
            <VStack px="5" h="100%" w="100%">
                <Heading pt="5">Поиск учеников</Heading>
                <HStack w="100%" pt="5">
                    <InputField handleChange={handleInput} value={searchValue} name="firstName" type="text" > <BsSearch /> </InputField>
                    <Select maxW={"300px"} value={searchOption} onChange={changeSelect}>
                        <option value='По имени'>По имени</option>
                        <option value='По классу'>По классу</option>
                    </Select>
                    <Spacer />
                    <Button onClick={search} w="400px" colorScheme={"blue"}>Поиск</Button>
                </HStack>

                <VStack w="100%" pt="5">
                    {
                        loading && <Spinner />
                    }
                    {!loading && error && <Text color={"red.400"}>{error}</Text>}

                    {!loading && !error && students.length === 0 && <Text>По такому запросу ничего не найдено</Text>}
                    {!loading && !error && students.map((student: any) => {
                        return <SearchItem
                            key={student.id}
                            id={student.id}
                            name={student.firstName + " " + student.lastName}
                            studentClass={student.userClass}
                        />
                    })}

                </VStack>
            </VStack>
        </BoxContainer>
    )
}

export default SearchStudentsPage