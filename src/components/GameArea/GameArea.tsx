import { Box, Button, HStack, useToast, VStack } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import api from '../../api/api'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import GameTextArea from '../UI/GameTextArea/GameTextArea'
import RobotImage from '../../assets/robot.png'
import BackgroundImage from '../../assets/background1.png'
import AimImage from '../../assets/aim.png'
import { useNavigate } from 'react-router-dom'

interface GameAreaProps {
    level: any
    courseId: any
}

let posX = 0;
let posY = 0;
let stepX = 180;
let stepY = 150;

let aimX = 0;
let aimY = 0;

let cellsCount = 4;

const GameArea = ({ level, courseId }: GameAreaProps) => {
    let [value, setValue] = React.useState('')

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { user } = useTypedSelector(state => state.user)

    const [nextButtonActive, setNextButtonActive] = useState(false)
    const [launchButtonActive, setLaunchButtonActive] = useState(true)

    const toast = useToast()

    const navigate = useNavigate()

    const { levels } = useTypedSelector(state => state.level)

    let nextLevel: any = {}
    if (levels && !level.isLast) {

        let newCounter = Number(level.counter) + 1
        console.log("newCounter", newCounter)
        nextLevel = levels.find((l: any) => l.counter === newCounter && l.courseId === Number(courseId))
        console.log("newLevel", nextLevel)
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

    let handleInputChange = (e: any) => {
        let inputValue = e.target.value
        setValue(inputValue)
    }

    let characterName = "Robot";

    let handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();


        let result = Compilator(value, characterName, canvasRef.current);

        if (result) {
            toast({
                title: 'Поздравляю!.',
                description: "Вы успешно завершили уровень.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })


            // Здесь незабыть сделать completeLevel
            setNextButtonActive(true)
            setLaunchButtonActive(false)
            completeLevel(user.id, courseId)
        } else {
            toast({
                title: 'Ошибка!.',
                description: "К сожалению вы неправильно выполнили уровень.",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }
    let handleRestartButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const canvas = canvasRef.current;

        drawCanvas(canvas)
    }

    let handleNextLevel = (e: React.MouseEvent<HTMLButtonElement>) => {
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
            drawCanvas(canvasRef.current)
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;

        drawCanvas(canvas)

    }, []);

    return (
        <VStack w="100%">
            <HStack w="100%" h="600px">
                <Box h="100%" w="50%" rounded="md">
                    <canvas
                        ref={canvasRef}
                    >

                    </canvas>
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


function fix_dpi(canvas: any, dpi: any) {
    //get CSS height
    //the + prefix casts it to an integer
    //the slice method gets rid of "px"
    let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
    //get CSS width
    let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
    //scale the canvas
    canvas.setAttribute('height', style_height * dpi);
    canvas.setAttribute('width', style_width * dpi);
}

function drawCanvas(canvas: any) {
    if (canvas !== null) {

        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.borderRadius = "10px";
        canvas.style.borderWidth = "10px";
        canvas.style.borderColor = "#4A5568";

        fix_dpi(canvas, window.devicePixelRatio)

        let context = canvas.getContext("2d");

        let img = new Image();
        // img.src = "https://i.pinimg.com/originals/c7/55/c6/c755c628d18abe5f42db49440de0cc96.jpg";

        img.src = BackgroundImage;



        let character = new Image();
        character.src = RobotImage;


        posY = canvas.height - 150;

        // рандомное рисование цели
        let aim = new Image()
        aim.src = AimImage;


        aimX = 0
        aimY = 0

        posX = 0
        posY = canvas.height - 150;

        aimX = getRandomInt(4, 5) * stepX - stepX

        aimY = canvas.height - (150 * getRandomInt(1, 5))

        img.onload = function () {
            context?.drawImage(img, 0, 0, img.width, img.height,     // source rectangle
                0, 0, canvas.width, canvas.height);
            context?.drawImage(character, posX, posY, 150, 150);
            context?.drawImage(aim, aimX, aimY, 150, 150)
        };



    }
}
function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkCharacterAndAimPos() {
    if (Math.abs(aimX - posX) <= 10 && (Math.abs(aimY - posY)) <= 10) {
        return true
    }

    return false
}

function Compilator(inputCode: string, characterName: string, canvas: any) {

    const availableCommands = [
        "Вперед",
        "Назад",
        "Влево",
        "Вправо"
    ]

    let result = false
    let finalCommand = "";

    let commands = inputCode.trim().replaceAll('\n', '').split(";");

    for (let i = 0; i < commands.length - 1; i++) {
        let commandValue = commands[i].replace(/[^0-9]/g, "")

        let createCommand = characterName + ".";
        // eslint-disable-next-line no-loop-func
        availableCommands.forEach(function (item) {

            if (commands[i].includes(item)) {
                createCommand += item;

                finalCommand = item;
            }

        });

        createCommand += "(" + commandValue + ")";
        console.log(createCommand);



        debugger;
        switch (finalCommand) {
            case availableCommands[0]:
                result = Up(canvas, Number(commandValue));
                break;
            case availableCommands[1]:
                result = Down(canvas, Number(commandValue));
                break;
            case availableCommands[2]:
                result = Left(canvas, Number(commandValue));
                break;
            case availableCommands[3]:
                result = Right(canvas, Number(commandValue));
                break;
        }


    }
    return result




}

function Left(canvas: any, step: number) {
    if (canvas !== null) {
        let ctx = canvas.getContext("2d");
        ctx?.clearRect(0, 0, canvas.width, canvas.height)

        // background
        let background = new Image()
        background.src = BackgroundImage;

        let character = new Image()
        character.src = RobotImage;

        let aim = new Image()
        aim.src = AimImage;
        for (let i = 0; i < step; i++) {

            posX = posX - stepX;
            ctx?.clearRect(0, 0, canvas.width, canvas.height)
            render(background, character, aim, ctx, canvas)
        }
    }
    return checkCharacterAndAimPos()

}

function Right(canvas: any, step: number) {
    if (canvas !== null) {
        let ctx = canvas.getContext("2d");
        ctx?.clearRect(0, 0, canvas.width, canvas.height)

        // background
        let background = new Image()
        background.src = BackgroundImage;

        let character = new Image()
        character.src = RobotImage;

        let aim = new Image()
        aim.src = AimImage;

        for (let i = 0; i < step; i++) {

            posX = posX + stepX;
            ctx?.clearRect(0, 0, canvas.width, canvas.height)
            render(background, character, aim, ctx, canvas)
        }

    }
    return checkCharacterAndAimPos()
}

function Up(canvas: any, step: number) {

    if (canvas !== null) {
        let ctx = canvas.getContext("2d");
        ctx?.clearRect(0, 0, canvas.width, canvas.height)

        // background
        let background = new Image()
        background.src = BackgroundImage;

        let character = new Image()
        character.src = RobotImage;

        let aim = new Image()
        aim.src = AimImage;

        for (let i = 0; i < step; i++) {

            posY = posY - stepY;
            ctx?.clearRect(0, 0, canvas.width, canvas.height)
            render(background, character, aim, ctx, canvas)
        }


    }
    return checkCharacterAndAimPos()

}


function render(background: any, character: any, aim: any, ctx: any, canvas: any) {


    background.onload = function () {
        ctx?.drawImage(background, 0, 0, background.width, background.height,     // source rectangle
            0, 0, canvas.width, canvas.height);
        ctx?.drawImage(character, posX, posY, 150, 150);
        ctx?.drawImage(aim, aimX, aimY, 150, 150)

    };
}

function Down(canvas: any, step: number) {
    if (canvas !== null) {
        let ctx = canvas.getContext("2d");
        ctx?.clearRect(0, 0, canvas.width, canvas.height)

        // background
        let background = new Image()
        background.src = BackgroundImage;

        let character = new Image()
        character.src = RobotImage;


        let aim = new Image()
        aim.src = AimImage;

        for (let i = 0; i < step; i++) {

            posY = posY + stepY;
            ctx?.clearRect(0, 0, canvas.width, canvas.height)
            render(background, character, aim, ctx, canvas)
        }

    }
    return checkCharacterAndAimPos()
}


export default GameArea