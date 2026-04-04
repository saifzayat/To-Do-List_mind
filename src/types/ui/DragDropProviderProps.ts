import type {
	DragEndEvent,
	DragOverEvent,
	DragStartEvent,
} from '@dnd-kit/core';

export interface IDragDropProviderProps {
	children: React.ReactNode;
	onDragEnd: (event: DragEndEvent) => void;
	onDragStart?: (event: DragStartEvent) => void;
	onDragOver?: (event: DragOverEvent) => void;
}
