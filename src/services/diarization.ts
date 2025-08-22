import { postMultipart } from './apiClient';

export interface DiarizationSegment {
	start: number;
	end: number;
	speaker: string;
}

export interface DiarizationResponse {
	segments: DiarizationSegment[];
}

export async function diarizeAudio(file: File): Promise<DiarizationResponse> {
	const form = new FormData();
	form.append('file', file);
	return postMultipart<DiarizationResponse>('/diarize', form);
}
