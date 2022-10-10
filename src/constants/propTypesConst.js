import PropTypes from 'prop-types';

export const propTypesConst = {
	question: PropTypes.shape({
		id: PropTypes.string,
		type: PropTypes.string,
		question: PropTypes.string,
		options: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string,
				title: PropTypes.string,
				checked: PropTypes.bool,
				correct: PropTypes.bool,
			})
		),
	}),
	interviewDataItem: PropTypes.shape({
		id: PropTypes.string,
		changed: PropTypes.string,
		answers: PropTypes.number,
		title: PropTypes.string,
		link: PropTypes.string,
		results: PropTypes.string,
	}),
	userDataItem: PropTypes.shape({
		id: PropTypes.string,
		email: PropTypes.string,
		interviews: PropTypes.number,
		password: PropTypes.string,
		registered: PropTypes.string,
		role: PropTypes.string,
		username: PropTypes.string,
	}),
	selectItem: PropTypes.shape({
		userId: PropTypes.number,
		id: PropTypes.number,
		title: PropTypes.string,
		completed: PropTypes.bool,
	}),

	tableRowsItem: PropTypes.oneOfType([
		PropTypes.shape({
			id: PropTypes.string,
			username: PropTypes.string,
			email: PropTypes.string,
			password: PropTypes.string,
			role: PropTypes.string,
			registered: PropTypes.string,
			interviews: PropTypes.number,
		}),
		PropTypes.shape({
			id: PropTypes.string,
			changed: PropTypes.string,
			answers: PropTypes.number,
			title: PropTypes.string,
			link: PropTypes.string,
			results: PropTypes.string,
		}),
	]),
	currentUser: PropTypes.shape({
		id: PropTypes.string,
		username: PropTypes.string,
		email: PropTypes.string,
		password: PropTypes.string,
		role: PropTypes.string,
		registered: PropTypes.string,
		interviews: PropTypes.number,
	}),
};
