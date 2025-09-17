import { Box, useColorModeValue } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import { LanguageProvider } from './contexts/LanguageContext';
import CreatePage from './pages/CreatePage';
import HomePage from './pages/HomePage';

function App() {
	return (
		<LanguageProvider>
			<Box minH={'100vh'} bg={useColorModeValue('gray.100', 'gray.900')}>
				<Navbar />
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/create' element={<CreatePage />} />
				</Routes>
			</Box>
		</LanguageProvider>
	);
}

export default App;
