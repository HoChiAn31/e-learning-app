import config from '../config';
import DefaultLayout from '../layouts/DefaultLayout';
import {
	ClassPage,
	ClassSettingPage,
	DepartmentPage,
	EditInforSchoolPage,
	FacultiePage,
	HomePage,
	InforSchoolPage,
	InstructorAssignmentPage,
	InstructorProfileListPage,
	LoginPage,
	ScoreTypePage,
	StudentReservePage,
	StudentTransferPage,
	SubjectPage,
	SubjectSettingPage,
	SystemSettingsPage,
	TeacherClassAddPage,
	TeacherClassDetailPage,
	TeacherClassMeetingPage,
	TeacherClassPage,
	TeacherDashBoardPage,
	TeacherListTestPage,
	TranningSettingPage,
	UserSettingPage,
	dataDeclarationPage,
	studentProfileListPage,
} from '../pages';
import ConfigPage from '../pages/systemSettings/config';

interface RouteConfig {
	path: string;
	component: React.ComponentType;
	layout?: React.ComponentType<any> | null;
}

const publicRoutes: RouteConfig[] = [
	{ path: config.login, component: LoginPage, layout: DefaultLayout },

	// *************************** leadership ***************************
	{ path: config.home, component: HomePage, layout: DefaultLayout },
	// page dataDeclaration
	{ path: config.dataDeclaration, component: dataDeclarationPage, layout: DefaultLayout },
	{ path: config.department, component: DepartmentPage, layout: DefaultLayout },
	{ path: config.facultie, component: FacultiePage, layout: DefaultLayout },
	{ path: config.subject, component: SubjectPage, layout: DefaultLayout },
	{ path: config.class, component: ClassPage, layout: DefaultLayout },
	{ path: config.scoreType, component: ScoreTypePage, layout: DefaultLayout },
	// page student
	{ path: config.studentProfileList, component: studentProfileListPage, layout: DefaultLayout },
	{ path: config.studentTransfer, component: StudentTransferPage, layout: DefaultLayout },
	{ path: config.studentReserve, component: StudentReservePage, layout: DefaultLayout },
	// page instructor
	{
		path: config.instructorProfileList,
		component: InstructorProfileListPage,
		layout: DefaultLayout,
	},
	{ path: config.instructorAssignment, component: InstructorAssignmentPage, layout: DefaultLayout },
	// page Settings
	{ path: config.systemSettings, component: SystemSettingsPage, layout: DefaultLayout },
	{ path: config.inforSchool, component: InforSchoolPage, layout: DefaultLayout },
	{ path: config.inforSchoolEditor, component: EditInforSchoolPage, layout: DefaultLayout },
	{ path: config.userSettings, component: UserSettingPage, layout: DefaultLayout },
	{ path: config.classSettings, component: ClassSettingPage, layout: DefaultLayout },
	{ path: config.subjectSettings, component: SubjectSettingPage, layout: DefaultLayout },
	{ path: config.tranningSettings, component: TranningSettingPage, layout: DefaultLayout },
	{ path: config.configSettings, component: ConfigPage, layout: DefaultLayout },
	// *************************** teacher ***************************
	{ path: config.teacherDashboard, component: TeacherDashBoardPage, layout: DefaultLayout },
	{ path: config.teacherClass, component: TeacherClassPage, layout: DefaultLayout },
	{ path: config.teacherClassDetail, component: TeacherClassDetailPage, layout: DefaultLayout },

	{ path: config.teacherClassAdd, component: TeacherClassAddPage, layout: DefaultLayout },
	{ path: config.teacherClassMeeting, component: TeacherClassMeetingPage, layout: DefaultLayout },
	{ path: config.teacherListTest, component: TeacherListTestPage, layout: DefaultLayout },
];

export { publicRoutes };
