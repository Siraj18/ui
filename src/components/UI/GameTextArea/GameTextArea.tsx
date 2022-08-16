import { Box, HStack, Textarea, VStack } from '@chakra-ui/react'
import React from 'react'

interface GameTextAreaProps {
    value: string
    handleInputChange: any
    linesCount: number
}

const GameTextArea = ({ value, handleInputChange, linesCount }: GameTextAreaProps) => {

    let lines = []

    for (let i = 0; i < linesCount; i++) {
        lines.push(<span key={i}>{i + 1}</span>)
    }

    return (
        <HStack w="50%" h="100%">
            <VStack alignItems={"flex-end"} color={"green.600"} position={"relative"} fontSize={"16"} fontWeight={"bold"} pt="8px" spacing={"-0.5"} h="100%" >
                {lines}
            </VStack>
            <Box h="100%" w="100%" margin={"0px"}>
                <Textarea
                    resize={"none"}
                    h="100%"
                    roundedLeft={"none"}
                    bg="gray.600"
                    border={"none"}
                    rounded={"md"}
                    value={value}
                    color="yellow.300"
                    onChange={handleInputChange}
                    placeholder='Код сюда'
                    fontWeight={"bold"}
                />
            </Box>

        </HStack>
    )
}

export default GameTextArea