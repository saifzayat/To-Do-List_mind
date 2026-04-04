import type { AlertColor } from '@mui/material';

export interface IAppToastProps {
	open: boolean;
	message: string;
	severity?: AlertColor;
	onClose: (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => void;
	autoHideDuration?: number;
}
