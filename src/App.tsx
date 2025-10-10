import { Navigate, Route, Routes } from 'react-router-dom';
import CountdownForm from './components/CountdownForm';
import CountdownPage from './components/CountdownPage';

function App() {
	return (
		<Routes>
			<Route path="/" element={<CountdownForm />} />
			<Route path="/countdown" element={<CountdownPage />} />
			{/* Fallback route: redirect unknown paths to home */}
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
}

export default App;
