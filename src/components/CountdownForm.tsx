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
	const [eventDate, setEventDate] = useState<Date | undefined>(new Date());
	const [startTime] = useState('12:00');
	// Default end date is the next day
	const [createdAt, setCreatedAt] = useState<Date | undefined>(new Date(Date.now()));
	const [endTime] = useState('12:00');

	const navigate = useNavigate();

	const handleSubmit = () => {
		if (!title || !eventDate || !createdAt) return;

		// Combine date and time — but use UTC to avoid local timezone shifts
		const [startHour, startMin] = startTime.split(':').map(Number);
		const startDateTime = new Date(
			Date.UTC(
				eventDate.getUTCFullYear(),
				eventDate.getUTCMonth(),
				eventDate.getUTCDate(),
				startHour,
				startMin,
				0,
				0
			)
		);

		const [endHour, endMin] = endTime.split(':').map(Number);
		const createdAtTime = new Date(
			Date.UTC(
				createdAt.getUTCFullYear(),
				createdAt.getUTCMonth(),
				createdAt.getUTCDate(),
				endHour,
				endMin,
				0,
				0
			)
		);

		const params = new URLSearchParams({
			title,
			start: startDateTime.getTime().toString(),
			createdAt: createdAtTime.getTime().toString(),
		});

		// Redirect to countdown page with parameters
		navigate(`/countdown?${params.toString()}`);
	};

	const handleSetEventDate = (date: Date | undefined) => {
		setEventDate(date);
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
							label="Event Date & Time"
							date={eventDate}
							onChange={handleSetEventDate}
						/>

						<DateTimePicker
							label="Created at"
							date={createdAt}
							onChange={(val) => setCreatedAt(val)}
						/>
					</div>

					<Button
						onClick={handleSubmit}
						disabled={!title || !eventDate || !createdAt}
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
