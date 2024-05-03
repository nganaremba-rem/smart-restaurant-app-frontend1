export default function getUser() {
	const user = JSON.parse(localStorage.getItem("SRA_userData"));

	// Assign null if user doesn't exist
	if (!user)
		return {
			email: null,
			firstName: null,
			lastName: null,
			role: null,
			token: null,
			_id: null,
		};

	// Since user exist we can destructure
	const { email, firstName, lastName, role, token, _id } = user;

	return { email, firstName, lastName, role, token, _id };
}
