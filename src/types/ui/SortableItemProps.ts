import type { UniqueIdentifier } from '@dnd-kit/core';

export interface ISortableItemProps {
	id: UniqueIdentifier;
	children: React.ReactNode;
	isDisabled?: boolean;
}
