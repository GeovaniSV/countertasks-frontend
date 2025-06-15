import { AxiosError, HttpStatusCode, isAxiosError } from 'axios'
import { api } from '../services/api'
export default async function getCards() {
	const token = localStorage.getItem('token')
	const userID = localStorage.getItem('userId')
	try {
		const { data } = await api.get(`/cards/user/${userID}`, {
			headers: { Authorization: `Bearer ${token}` },
		})

		return data
	} catch (e) {
		if (e instanceof AxiosError) {
			if (e.response?.status === 404) {
				return []
			}
		} else {
			alert('Ocorreu um erro inesperado!')
		}
	}
}
