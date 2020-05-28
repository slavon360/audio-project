import React, { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import Routes from './Routes';
import Header from '../components/Header';

const RouterComponent = () => (
	<BrowserRouter>
		<Fragment>
			<Header />
			{renderRoutes(Routes)}
		</Fragment>
	</BrowserRouter>
);

export default RouterComponent;