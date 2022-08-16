import * as UserActionsCreators from "./user";
import * as AuthActionsCreators from "./auth";
import * as StudentActionsCreators from "./student";
import * as SearchActionsCreators from "./search";
import * as CourseActionsCreators from "./course";
import * as LevelActionsCreators from "./level";
import * as StatisticActionsCreator from "./statistic";
import * as CompletedCoursesActionsCreator from "./completedCourse"
import * as CounterActionsCreator from "./counter"

export default {
    ...UserActionsCreators,
    ...AuthActionsCreators,
    ...StudentActionsCreators,
    ...SearchActionsCreators,
    ...CourseActionsCreators,
    ...LevelActionsCreators,
    ...StatisticActionsCreator,
    ...CompletedCoursesActionsCreator,
    ...CounterActionsCreator
}