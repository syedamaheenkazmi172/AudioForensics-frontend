import { postMultipart } from './apiClient';

export interface MetadataEnvelope {
	success: boolean;
	filename: string;
	analysis_timestamp: string;
	original_timestamps_received?: {
		modified: string | null;
		created: string | null;
	} | null;
	metadata: {
		"File System Information": Record<string, string>;
		"Audio Properties": Record<string, string>;
		"Format Analysis": Record<string, unknown>;
		"File Fingerprints": Record<string, unknown>;
		"Advanced Audio Analysis": Record<string, unknown>;
		"Metadata Tags": Record<string, unknown>;
	};
}

export async function extractMetadata(file: File): Promise<MetadataEnvelope> {
	const form = new FormData();
	form.append('file', file);
	
	// Add original file timestamps
	if (file.lastModified) {
		form.append('original_modified', file.lastModified.toString());
	}
	
	return postMultipart<MetadataEnvelope>('/metadata/', form);
}
