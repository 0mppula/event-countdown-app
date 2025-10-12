import { useEffect } from 'react';

/* Hook for changing the title */
export const useTitle = (title: string, separator: string = ' - ') => {
	useEffect((): (() => void) => {
		const defaultTitle = document.title;
		const appTitle = 'Event Countdown';

		title && (document.title = `${title}${separator}${appTitle}`);
		// following line is optional, but will reset title when component unmounts
		return () => (document.title = defaultTitle);
	}, [title]);
};
