import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, isBefore } from 'date-fns';
import { CalendarIcon, Check } from 'lucide-react';
import * as React from 'react';
import { useEffect, useState } from 'react';

export function DateTimePicker({
	date,
	onChange,
	label,
	minDate,
}: {
	date?: Date;
	onChange: (value: Date) => void;
	label?: string;
	minDate?: Date;
}) {
	const [open, setOpen] = useState(false);
	const [tempDate, setTempDate] = useState<Date | undefined>(date);
	const [tempTime, setTempTime] = useState('12:00');

	// Sync when external date changes
	useEffect(() => {
		setTempDate(date);
		if (date) {
			const hrs = String(date.getHours()).padStart(2, '0');
			const mins = String(date.getMinutes()).padStart(2, '0');
			setTempTime(`${hrs}:${mins}`);
		}
	}, [date]);

	const handleSubmit = () => {
		if (!tempDate) return;

		const [h, m] = tempTime.split(':').map(Number);
		const newDate = new Date(tempDate);

		newDate.setHours(h, m, 0, 0);

		onChange(newDate);
		setOpen(false);
	};

	// Disable dates before minDate
	const isDateDisabled = (date: Date) => {
		if (!minDate) return false;

		return isBefore(date, minDate);
	};

	// Ensure user can’t pick time before minDate on same day
	const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value;

		setTempTime(value);
	};

	return (
		<div className="space-y-2">
			{label && <p className="text-sm font-medium">{label}</p>}
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button variant="outline" className="w-full justify-between overflow-hidden">
						{date ? (
							<>
								<span className="w-32 truncate flex-1 text-left">
									{format(date, 'PPP p')}
								</span>
								<CalendarIcon className="ml-2 h-4 w-4 opacity-50 flex-shrink-0" />
							</>
						) : (
							<>
								Select date and time
								<CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
							</>
						)}
					</Button>
				</PopoverTrigger>

				<PopoverContent align="end" className="w-full p-4">
					<form
						className="space-y-4"
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							handleSubmit();
						}}
					>
						<Calendar
							mode="single"
							selected={tempDate}
							onSelect={setTempDate}
							className="rounded-md w-full p-0"
							disabled={isDateDisabled}
						/>

						<div className="flex items-center gap-2">
							<Input
								type="time"
								value={tempTime}
								onChange={handleTimeChange}
								className="flex-1 min-w-0"
							/>

							<Button disabled={!tempDate} className="flex-shrink-0" type="submit">
								<Check className="w-4 h-4" />

								<span className="sr-only">Done</span>
							</Button>
						</div>
					</form>
				</PopoverContent>
			</Popover>
		</div>
	);
}
