const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000';

async function parseError(res: Response): Promise<never> {
	let message = `${res.status} ${res.statusText}`;
	try {
		const data = await res.json();
		// FastAPI often returns { detail: string | {msg: string}[] }
		if (data?.detail) {
			if (typeof data.detail === 'string') {
				message = data.detail;
			} else if (Array.isArray(data.detail) && data.detail.length > 0) {
				const first = data.detail[0];
				message = first?.msg || JSON.stringify(data.detail);
			} else {
				message = JSON.stringify(data.detail);
			}
		} else {
			message = JSON.stringify(data);
		}
	} catch (_) {
		// ignore JSON parse failure; fall back to status text
	}
	throw new Error(message);
}

export async function getJson<T>(path: string): Promise<T> {
	const res = await fetch(`${API_BASE_URL}${path}`, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
		},
	});
	if (!res.ok) return parseError(res);
	return res.json() as Promise<T>;
}

export async function postJson<T>(path: string, body: unknown): Promise<T> {
	const res = await fetch(`${API_BASE_URL}${path}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		},
		body: JSON.stringify(body),
	});
	if (!res.ok) return parseError(res);
	return res.json() as Promise<T>;
}

export async function postMultipart<T>(path: string, form: FormData): Promise<T> {
	const res = await fetch(`${API_BASE_URL}${path}`, {
		method: 'POST',
		body: form,
	});
	if (!res.ok) return parseError(res);
	return res.json() as Promise<T>;
}
