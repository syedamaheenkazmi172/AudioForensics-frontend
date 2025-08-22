import { postMultipart } from './apiClient';

export interface TemporalSplice {
	time: number;
	confidence: number;
	methods?: string[];
}

export interface TemporalResponse {
	file: string;
	background_splices: TemporalSplice[];
	phase_splices: TemporalSplice[];
	combined_splices: TemporalSplice[];
	graph: string | null;
}

export async function detectTemporalInconsistencies(file: File): Promise<TemporalResponse> {
	const form = new FormData();
	form.append('file', file);
	return postMultipart<TemporalResponse>('/temporal_inconsistency/', form);
}
