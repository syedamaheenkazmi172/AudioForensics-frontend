import { postMultipart } from './apiClient';

export interface GenderDetectionResponse {
	gender: 'male' | 'female' | 'unknown';
	confidence?: number;
}

export async function detectGender(file: File): Promise<GenderDetectionResponse> {
	const form = new FormData();
	form.append('file', file);
	return postMultipart<GenderDetectionResponse>('/gender', form);
}
