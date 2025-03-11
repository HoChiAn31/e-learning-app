import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { publicRoutes } from './routes';
import DefaultLayout from './layouts/DefaultLayout';

function App() {
	return (
		<Router>
			<Routes>
				{publicRoutes.map((route, index) => {
					const Page = route.component;
					let Layout: React.ComponentType<any> = DefaultLayout;
					if (route.layout) {
						Layout = route.layout;
					} else if ((route.layout = null)) {
						Layout = Fragment;
					}

					return (
						<Route
							key={index}
							path={route.path}
							element={
								<Layout>
									<Page />
								</Layout>
							}
						/>
					);
				})}
			</Routes>
		</Router>
	);
}

export default App;
