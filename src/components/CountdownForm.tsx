import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { DateTimePicker } from './DateTimePicker';

function CountdownForm() {
	const [title, setTitle] = useState('');
	// Default event date is 24h from now
	const [eventDate, setEventDate] = useState<Date | undefined>(
		new Date(Date.now() + 24 * 60 * 60 * 1_000)
	);

	// Default end date is the next day
	const [createdAt, setCreatedAt] = useState<Date | undefined>(new Date(Date.now()));

	const navigate = useNavigate();

	const handleSubmit = () => {
		if (!title || !eventDate || !createdAt) return;

		const startDateTime = new Date(
			Date.UTC(
				eventDate.getUTCFullYear(),
				eventDate.getUTCMonth(),
				eventDate.getUTCDate(),
				eventDate.getUTCHours(),
				eventDate.getUTCMinutes(),
				0,
				0
			)
		);

		const createdAtTime = new Date(
			Date.UTC(
				createdAt.getUTCFullYear(),
				createdAt.getUTCMonth(),
				createdAt.getUTCDate(),
				createdAt.getUTCHours(),
				createdAt.getUTCMinutes(),
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
		<>
			<h1 className="text-4xl md:text-5xl font-bold text-center mb-3">
				Create Your Countdown
			</h1>
			<p className="text-center">Track the time remaining until your special moment</p>

			<form
				className="w-full"
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
			>
				<Card className="p-0 w-full backdrop-blur-xl shadow-2xl mt-8">
					<CardContent className="p-4 sm:p-8">
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
								/>
							</div>

							<div className="grid sm:grid-cols-2 gap-6">
								<DateTimePicker
									label="Event Date & Time"
									date={eventDate}
									onChange={handleSetEventDate}
									// minDate is start of today
									minDate={new Date(new Date().setHours(0, 0, 0, 0))}
								/>

								<DateTimePicker
									label="Created at (usually now)"
									date={createdAt}
									onChange={(val) => setCreatedAt(val)}
									// minDate is start of today
									minDate={new Date(new Date().setHours(0, 0, 0, 0))}
								/>
							</div>

							<Button
								onClick={handleSubmit}
								disabled={!title || !eventDate || !createdAt}
								className="w-full disabled:opacity-50"
							>
								Start Countdown
							</Button>
						</div>
					</CardContent>
				</Card>
			</form>
		</>
	);
}

export default CountdownForm;
