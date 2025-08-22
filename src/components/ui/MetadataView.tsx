import React from 'react';

interface MetadataViewProps {
	data: unknown;
	level?: number;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function MetadataView({ data, level = 0 }: MetadataViewProps) {
	if (data === null || data === undefined) {
		return <span style={{ color: 'var(--color-text-secondary)' }}>null</span>;
	}

	if (Array.isArray(data)) {
		return (
			<ul style={{ margin: 0, paddingLeft: '1rem', listStyle: 'disc' }}>
				{data.map((item, idx) => (
					<li key={idx} style={{ margin: '0.2rem 0' }}>
						<MetadataView data={item} level={level + 1} />
					</li>
				))}
			</ul>
		);
	}

	if (isPlainObject(data)) {
		const entries = Object.entries(data);
		return (
			<div style={{ borderLeft: level === 0 ? 'none' : '2px solid var(--color-primary)', paddingLeft: level === 0 ? 0 : '0.75rem' }}>
				{entries.map(([key, value]) => (
					<div key={key} style={{ margin: '0.25rem 0' }}>
						<div style={{ color: 'var(--color-text)', fontWeight: 600 }}>{key}</div>
						<div>
							<MetadataView data={value} level={level + 1} />
						</div>
					</div>
				))}
			</div>
		);
	}

	// primitive
	return <span style={{ color: 'var(--color-text-secondary)' }}>{String(data)}</span>;
}

export default MetadataView;
