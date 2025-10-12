import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { cn } from '@/lib/utils';
import { Card } from './ui/card';

interface TimeElementProps extends React.HTMLAttributes<HTMLDivElement> {
	value: string;
	unit: string;
}

const TimeElement = ({ value, unit, className, ...props }: TimeElementProps) => {
	const { isSm } = useWindowDimensions();

	return (
		<div className="w-full">
			<Card
				className={cn(
					'flex items-center w-full flex-col px-4 py-6 mb-2 md:mb-4',
					className
				)}
				{...props}
			>
				<h3 className="scroll-m-20 text-4xl sm:text-5xl font-extrabold tracking-tight">
					{value}
				</h3>
			</Card>

			<h4 className="scroll-m-20 text-2xl sm:text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center capitalize">
				{isSm ? unit[0] : unit}
			</h4>
		</div>
	);
};

export default TimeElement;
