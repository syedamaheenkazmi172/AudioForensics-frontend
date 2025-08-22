import { postMultipart } from './apiClient';

export interface SentimentResponse {
	sentiment: 'positive' | 'neutral' | 'negative';
	score?: number;
}

export async function analyzeSentiment(file: File): Promise<SentimentResponse> {
	const form = new FormData();
	form.append('file', file);
	return postMultipart<SentimentResponse>('/sentiment', form);
}
