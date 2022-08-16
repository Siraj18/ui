import { Heading, VStack, Text, Image, Code, Flex } from '@chakra-ui/react'
import React from 'react'

interface TutorialProps {
    level: any
}

function Tutorial({ level }: TutorialProps) {

    let history = `<b>1.Крушение корабля</b><b>Наша экспедиция была собрана в 2345 году. Цель экспедиции заключалась в нахождении новых планет для заселения людей, но внезапнонаш корабль потерпел крушение на неизвестной нам планете.

            </b>
            <b width='50%' src='https://phonoteka.org/uploads/posts/2021-07/1625619934_20-phonoteka-org-p-kosmicheskie-korabli-arti-krasivo-21.jpg' />

            <b>
                Команда долго искала поломку, и в итоге нашла. Вышел из строя модуль двигателя, предназначенный для охлаждения.

            </b>
            <img width='50%' src='https://get.wallhere.com/photo/1920x931-px-space-spaceship-Star-Citizen-675670.jpg' />
            <b fontWeight='bold' alignSelf={'center'} textAlign='center'>
                Мы решили поизучать планету, на которой высадились. После долгой прогулки, нашей командой был обнаружен старый корабль,
                судя по всему ему около 100+ лет.

            </b>
            <img width='50%' src='https://get.wallhere.com/photo/1920x1080-px-abandoned-aircraft-artwork-concept-art-desert-wreck-810829.jpg' />
            <b fontWeight='bold' alignSelf={'center'} textAlign='center'>
                Обойдя этот корабль со всех сторон, команда обнаружила, что вход внутрь засыпан песками и человеку сложно войти внутрь. Тут то
                и понадобились твои навыки. Команда вспомнила, что на борту вашего корабль есть старый робот. Теперь предстоит запрограммировать его,
                чтобы он смог проникнуть внутрь

            </b>
            <img width='50%' src='https://i.pinimg.com/736x/ec/e5/e3/ece5e3de2070a947f302acf171b6f89d--steampunk-robots-rc-drone.jpg' />
            <b fontWeight='bold' alignSelf={'center'} textAlign='center'>
                Поизучав дрона, ты осознаешь, что он принимает только старые комманды, конечно же ты их не знаешь. Порывшись в библиотеке корабль,
                ты отыскал старую книгу с командами. О! То что нужно, подумал ты

            </b>
            <img width='50%' src='https://stihi.ru/pics/2019/01/21/1326.jpg' />
            <b fontWeight='bold' alignSelf={'center'} textAlign='center'>
                Прочитав книгу, ты увидел следующие команды:

                <br/>Для передвижения робота используйте следующие команды:
                <br/>Robot.Up(n); - передвинуть робота на n шагов вверх <br />
                Robot.Down(n); - передвинуть робота на n шагов вних <br />
                Robot.Left(n); - передвинуть робота на n шагов влево <br />
                Robot.Right(n); - передвинуть робота на n шагов вправо <br />
                Думаю пора приступить к написанию кода!
                Запрограммируйте робота, чтобы он смог успешно войти внутрь заброшенного корабля
            </b>
    `
    let history2 = `<b>Переменная представляет собой идентификатор,
    которому присвоено некое значение. К переменной можно обращаться в программе, работая таким образом с присвоенным ей значением. Переменные создаются через
    ключевое слово let <название переменное> = значение. Попробуйте создать переменную и присвоить ей значение 'hello', а затем выведите значение данной переменной </b`

    return (
        <VStack w="100%" alignItems="flex-start">
            <Heading>{level.name}</Heading>
            <Flex h="100%" textAlign={"center"} direction="column" alignItems="center" w="100%" dangerouslySetInnerHTML={{ __html: level.tutorial }}>
            </Flex>
        </VStack >
    )
}

export default Tutorial