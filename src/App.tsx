import { Box, Container, Flex, HStack, Spinner } from '@chakra-ui/react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import RegisterPage from './pages/RegisterPage';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import { useEffect } from 'react';
import { PrivateRoute } from './routes/PrivateRoute';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useActions } from './hooks/useActions';
import LessonsPage from './pages/LessonsPage';
import CoursePage from './pages/CoursePage';
import Lesson from './components/Lesson/Lesson';
import LessonPage from './pages/LessonPage';
import AddUsersPage from './pages/AddUsersPage';
import AddCoursePage from './pages/AddCoursePage';
import SearchStudentsPage from './pages/SearchStudentsPage';
import AddLessonsPage from './pages/AddLessonsPage';
import AddLessonsToCoursePage from './pages/AddLessonsToCoursePage';

function App() {
  const { isAuth, loading } = useTypedSelector(state => state.auth);

  const { loginUser, fetchUsers } = useActions();

  useEffect(() => {
    loginUser();
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <HStack h="100vh" justify="center">
        <Spinner size="lg" />
      </HStack>
    );
  }

  // Заприватить нужные роуты


  return (
    <BrowserRouter>
      <div className="App">
        <Container maxW="full" bg="blue.100">
          <Flex h="100vh" overflowY="auto" flexDirection={"column"}>
            <Header isAuth={isAuth} role={0} />
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/lessons' element={<LessonsPage />} />
              <Route path='/course/:courseId' element={<CoursePage />} />
              <Route path='/lesson/:lessonId/:courseId' element={<LessonPage />} />


              <Route path='/addUsers' element={<AddUsersPage />} />
              <Route path='/addCourse' element={<AddCoursePage />} />
              <Route path='/addLessons' element={<AddLessonsPage />} />
              <Route path='/addLessons/:courseId' element={<AddLessonsToCoursePage />} />

              <Route path='/register' element={<PrivateRoute type='public' auth={isAuth} component={RegisterPage} />} />
              <Route path='/login' element={<PrivateRoute type='public' auth={isAuth} component={LoginPage} />} />

              <Route path="/profile" element={<PrivateRoute type='private' auth={isAuth} component={ProfilePage} />} >
                <Route path=":profileId" element={<PrivateRoute type='private' auth={isAuth} component={ProfilePage} />} />
              </Route>

              <Route path='/searchStudents' element={<SearchStudentsPage />} />

            </Routes>

          </Flex>
        </Container>

      </div >
    </BrowserRouter>

  );
}

export default App;
