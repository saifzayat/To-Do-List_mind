import { memo, useMemo } from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Box, Typography } from '@mui/material';

import type { IListContainerProps } from '../types';
const styles = {
	BoxSx: {
		mb: 2,
		display: 'flex',
		alignItems: 'center',
		gap: 1,
	},
	DotSx: (dotColor: string) => ({
		width: 12,
		height: 12,
		borderRadius: '50%',
		backgroundColor: dotColor || 'primary.main',
	}),
};
const ListContainer = memo(
	({
		id,
		items,
		children,
		sx,
		title,
		dotColor,
	}: IListContainerProps) => {
		const { setNodeRef } = useDroppable({ id });
		const boxSx = useMemo(
			() => ({
				minHeight: 100,
				padding: 2,
				backgroundColor: 'background.default',
				borderRadius: 2,
				...sx,
			}),
			[sx]
		);

		return (
			<SortableContext
				id={id as string}
				items={items}
				strategy={verticalListSortingStrategy}
			>
				<Box ref={setNodeRef} sx={boxSx}>
					<Box sx={styles.BoxSx}>
						<Box
							sx={styles.DotSx(dotColor || 'primary.main')}
						/>
						<Typography variant="h6">{title}</Typography>
					</Box>
					{children}
				</Box>
			</SortableContext>
		);
	},
	(
		prevProps: Readonly<IListContainerProps>,
		nextProps: Readonly<IListContainerProps>
	) => {
		return (
			prevProps.id === nextProps.id &&
			prevProps.items === nextProps.items &&
			prevProps.children === nextProps.children &&
			prevProps.sx === nextProps.sx
		);
	}
);
export default ListContainer;
