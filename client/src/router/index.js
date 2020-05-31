import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import Routes from './Routes';
import Header from '../components/Header';
import Layer from '../components/Layer';

const RouterComponent = () => (
	<BrowserRouter>
		<Layer>
			<Header />
			{renderRoutes(Routes)}
		</Layer>
	</BrowserRouter>
);

export default RouterComponent;