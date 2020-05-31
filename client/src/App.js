import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Router from './router';

import './App.css';

const client = new ApolloClient({
	uri: `${process.env.REACT_APP_SERVER_HOST_URL}/graphql`,
});

function App() {
	return (
		<ApolloProvider client={client}>
			<div className="App">
				<Router />
			</div>
		</ApolloProvider>
	);
}

export default App;
