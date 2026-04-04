import { useCallback, useState } from 'react';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	MenuItem,
	TextField,
} from '@mui/material';

import type {
	IAppModelProps,
	ITaskFormData,
} from '@/types';
const styles = {
	FormBoxSx: {
		display: 'flex',
		flexDirection: 'column',
		gap: 2,
		mt: 1,
	},
};

const AppModel = ({
	isOpen,
	onClose,
	title,
	children,
	actions,
	onConfirm,
	maxWidth = 'sm',
}: IAppModelProps<ITaskFormData>) => {
	const [newTask, setNewTask] = useState<ITaskFormData>({
		title: '',
		description: '',
		status: 'medium',
	});

	const onChangeTitle = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setNewTask(prev => ({
				...prev,
				title: e.target.value,
			}));
		},
		[]
	);

	const onChangeDescription = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setNewTask(prev => ({
				...prev,
				description: e.target.value,
			}));
		},
		[]
	);

	const onChangeStatus = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setNewTask(prev => ({
				...prev,
				status: e.target.value as unknown as
					| 'high'
					| 'medium'
					| 'low'
					| 'done',
			}));
		},
		[]
	);

	const handleConfirm = useCallback(() => {
		onConfirm?.(newTask);
		setNewTask({
			title: '',
			description: '',
			status: 'medium',
		});
	}, [onConfirm, newTask]);

	return (
		<Dialog
			open={isOpen}
			onClose={onClose}
			maxWidth={maxWidth}
			fullWidth
		>
			{title && <DialogTitle>{title}</DialogTitle>}
			<DialogContent>
				{children}
				<Box sx={styles.FormBoxSx}>
					<TextField
						label="Title"
						fullWidth
						value={newTask.title}
						onChange={onChangeTitle}
					/>
					<TextField
						label="Description"
						fullWidth
						multiline
						rows={3}
						value={newTask.description}
						onChange={onChangeDescription}
					/>
					<TextField
						select
						label="Priority Indicator"
						fullWidth
						value={newTask.status}
						onChange={onChangeStatus}
					>
						<MenuItem value="low">Low</MenuItem>
						<MenuItem value="medium">Medium</MenuItem>
						<MenuItem value="high">High</MenuItem>
					</TextField>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button
					variant="contained"
					onClick={handleConfirm}
					disabled={!newTask.title}
				>
					Create
				</Button>
				{actions}
			</DialogActions>
		</Dialog>
	);
};

export default AppModel;
