import type { SyntheticEvent } from 'react';
import type { SnackbarOrigin } from '@mui/material';
import { Alert, Snackbar } from '@mui/material';

import type { IAppToastProps } from '@/types';
const styles = {
	AnchorOrigin: {
		vertical: 'top',
		horizontal: 'right',
	} as SnackbarOrigin,
	AlertSx: {
		width: '100%',
	},
};

const AppToast = ({
	open,
	message,
	severity = 'info',
	onClose,
	autoHideDuration = 4000,
}: IAppToastProps) => {
	return (
		<Snackbar
			open={open}
			autoHideDuration={autoHideDuration}
			onClose={onClose}
			anchorOrigin={styles.AnchorOrigin}
		>
			<Alert
				onClose={onClose as (event: SyntheticEvent) => void}
				severity={severity}
				sx={styles.AlertSx}
				variant="filled"
			>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default AppToast;
