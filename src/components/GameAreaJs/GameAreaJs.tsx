import { Box, Button, Heading, HStack, useToast, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import GameTextArea from '../UI/GameTextArea/GameTextArea'


interface GameAreaJsProps {
    level: any
    courseId: any
}

const GameAreaJs = ({ level, courseId }: GameAreaJsProps) => {

    const [value, setValue] = useState("");

    const [nextButtonActive, setNextButtonActive] = useState(false)
    const [launchButtonActive, setLaunchButtonActive] = useState(true)

    const { user } = useTypedSelector(state => state.user)

    const [output, setOutput] = useState(">")

    let handleInputChange = (e: any) => {
        let inputValue = e.target.value
        setValue(inputValue)
    }

    const toast = useToast()

    useEffect(() => {
        checkWin()
    }, [output])

    const navigate = useNavigate()

    const { levels } = useTypedSelector(state => state.level)

    let nextLevel: any = {}
    if (levels && !level.isLast) {

        let newCounter = Number(level.counter) + 1
        nextLevel = levels.find((l: any) => l.counter === newCounter && l.courseId === Number(courseId))
    }

    let checkWin = () => {
        if (output == level.answer) {
            toast({
                title: 'Поздравляю!.',
                description: "Вы успешно завершили уровень.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })

            setNextButtonActive(true)
            setLaunchButtonActive(false)
            completeLevel(user.id, courseId)
        } else if (output !== ">") {
            toast({
                title: 'Ошибка!.',
                description: "К сожалению вы неправильно выполнили уровень.",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    let customSetOutput = (text: any) => {
        setOutput(text)
    }

    let handleButtonClick = (e: any) => {
        try {
            eval(value.replace('console.log(', 'customSetOutput('))
        } catch (e) {
            toast({
                title: 'Ошибка!.',
                description: "Ошибка в синтаксисе",
                status: 'warning',
                duration: 9000,
                isClosable: true,
            })
        }


    }
    let handleNextLevel = (e: any) => {
        e.preventDefault()

        if (level.isLast) {
            toast({
                title: 'Поздравляю!.',
                description: "Вы успешно завершили курс.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })

            navigate("/lessons")
        } else {
            navigate("/lesson/" + nextLevel.id + "/" + courseId)
            setNextButtonActive(false)
            setLaunchButtonActive(true)
            setOutput(">")
            setValue("")
        }
    }

    let handleRestartButtonClick = (e: any) => {
        setOutput(">")
        setValue("")
    }

    const completeLevel = async (userId: string, courseId: string) => {
        try {
            let response = await api.get("statistics/completeLevel?userId=" + userId + "&courseId=" + courseId)

            if (response.status !== 200) {
                console.log("ошибка заврешения уровня")
            }

            if (level.isLast) {
                response = await api.get("statistics/completeCourse?userId=" + userId + "&courseId=" + courseId)
                if (response.status !== 200) {
                    console.log("ошибка завершения курса")
                }
            }
        } catch (e) {
            console.log("some error:", e)
        }

    }

    return (
        <VStack w="100%">
            <HStack w="100%" h="600px">
                <Box p="5" textColor={"yellow"} h="100%" bg="gray.600" w="50%">
                    <Box textColor={"whiteAlpha.700"}>JS compiler: v0.1</Box>
                    {output}
                </Box>
                <GameTextArea linesCount={22} value={value} handleInputChange={handleInputChange} />
            </HStack>
            <HStack w="100%" justify={"flex-start"}>
                <Button isDisabled={!launchButtonActive} alignSelf={"flex-start"} onClick={handleButtonClick} colorScheme={"green"}>Запустить</Button>
                <Button isDisabled={!nextButtonActive} alignSelf={"flex-start"} onClick={handleNextLevel} colorScheme={"teal"}>Следующий уровень</Button>
                <Button alignSelf={"flex-start"} onClick={handleRestartButtonClick} colorScheme={"teal"}>Начать заново</Button>
            </HStack>

        </VStack>
    )
}

export default GameAreaJs