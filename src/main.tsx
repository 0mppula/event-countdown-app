import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import Footer from './components/Footer.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<main className="dark max-w-xl min-h-svh flex flex-col items-center py-16 container px-4 mx-auto">
				<App />
			</main>

			<Footer />
		</BrowserRouter>
	</StrictMode>
);
