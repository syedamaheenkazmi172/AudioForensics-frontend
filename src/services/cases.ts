import { postMultipart, getJson } from './apiClient';

export interface CreateCaseResponse {
	id: string;
	name: string;
	created_at: string;
	message: string;
}

export interface Case {
	id: string;
	name: string;
	original_filename: string;
	created_at: string;
	updated_at: string;
	notes?: string;
}

export interface CaseWithAnalyses extends Case {
	analyses: {
		transcription?: {
			text: string;
			confidence?: number;
			language?: string;
		};
		sentiment?: {
			sentiment: string;
			confidence?: number;
		};
		gender?: {
			gender: string;
			confidence?: number;
		};
		metadata?: {
			metadata: any;
			original_timestamps?: any;
		};
		temporal?: {
			background_splices: Array<{ time: number; confidence: number }>;
			phase_splices: Array<{ time: number; confidence: number }>;
			combined_splices: Array<{ time: number; confidence: number; methods?: string[] }>;
		};
		diarization?: {
			estimated_speakers: number;
			segments: Array<{
				speaker: string;
				start: number;
				end: number;
				file_url: string;
				transcription?: string;
				sentiment?: string;
				gender?: string;
			}>;
		};
	};
}

export async function createCase(params: { file: File; name: string; notes?: string }): Promise<CreateCaseResponse> {
	const form = new FormData();
	form.append('file', params.file);
	form.append('name', params.name);
	if (params.notes) form.append('notes', params.notes);
	return postMultipart<CreateCaseResponse>('/cases', form);
}

export async function getAllCases(): Promise<Case[]> {
	return getJson<Case[]>('/cases');
}

export async function getCase(caseId: string): Promise<CaseWithAnalyses> {
	return getJson<CaseWithAnalyses>(`/cases/${caseId}`);
}

export async function deleteCase(caseId: string): Promise<{ message: string }> {
	const response = await fetch(`${process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000'}/cases/${caseId}`, {
		method: 'DELETE',
	});
	if (!response.ok) {
		throw new Error(`Failed to delete case: ${response.statusText}`);
	}
	return response.json();
}

// Segment analysis functions
export async function transcribeSegment(caseId: string, segmentIndex: number): Promise<{ transcription: string }> {
	const response = await fetch(`${process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000'}/cases/${caseId}/segments/${segmentIndex}/transcribe`, {
		method: 'POST',
	});
	if (!response.ok) {
		throw new Error(`Failed to transcribe segment: ${response.statusText}`);
	}
	return response.json();
}

export async function analyzeSegmentSentiment(caseId: string, segmentIndex: number): Promise<{ sentiment: string }> {
	const response = await fetch(`${process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000'}/cases/${caseId}/segments/${segmentIndex}/sentiment`, {
		method: 'POST',
	});
	if (!response.ok) {
		throw new Error(`Failed to analyze segment sentiment: ${response.statusText}`);
	}
	return response.json();
}

export async function detectSegmentGender(caseId: string, segmentIndex: number): Promise<{ gender: string }> {
	const response = await fetch(`${process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000'}/cases/${caseId}/segments/${segmentIndex}/gender`, {
		method: 'POST',
	});
	if (!response.ok) {
		throw new Error(`Failed to detect segment gender: ${response.statusText}`);
	}
	return response.json();
}


