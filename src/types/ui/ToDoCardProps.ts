import type { UniqueIdentifier } from '@dnd-kit/core';
import type { SxProps, Theme } from '@mui/material';

export interface IToDoCardProps {
	id: UniqueIdentifier;
	isDisabled?: boolean;
	sx?: SxProps<Theme>;
	title: string;
	description: string;
	status: 'high' | 'medium' | 'low' | 'done';
	onDelete?: (id: UniqueIdentifier) => void;
}
