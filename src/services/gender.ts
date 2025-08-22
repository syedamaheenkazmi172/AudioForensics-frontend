import { postMultipart } from './apiClient';

export interface GenderDetectionResponse {
	gender: string;
}

export async function detectGender(file: File): Promise<GenderDetectionResponse> {
	const form = new FormData();
	form.append('file', file);
	return postMultipart<GenderDetectionResponse>('/gender/', form);
}
