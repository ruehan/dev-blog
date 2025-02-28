'use client';

import React from 'react';

interface ExpoSnackProps {
  id: string;
  height?: number;
}

export default function ExpoSnack({ id, height = 500 }: ExpoSnackProps) {
	return (
		<iframe
			src={`https://snack.expo.dev/${id}`}
			title={`Expo Snack Example: ${id}`}
			style={{
				width: "100%",
				height: `${height}px`,
				border: "1px solid #ddd",
				borderRadius: "4px",
				overflow: "hidden",
			}}
			loading="lazy"
			aria-label={`Interactive Expo Snack code example: ${id}`}
		/>
	);
}
