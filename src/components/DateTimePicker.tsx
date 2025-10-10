import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, isBefore, isSameDay } from 'date-fns';
import { CalendarIcon, Check, Clock } from 'lucide-react';
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

	// Compute minimum time if same day as minDate
	const minTimeString = React.useMemo(() => {
		if (!minDate || !tempDate) return '00:00';
		if (!isSameDay(minDate, tempDate)) return '00:00';
		const h = String(minDate.getHours()).padStart(2, '0');
		const m = String(minDate.getMinutes()).padStart(2, '0');
		return `${h}:${m}`;
	}, [minDate, tempDate]);

	// Ensure user can’t pick time before minDate on same day
	const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value;
		if (isSameDay(tempDate || new Date(), minDate || new Date()) && minDate) {
			const [h, m] = value.split(':').map(Number);
			const [minH, minM] = minTimeString.split(':').map(Number);
			const selectedMinutes = h * 60 + m;
			const minMinutes = minH * 60 + minM;
			if (selectedMinutes < minMinutes) value = minTimeString;
		}
		setTempTime(value);
	};

	return (
		<div className="space-y-2">
			{label && <p className="text-sm font-medium">{label}</p>}
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button variant="outline" className="w-full justify-between">
						{date ? (
							<>
								{format(date, 'PPP p')}
								<CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
							</>
						) : (
							<>
								Select date and time
								<CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
							</>
						)}
					</Button>
				</PopoverTrigger>

				<PopoverContent className="w-auto p-4 space-y-4" align="start">
					<Calendar
						mode="single"
						selected={tempDate}
						onSelect={setTempDate}
						className="rounded-md"
						disabled={isDateDisabled}
					/>

					<div className="flex items-center gap-2">
						<Clock className="w-4 h-4" />
						<Input
							type="time"
							value={tempTime}
							onChange={handleTimeChange}
							min={minTimeString}
							className="h-10"
						/>
					</div>

					<div className="flex justify-end">
						<Button
							onClick={handleSubmit}
							disabled={!tempDate}
							className="w-full h-10 px-4"
						>
							<Check className="w-4 h-4 mr-1" /> Done
						</Button>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}
