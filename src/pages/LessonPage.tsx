import { VStack } from '@chakra-ui/react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GameArea from '../components/GameArea/GameArea';
import Tutorial from '../components/Tutorial/Tutorial';
import BoxContainer from '../components/UI/BoxContainer/BoxContainer';
import GameAreaJs from '../components/GameAreaJs/GameAreaJs';
import { useTypedSelector } from '../hooks/useTypedSelector';

function LessonPage() {

    const { lessonId, courseId } = useParams()

    const { levels } = useTypedSelector(state => state.level)
    // Взять через uri idшник
    // Сделать fetchLessons
    // Пройтись по массиву и найти левел с таким же idшником
    // Отобразить


    let levelType = ""
    let level: any = {}
    if (levels) {
        console.log("levels", levels)
        level = levels.find((level: any) => level.id === Number(lessonId))
        console.log("level", level)
        if (level) {
            levelType = level.type
        }


    }


    // Потом убрать
    // levelType = "js"

    return (
        <BoxContainer>
            <VStack pb="5" mx="5" mt="5">
                <Tutorial level={level} />
                {levelType === "game" && <GameArea level={level} courseId={courseId} />}
                {levelType === "js" && <GameAreaJs level={level} courseId={courseId} />}
            </VStack>

        </BoxContainer>
    )
}

export default LessonPage