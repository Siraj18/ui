import { FormControl, FormLabel, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import React from 'react'
import { HiOutlineMail } from 'react-icons/hi';

interface IInputFieldProps {
    text?: string
    value: string
    name: string
    type: string
    handleChange: any
    children?: React.ReactNode
}


const InputField = ({ name, text, type, children, value, handleChange }: IInputFieldProps) => {
    return (
        <FormControl>

            {text && <FormLabel color="blue.600" htmlFor={name}>{text}</FormLabel>}
            <InputGroup>
                <InputLeftAddon color="blue.600" children={children} />
                <Input
                    id={name}
                    name={name}
                    type={type}
                    variant="outline"
                    value={value}
                    onChange={handleChange}
                />
            </InputGroup>


        </FormControl>
    )
}

export default InputField