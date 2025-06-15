import { api } from '../services/api'
export default async function getCards() {
	const token = localStorage.getItem('token')
	const userID = localStorage.getItem('userId')
	try {
		const { data } = await api.get(`/cards/user/${userID}`, {
			headers: { Authorization: `Bearer ${token}` },
		})
		if (!data) {
			return
		} else {
			return data
		}
		console.log(data)
	} catch (e) {
		console.log(e)
	}
}
