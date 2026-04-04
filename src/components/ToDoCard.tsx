import { memo, useCallback, useMemo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DeleteIcon from '@mui/icons-material/Delete';
import type { SxProps, Theme } from '@mui/material';
import {
	Box,
	IconButton,
	Paper,
	Typography,
} from '@mui/material';

import type { IToDoCardProps } from '../types';

import AppBadge from './AppBadge';
const styles = {
	BoxSx: {
		p: 2,
		position: 'relative',
	},
	TitleSx: { pr: 3 },
	DescSx: { mb: 1, pr: 3 },
	IconButtonSx: {
		position: 'absolute',
		top: 8,
		right: 8,
	},
};
const ToDoCard = memo(
	({
		id,
		isDisabled,
		sx,
		title,
		description,
		status,
		onDelete,
	}: IToDoCardProps) => {
		const {
			attributes,
			listeners,
			setNodeRef,
			transform,
			transition,
			isDragging,
		} = useSortable({ id, disabled: isDisabled });

		const style = {
			transform: CSS.Transform.toString(transform),
			transition,
		} as React.CSSProperties;

		const combinedSx = useMemo<SxProps<Theme>>(
			() => ({
				mb: 2,
				borderRadius: 2,
				cursor: isDisabled ? 'default' : 'grab',
				opacity: isDragging ? 0.6 : 1,
				position: isDragging ? 'relative' : 'static',
				zIndex: isDragging ? 1000 : 'auto',
				transition: 'box-shadow 0.2s ease',
				'&:active': {
					cursor: isDisabled ? 'default' : 'grabbing',
				},
				...(sx || {}),
			}),
			[isDisabled, isDragging, sx]
		);

		const handleDelete = useCallback(
			(e: React.MouseEvent) => {
				e.stopPropagation();
				if (onDelete) {
					onDelete(id);
				}
			},
			[id, onDelete]
		);

		const stopPointerDown = useCallback(
			(e: React.PointerEvent) => {
				e.stopPropagation();
			},
			[]
		);

		return (
			<Paper
				ref={setNodeRef}
				style={style}
				elevation={isDragging ? 6 : 1}
				{...attributes}
				{...listeners}
				sx={combinedSx}
			>
				<Box sx={styles.BoxSx}>
					<Typography variant="h6" sx={styles.TitleSx}>
						{title}
					</Typography>
					<Typography
						variant="body2"
						color="text.secondary"
						sx={styles.DescSx}
					>
						{description}
					</Typography>
					<AppBadge color={status}>{status}</AppBadge>

					{onDelete && (
						<IconButton
							size="small"
							color="error"
							onClick={handleDelete}
							onPointerDown={stopPointerDown}
							sx={styles.IconButtonSx}
						>
							<DeleteIcon fontSize="small" />
						</IconButton>
					)}
				</Box>
			</Paper>
		);
	}
);
export default ToDoCard;
