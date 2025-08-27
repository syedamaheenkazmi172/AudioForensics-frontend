import { postMultipart } from './apiClient';

export interface CreateCaseResponse {
	id: string;
	name: string;
	created_at: string;
}

export async function createCase(params: { file: File; name: string; notes?: string }): Promise<CreateCaseResponse> {
	const form = new FormData();
	form.append('file', params.file);
	form.append('name', params.name);
	if (params.notes) form.append('notes', params.notes);
	return postMultipart<CreateCaseResponse>('/cases', form);
}


