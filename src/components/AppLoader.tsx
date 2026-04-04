import { Box, CircularProgress } from '@mui/material';

const styles = {
	BoxSx: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh',
	},
};

const AppLoader = () => {
	return (
		<Box sx={styles.BoxSx}>
			<CircularProgress />
		</Box>
	);
};

export default AppLoader;
