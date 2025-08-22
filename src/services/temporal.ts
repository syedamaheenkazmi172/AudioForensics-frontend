import { postMultipart } from './apiClient';

export interface TemporalIssue {
	timestamp: number;
	description: string;
}

export interface TemporalResponse {
	issues: TemporalIssue[];
}

export async function detectTemporalInconsistencies(file: File): Promise<TemporalResponse> {
	const form = new FormData();
	form.append('file', file);
	return postMultipart<TemporalResponse>('/temporal', form);
}
