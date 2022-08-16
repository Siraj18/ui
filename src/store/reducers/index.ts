import { counterReducer } from './counterReducer';
import { levelReducer } from './levelReducer';
import { courseReducer } from './courseReducer';
import { searchReducer } from './searchReducer';
import { studentReducer } from './studentReducer';
import { authReducer } from './authReducer';
import { userReducer } from './userReducer';
import { combineReducers } from "redux";
import statisticReducer from './statisticReducer';
import completedCourseReducer from './completedCourseReducer';

export const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    student: studentReducer,
    search: searchReducer,
    course: courseReducer,
    level: levelReducer,
    statistic: statisticReducer,
    completedCourse: completedCourseReducer,
    counter: counterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;