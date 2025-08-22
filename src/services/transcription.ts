import { postMultipart } from './apiClient';

export interface TranscriptionResponse {
	text: string;
}

export async function transcribeAudio(file: File): Promise<TranscriptionResponse> {
	const form = new FormData();
	form.append('file', file);
	return postMultipart<TranscriptionResponse>('/transcribe', form);
}
