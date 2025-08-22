import { postMultipart } from './apiClient';

export interface MetadataResponse {
	[key: string]: unknown;
}

export async function extractMetadata(file: File): Promise<MetadataResponse> {
	const form = new FormData();
	form.append('file', file);
	return postMultipart<MetadataResponse>('/metadata', form);
}
