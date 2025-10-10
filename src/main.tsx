import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<main className="dark min-h-svh flex flex-col items-center py-16 container px-4 md:px-8 mx-auto">
				<App />
			</main>
		</BrowserRouter>
	</StrictMode>
);
