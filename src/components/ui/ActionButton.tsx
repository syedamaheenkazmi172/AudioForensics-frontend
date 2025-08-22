import React from 'react';

interface ActionButtonProps {
	label: string;
	onClick?: () => void;
	disabled?: boolean;
}

function ActionButton({ label, onClick, disabled }: ActionButtonProps) {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			style={{
				width: '100%',
				display: 'block',
				padding: '1.5rem',
				fontSize: '1.4rem',
				fontWeight: 600,
				border: 'none',
				borderRadius: '0.5rem',
				cursor: disabled ? 'not-allowed' : 'pointer',
				backgroundColor: 'var(--color-primary)',
				color: 'var(--color-text)',
				transition: 'background-color 0.2s ease, transform 0.05s ease',
			}}
			onMouseOver={(e) => {
				if (disabled) return;
				(e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-secondary)';
			}}
			onMouseOut={(e) => {
				if (disabled) return;
				(e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-primary)';
			}}
			onMouseDown={(e) => {
				if (disabled) return;
				(e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.995)';
			}}
			onMouseUp={(e) => {
				if (disabled) return;
				(e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
			}}
		>
			{label}
		</button>
	);
}

export default ActionButton;
