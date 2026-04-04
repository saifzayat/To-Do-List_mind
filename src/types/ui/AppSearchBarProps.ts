import type { ChangeEvent } from 'react';

export interface IAppSearchBarProps {
	value?: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	isDisabled?: boolean;
}
