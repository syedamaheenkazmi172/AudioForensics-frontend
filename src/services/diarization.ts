import { postMultipart } from './apiClient';

export interface DiarizationSegment {
	start: number;
	end: number;
	speaker: string;
	file_url: string;
}

export interface DiarizationResponse {
	estimated_speakers: number;
	segments: DiarizationSegment[];
}

export async function diarizeAudio(file: File): Promise<DiarizationResponse> {
	const form = new FormData();
	form.append('file', file);
	return postMultipart<DiarizationResponse>('/diarization/', form);
}
