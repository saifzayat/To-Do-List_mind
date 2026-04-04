import type {
	DragEndEvent,
	UniqueIdentifier,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

export const reorderSingleList = <
	T extends { id: UniqueIdentifier },
>(
	items: T[],
	event: DragEndEvent
): T[] => {
	const { active, over } = event;

	if (over && active.id !== over.id) {
		const oldIndex = items.findIndex(
			i => i.id === active.id
		);
		const newIndex = items.findIndex(i => i.id === over.id);

		return arrayMove(items, oldIndex, newIndex);
	}

	return items;
};
