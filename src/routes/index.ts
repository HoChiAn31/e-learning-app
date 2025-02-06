import config from '../config';
import DefaultLayout from '../layouts/DefaultLayout';
import { HomePage, LoginPage } from '../pages';
import dataDeclarationPage from '../pages/dataDeclaration';

interface RouteConfig {
	path: string;
	component: React.ComponentType;
	layout?: React.ComponentType<any> | null;
}

const publicRoutes: RouteConfig[] = [
	{ path: config.home, component: HomePage, layout: DefaultLayout },
	{ path: config.login, component: LoginPage, layout: DefaultLayout },
	{ path: config.dataDeclaration, component: dataDeclarationPage, layout: DefaultLayout },
];

export { publicRoutes };
