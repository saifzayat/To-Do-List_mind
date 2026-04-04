import SearchIcon from '@mui/icons-material/Search';
import {
	IconButton,
	InputBase,
	Paper,
} from '@mui/material';

import type { IAppSearchBarProps } from '@/types';

const styles = {
	PaperSx: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: 400,
	},
	InputBaseSx: {
		ml: 1,
		flex: 1,
	},
	IconButtonSx: {
		p: '10px',
	},
	InputBaseInputPropsSx: {
		'aria-label': 'search',
	},
};

const AppSearchBar = ({
	value,
	onChange,
	placeholder = 'Search...',
	isDisabled = false,
}: IAppSearchBarProps) => {
	return (
		<Paper sx={styles.PaperSx} elevation={1}>
			<IconButton
				sx={styles.IconButtonSx}
				aria-label="search"
				disabled={isDisabled}
			>
				<SearchIcon />
			</IconButton>
			<InputBase
				sx={styles.InputBaseSx}
				placeholder={placeholder}
				inputProps={styles.InputBaseInputPropsSx}
				value={value}
				onChange={onChange}
				disabled={isDisabled}
			/>
		</Paper>
	);
};

export default AppSearchBar;
