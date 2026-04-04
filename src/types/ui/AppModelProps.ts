import type { ReactNode } from 'react';

export interface IAppModelProps<T = unknown> {
	isOpen: boolean;
	onClose: () => void;
	title?: ReactNode;
	children?: ReactNode;
	actions?: ReactNode;
	onConfirm?: (data: T) => void;
	maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}
export interface ITaskFormData {
	title: string;
	description: string;
	status: 'high' | 'medium' | 'low' | 'done';
}
