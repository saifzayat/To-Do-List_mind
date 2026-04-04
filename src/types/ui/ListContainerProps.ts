import type { ReactNode } from 'react';
import type { UniqueIdentifier } from '@dnd-kit/core';
import type { SxProps, Theme } from '@mui/material';
export interface IListContainerProps {
	id: string;
	items: UniqueIdentifier[];
	children: ReactNode;
	sx?: SxProps<Theme>;
	title: string;
	dotColor?: string;
}
