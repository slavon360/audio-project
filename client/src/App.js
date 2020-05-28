import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Router from './router';
import Layer from './components/Layer';
import './App.css';
console.log(process.env);

const client = new ApolloClient({
	uri: `${process.env.REACT_APP_SERVER_HOST_URL}/graphql`,
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Layer>
				<div className="App">
					<Router />
				</div>
			</Layer>
		</ApolloProvider>
	);
}

export default App;
