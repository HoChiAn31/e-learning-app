import config from '../config';
import DefaultLayout from '../layouts/DefaultLayout';
import HomePage from '../pages/home';

interface RouteConfig {
	path: string;
	component: React.ComponentType;
	layout?: React.ComponentType<any> | null;
}

const publicRoutes: RouteConfig[] = [
	{ path: config.home, component: HomePage, layout: DefaultLayout },
];

export { publicRoutes };
