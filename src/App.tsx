import { useCallback, useEffect, useState } from 'react';
import type { DragEndEvent } from '@dnd-kit/core';
import {
	Box,
	Button,
	Container,
	Typography,
} from '@mui/material';

import {
	AppLoader,
	AppModel,
	AppSearchBar,
	DragDropProvider,
	ListContainer,
	ToDoCard,
} from '@components';
import type { ITaskFormData } from '@/types';

import { reorderSingleList } from './helpers/DragDrop.helper';
import type { ITodo } from './services/http/types';
import {
	AddToList,
	deleteFromList,
	getTheList,
	UpdateList,
} from './store/ToDoList';

import { useAppDispatch, useAppSelector } from './store';

const styles = {
	ContainerSx: {
		py: 4,
	},
	HeaderBoxSx: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		mb: 2,
	},
	BoardBoxSx: {
		display: 'flex',
		gap: 2,
		flexDirection: { xs: 'column', md: 'row' },
		alignItems: 'flex-start',
	},
	ColumnBoxSx: { flex: 1, minWidth: 250 },
	FormBoxSx: {
		display: 'flex',
		flexDirection: 'column',
		gap: 2,
		mt: 1,
	},
};

const App = () => {
	const dispatch = useAppDispatch();
	const { items: todoItems, isLoading } = useAppSelector(
		state => state.todo
	);

	const [items, setItems] = useState<ITodo[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	useEffect(() => {
		dispatch(getTheList({}));
	}, [dispatch]);

	useEffect(() => {
		setItems(todoItems);
	}, [todoItems]);

	const onOpenModal = useCallback(() => {
		setIsModalOpen(true);
	}, []);

	const onCloseModal = useCallback(() => {
		setIsModalOpen(false);
	}, []);
	const onSearchChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setSearchTerm(e.target.value);
		},
		[]
	);

	const handleCreate = useCallback(
		(data: ITaskFormData) => {
			dispatch(
				AddToList({
					title: data.title,
					description: data.description,
					status: data.status,
					column: 'backlog',
				})
			);
			setIsModalOpen(false);
		},
		[dispatch]
	);

	const handleDelete = useCallback(
		(id: string | number) => {
			const strId = String(id);
			dispatch(deleteFromList(strId));
		},
		[dispatch]
	);

	const handleDragEnd = useCallback(
		(event: DragEndEvent) => {
			const { active, over } = event;
			if (!over) return;

			const currentActiveItem = items.find(
				item => item.id === active.id
			);
			if (!currentActiveItem) return;

			let newColumn = currentActiveItem.column;
			const overItem = items.find(
				item => item.id === over.id
			);

			if (overItem) {
				newColumn = overItem.column;
			} else {
				const validColumns = [
					'backlog',
					'in_progress',
					'review',
					'done',
				];
				if (validColumns.includes(String(over.id))) {
					newColumn = String(over.id);
				}
			}

			if (newColumn !== currentActiveItem.column) {
				dispatch(
					UpdateList({
						...currentActiveItem,
						column: newColumn,
					})
				);
			}

			setItems(prev => {
				const activeIndex = prev.findIndex(
					item => item.id === active.id
				);
				const overIndex = prev.findIndex(
					item => item.id === over.id
				);

				if (activeIndex === -1) return prev;

				let newItems = [...prev];

				if (overIndex !== -1) {
					// Dropped over an item
					newItems[activeIndex] = {
						...newItems[activeIndex],
						column: newItems[overIndex].column,
					};
					newItems = reorderSingleList(newItems, event);
				} else {
					// Check if dropped over an empty container
					const validColumns = [
						'backlog',
						'in_progress',
						'review',
						'done',
					];
					if (validColumns.includes(String(over.id))) {
						newItems[activeIndex] = {
							...newItems[activeIndex],
							column: String(over.id),
						};
					}
				}

				return newItems;
			});
		},
		[dispatch, items]
	);

	const filteredItems = items.filter(
		item =>
			item.title
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			item.description
				.toLowerCase()
				.includes(searchTerm.toLowerCase())
	);

	if (isLoading && todoItems.length === 0) {
		return <AppLoader />;
	}

	return (
		<Container maxWidth="xl" sx={styles.ContainerSx}>
			<Box sx={styles.HeaderBoxSx}>
				<Typography variant="h4" component="h1">
					TaskMada To-Do List
				</Typography>
				<AppSearchBar
					value={searchTerm}
					onChange={onSearchChange}
					placeholder="Search tasks..."
				/>
				<Button variant="contained" onClick={onOpenModal}>
					Add Task
				</Button>
			</Box>
			<DragDropProvider onDragEnd={handleDragEnd}>
				<Box sx={styles.BoardBoxSx}>
					{[
						{ id: 'backlog', title: 'Backlog' },
						{ id: 'done', title: 'Done' },
						{ id: 'review', title: 'Review' },
						{ id: 'in_progress', title: 'In Progress' },
					].map(column => {
						const columnItems = filteredItems.filter(
							item => item.column === column.id
						);
						return (
							<Box key={column.id} sx={styles.ColumnBoxSx}>
								<ListContainer
									title={column.title}
									id={column.id}
									items={columnItems.map(item => item.id)}
								>
									{columnItems.map(item => (
										<ToDoCard
											key={item.id}
											id={item.id}
											title={item.title}
											description={item.description}
											status={item.status}
											onDelete={handleDelete}
										/>
									))}
								</ListContainer>
							</Box>
						);
					})}
				</Box>
			</DragDropProvider>

			<AppModel
				isOpen={isModalOpen}
				onClose={onCloseModal}
				title="Create New Task"
				onConfirm={handleCreate}
			/>
		</Container>
	);
};

export default App;
