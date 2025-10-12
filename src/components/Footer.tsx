import { cn } from '@/lib/utils';
import { Code2, Github, Linkedin, Mail } from 'lucide-react';
import { buttonVariants } from './ui/button';
import { Separator } from './ui/separator';

const Footer = () => {
	const socials = [
		{
			name: 'GitHub',
			url: 'https://github.com/0mppula',
			icon: <Github className="size-6" />,
		},
		{
			name: 'LinkedIn',
			url: 'https://www.linkedin.com/in/omarkraidie/',
			icon: <Linkedin className="size-6" />,
		},
		{
			name: 'Email',
			url: 'mailto:devomarkraidie@gmail.com',
			icon: <Mail className="size-6" />,
		},
		{
			name: 'Developer Portfolio',
			url: 'https://www.omarkraidie.com/',
			icon: <Code2 className="size-6" />,
		},
	];

	return (
		<footer className="w-full pt-16 pb-8 text-center border-t-2">
			<div className="flex sm:gap-8 gap-4 items-center justify-center">
				{socials.map((social) => (
					<a
						key={social.name}
						target="_blank"
						rel="noopener noreferrer"
						className={cn(
							buttonVariants({ variant: 'ghost', size: 'icon' }),
							'rounded-full size-16'
						)}
						href={social.url}
					>
						{social.icon}

						<span className="sr-only">{social.name}</span>
					</a>
				))}
			</div>

			<Separator className="mb-6 mt-4 mx-auto !w-[min(444px,80vw)]" />

			<div>
				<span>Developed by </span>
				<a
					href="https://www.omarkraidie.com/"
					target="_blank"
					rel="noopener noreferrer"
					className="active:decoration-dashed active:primary underline"
				>
					Omar Kraidié
				</a>
			</div>
		</footer>
	);
};

export default Footer;
