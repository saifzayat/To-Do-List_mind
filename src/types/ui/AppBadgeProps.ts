import type { ReactNode } from 'react';

export interface IAppBadgeProps {
	children?: ReactNode;
	color?: 'high' | 'medium' | 'low' | 'done';
	variant?: 'solid' | 'outlined' | 'soft';
	size?: 'small' | 'medium';
	isDisabled?: boolean;
}
