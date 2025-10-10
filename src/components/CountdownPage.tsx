import TimeElement from '@/components/TimeElement';
import { format } from 'date-fns';
import { ArrowBigLeft } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from './ui/button';

const CountdownPage = () => {
	const [searchParams] = useSearchParams();
	const title = searchParams.get('title') || 'Your Event';
	const start = Number(searchParams.get('start')) || Date.now();
	const end = Number(searchParams.get('end')) || Date.now() + 24 * 60 * 60 * 1000;

	const navigate = useNavigate();

	const [remainingMS, setRemainingMS] = useState(end - Date.now());

	useEffect(() => {
		const interval = setInterval(() => {
			setRemainingMS(Math.max(end - Date.now(), 0));
		}, 1000);

		return () => clearInterval(interval);
	}, [end]);

	const zeroPad = useCallback((num: number) => num.toString().padStart(2, '0'), []);

	const countdown = useMemo(() => {
		const totalSeconds = Math.floor(remainingMS / 1000);
		const days = Math.floor(totalSeconds / 86400);
		const hours = Math.floor((totalSeconds % 86400) / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;

		return {
			days: zeroPad(days),
			hours: zeroPad(hours),
			minutes: zeroPad(minutes),
			seconds: zeroPad(seconds),
		};
	}, [remainingMS, zeroPad]);

	return (
		<>
			<h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-6xl mb-4 lg:mb-6 text-center">
				Countdown to <span className="text-primary">{title}</span>
			</h1>

			<div className="mt-4 md:mt-6 grid grid-cols-4 gap-2 md:gap-4">
				{Object.entries(countdown).map(([unit, value]) => (
					<TimeElement key={unit} value={value} unit={unit} />
				))}
			</div>

			<p className="mt-8 text-xl text-center">
				Event starts at: {format(new Date(start), "MMM d, yyyy 'at' HH:mm 'UTC'")}
			</p>

			<p className="mt-2 text-xl text-center">
				Event ends at: {format(new Date(end), "MMM d, yyyy 'at' HH:mm 'UTC'")}
			</p>

			{remainingMS <= 0 && (
				<p className="mt-8 text-2xl font-bold">The countdown has ended!</p>
			)}

			<Button variant="link" onClick={() => navigate('/')} className="mt-8 px-6 py-3">
				<ArrowBigLeft /> Back to Create
			</Button>
		</>
	);
};

export default CountdownPage;
