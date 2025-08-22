const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export async function getJson<T>(path: string): Promise<T> {
	const res = await fetch(`${API_BASE_URL}${path}`, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
		},
	});
	if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
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
	if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
	return res.json() as Promise<T>;
}

export async function postMultipart<T>(path: string, form: FormData): Promise<T> {
	const res = await fetch(`${API_BASE_URL}${path}`, {
		method: 'POST',
		body: form,
	});
	if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
	return res.json() as Promise<T>;
}
