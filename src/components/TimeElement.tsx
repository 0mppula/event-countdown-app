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
		<div>
			<Card
				className={cn(
					'flex items-center flex-col px-4 md:px-6 py-6 md:py-8 mb-2 md:mb-4 w-auto md:min-w-36',
					className
				)}
				{...props}
			>
				<h3 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-7xl">
					{value}
				</h3>
			</Card>

			<h4 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center capitalize">
				{isSm ? unit[0] : unit}
			</h4>
		</div>
	);
};

export default TimeElement;
