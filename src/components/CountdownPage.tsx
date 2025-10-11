import TimeElement from '@/components/TimeElement';
import { format } from 'date-fns';
import { ArrowBigLeft } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';

const CountdownPage = () => {
	const [searchParams] = useSearchParams();
	const title = searchParams.get('title') || 'Your Event';
	const start = Number(searchParams.get('start')) || Date.now();
	const createdAt = Number(searchParams.get('createdAt')) || Date.now();

	const navigate = useNavigate();

	const [remainingMS, setRemainingMS] = useState(start - Date.now());

	useEffect(() => {
		const interval = setInterval(() => {
			setRemainingMS(Math.max(start - Date.now(), 0));
		}, 1000);

		return () => clearInterval(interval);
	}, [start]);

	const zeroPad = useCallback((num: number) => num.toString().padStart(2, '0'), []);

	const progressStats = useMemo(() => {
		const totalDuration = start - createdAt;
		const elapsed = Date.now() - createdAt;
		const percentElapsed = Math.min((elapsed / totalDuration) * 100, 100);
		const percentRemaining = Math.max(100 - percentElapsed, 0);

		return {
			percentElapsed: percentElapsed.toFixed(1),
			percentRemaining: percentRemaining.toFixed(1),
			totalDuration,
			elapsed: Math.min(elapsed, totalDuration),
		};
	}, [start, createdAt]);

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

	const formatDurationMS = (ms: number) => {
		const totalSeconds = Math.floor(ms / 1000);
		const days = Math.floor(totalSeconds / 86400);
		const hours = Math.floor((totalSeconds % 86400) / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);

		const parts = [];
		if (days > 0) parts.push(`${days}d`);
		if (hours > 0) parts.push(`${hours}h`);
		if (minutes > 0) parts.push(`${minutes}m`);

		return parts.join(' ') || '0m';
	};

	return (
		<>
			<h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-6xl mb-4 lg:mb-6 text-center">
				Countdown Until <span className="text-primary">{title}</span>
			</h1>

			<div className="mt-4 md:mt-6 grid grid-cols-4 gap-2 md:gap-4">
				{Object.entries(countdown).map(([unit, value]) => (
					<TimeElement key={unit} value={value} unit={unit} />
				))}
			</div>

			<Card className="w-full max-w-2xl mt-8 backdrop-blur-xl ">
				<CardContent>
					<div className="space-y-4">
						<div className="flex justify-between items-center mb-2">
							<span className="text-sm font-medium">Progress</span>
							<span className="text-sm font-bold">
								{progressStats.percentElapsed}% elapsed
							</span>
						</div>

						<Progress
							value={parseFloat(progressStats.percentElapsed)}
							className="h-3"
						/>

						<div className="grid grid-cols-2 gap-4 mt-6">
							<div className="text-center p-4 rounded-lg">
								<div className="text-3xl font-bold mb-1">
									{progressStats.percentElapsed}%
								</div>
								<div className="text-sm">Time Elapsed</div>
								<div className="text-xs mt-1">
									{formatDurationMS(progressStats.elapsed)}
								</div>
							</div>

							<div className="text-center p-4 rounded-lg">
								<div className="text-3xl font-bold mb-1">
									{progressStats.percentRemaining}%
								</div>
								<div className="text-sm">Time Remaining</div>
								<div className="text-xs mt-1">{formatDurationMS(remainingMS)}</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<div className="mt-4 flex flex-col md:flex-row gap-4 justify-center">
				<p className="text-center text-sm">
					Event starts at: {format(new Date(start), "MMM d, yyyy 'at' HH:mm")}
				</p>

				<p className="text-center text-sm">
					Event is created at: {format(new Date(createdAt), "MMM d, yyyy 'at' HH:mm")}
				</p>
			</div>

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
