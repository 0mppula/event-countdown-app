import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { DateTimePicker } from './DateTimePicker';

function CountdownForm() {
	const [title, setTitle] = useState('');
	// Default today's date
	const [startDate, setStartDate] = useState<Date | undefined>(new Date());
	const [startTime, setStartTime] = useState('12:00');
	// Default end date is the next day
	const [endDate, setEndDate] = useState<Date | undefined>(
		new Date(Date.now() + 7 * 24 * 60 * 60 * 1_000)
	);
	const [endTime, setEndTime] = useState('12:00');

	const navigate = useNavigate();

	const handleSubmit = () => {
		if (!title || !startDate || !endDate) return;

		// Combine date and time — but use UTC to avoid local timezone shifts
		const [startHour, startMin] = startTime.split(':').map(Number);
		const startDateTime = new Date(
			Date.UTC(
				startDate.getUTCFullYear(),
				startDate.getUTCMonth(),
				startDate.getUTCDate(),
				startHour,
				startMin,
				0,
				0
			)
		);

		const [endHour, endMin] = endTime.split(':').map(Number);
		const endDateTime = new Date(
			Date.UTC(
				endDate.getUTCFullYear(),
				endDate.getUTCMonth(),
				endDate.getUTCDate(),
				endHour,
				endMin,
				0,
				0
			)
		);

		const params = new URLSearchParams({
			title,
			start: startDateTime.getTime().toString(),
			end: endDateTime.getTime().toString(),
		});

		// Redirect to countdown page with parameters
		navigate(`/countdown?${params.toString()}`);
	};

	const handleSetStartDate = (date: Date | undefined) => {
		if (endDate && date && date >= endDate) {
			// if the new start date is after or equal to the current end date, set the end date 24 hours after the new start date
			setEndDate(new Date(date.getTime() + 24 * 60 * 60 * 1_000));
		}

		setStartDate(date);
	};

	return (
		<Card className="p-0 w-full max-w-2xl backdrop-blur-xl shadow-2xl">
			<CardContent className="p-8">
				<h1 className="text-4xl md:text-5xl font-bold text-center mb-3">
					Create Your Countdown
				</h1>
				<p className="text-center mb-8">
					Track the time remaining until your special moment
				</p>

				<div className="space-y-6">
					<div className="space-y-2">
						<Label htmlFor="title" className="text-base">
							Event Name
						</Label>
						<Input
							id="title"
							placeholder="e.g., Summer Vacation, Wedding Day, Product Launch"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="h-12 text-lg"
						/>
					</div>

					<div className="grid md:grid-cols-2 gap-6">
						<DateTimePicker
							label="Start Date & Time"
							date={startDate}
							onChange={handleSetStartDate}
						/>

						<DateTimePicker
							label="End Date & Time"
							date={endDate}
							onChange={(val) => setEndDate(val)}
							minDate={startDate}
						/>
					</div>

					<Button
						onClick={handleSubmit}
						disabled={!title || !startDate || !endDate}
						className="w-full h-12 text-lg font-semibold shadow-lg disabled:opacity-50"
					>
						Start Countdown
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}

export default CountdownForm;
