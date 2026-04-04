import { Chip } from '@mui/material';

import type { IAppBadgeProps } from '@/types';

const AppBadge = ({
	children,
	color = 'high',
	variant = 'solid',
	size = 'medium',
	isDisabled = false,
}: IAppBadgeProps) => {
	const muiVariant =
		variant === 'solid' ? 'filled' : 'outlined';

	const muiColor = {
		high: 'error',
		medium: 'warning',
		low: 'success',
		done: 'info',
	}[color] as 'error' | 'warning' | 'success' | 'info';

	return (
		<Chip
			label={children}
			color={muiColor}
			variant={muiVariant}
			size={size}
			disabled={isDisabled}
		/>
	);
};

export default AppBadge;
