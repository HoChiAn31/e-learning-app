import config from '../config';
import DefaultLayout from '../layouts/DefaultLayout';
import {
	ClassPage,
	DepartmentPage,
	FacultiePage,
	HomePage,
	InstructorAssignmentPage,
	InstructorProfileListPage,
	LoginPage,
	ScoreTypePage,
	StudentReservePage,
	StudentTransferPage,
	SubjectPage,
	dataDeclarationPage,
	studentProfileListPage,
} from '../pages';

interface RouteConfig {
	path: string;
	component: React.ComponentType;
	layout?: React.ComponentType<any> | null;
}

const publicRoutes: RouteConfig[] = [
	{ path: config.home, component: HomePage, layout: DefaultLayout },
	{ path: config.login, component: LoginPage, layout: DefaultLayout },
	{ path: config.dataDeclaration, component: dataDeclarationPage, layout: DefaultLayout },
	{ path: config.department, component: DepartmentPage, layout: DefaultLayout },
	{ path: config.facultie, component: FacultiePage, layout: DefaultLayout },
	{ path: config.subject, component: SubjectPage, layout: DefaultLayout },
	{ path: config.class, component: ClassPage, layout: DefaultLayout },
	{ path: config.scoreType, component: ScoreTypePage, layout: DefaultLayout },
	{ path: config.studentProfileList, component: studentProfileListPage, layout: DefaultLayout },
	{ path: config.studentTransfer, component: StudentTransferPage, layout: DefaultLayout },
	{ path: config.studentReserve, component: StudentReservePage, layout: DefaultLayout },
	{
		path: config.instructorProfileList,
		component: InstructorProfileListPage,
		layout: DefaultLayout,
	},
	{ path: config.instructorAssignment, component: InstructorAssignmentPage, layout: DefaultLayout },
];

export { publicRoutes };
