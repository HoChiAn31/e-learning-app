import config from '../config';
import DefaultLayout from '../layouts/DefaultLayout';
import { HomePage, LoginPage } from '../pages';
import dataDeclarationPage from '../pages/dataDeclaration';
import ClassPage from '../pages/dataDeclaration/class';
import DepartmentPage from '../pages/dataDeclaration/department';
import FacultiePage from '../pages/dataDeclaration/facultie';
import ScoreTypePage from '../pages/dataDeclaration/scoreType';
import SubjectPage from '../pages/dataDeclaration/subject';
import studentProfileListPage from '../pages/studentProfileList';

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
];

export { publicRoutes };
