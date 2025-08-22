import React from 'react';

interface ActionResultCardProps {
	title: string;
	status?: 'idle' | 'loading' | 'success' | 'error';
	children?: React.ReactNode;
	onBack?: () => void;
}

function ActionResultCard({ title, status = 'idle', children, onBack }: ActionResultCardProps) {
	return (
		<div
			style={{
				border: '2px solid var(--color-primary)',
				borderRadius: '0.5rem',
				background: 'var(--color-background)',
				color: 'var(--color-primary)',
				padding: '1rem',
			}}
		>
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
				<h2 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--color-primary)' }}>{title}</h2>
				{onBack && (
					<button
						onClick={onBack}
						style={{
							padding: '0.3rem 0.6rem',
							fontSize: '0.9rem',
							border: '1px solid var(--color-primary)',
							borderRadius: '0.35rem',
							background: 'transparent',
							color: 'var(--color-text)',
							cursor: 'pointer',
						}}
						onMouseOver={(e) => {
							(e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-secondary)';
						}}
						onMouseOut={(e) => {
							(e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
						}}
					>
						Back
					</button>
				)}
			</div>

			{status === 'loading' && <div>Loading...</div>}
			{status === 'error' && <div style={{ color: 'var(--color-accent)' }}>Something went wrong.</div>}

			{children}
		</div>
	);
}

export default ActionResultCard;
