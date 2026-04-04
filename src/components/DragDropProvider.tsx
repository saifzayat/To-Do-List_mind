import React from 'react';
import {
	closestCenter,
	DndContext,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

import type { IDragDropProviderProps } from '../types';

const DragDropProvider: React.FC<
	IDragDropProviderProps
> = ({ children, onDragEnd, onDragStart, onDragOver }) => {
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={onDragEnd}
			onDragStart={onDragStart}
			onDragOver={onDragOver}
		>
			{children}
		</DndContext>
	);
};
export default DragDropProvider;
