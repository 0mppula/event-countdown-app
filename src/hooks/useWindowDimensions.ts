import { useEffect, useState } from 'react';

export const SmScreen = 640;
export const MdScreen = 768;
export const LgScreen = 1024;
export const XlScreen = 1280;
export const XxlScreen = 1536;

/* Getting the current width and height of the browser window. */
export const useWindowDimensions = () => {
	const [windowDimensions, setWindowDimensions] = useState({
		width: 0,
		height: 0,
	});

	const isSm = windowDimensions.width < SmScreen;
	const isMd = windowDimensions.width < MdScreen;
	const isLg = windowDimensions.width < LgScreen;
	const isXl = windowDimensions.width < XlScreen;
	const isXxl = windowDimensions.width < XxlScreen;

	useEffect(() => {
		const handleResize = () => {
			setWindowDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		handleResize();

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return {
		width: windowDimensions.width,
		height: windowDimensions.height,
		isSm,
		isMd,
		isLg,
		isXl,
		isXxl,
	};
};
