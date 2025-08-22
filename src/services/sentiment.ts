import { postMultipart } from './apiClient';

export interface SentimentResponse {
	sentiment: string;
}

export async function analyzeSentiment(file: File): Promise<SentimentResponse> {
	const form = new FormData();
	form.append('file', file);
	return postMultipart<SentimentResponse>('/sentiment/', form);
}
