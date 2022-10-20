import React from 'react';
import { INLINE_STYLES } from 'Constants/textEditorConstants';
import { StyleButton } from './StyleButton';

export const InlineStyleControls = ({ editorState, onToggle }) => {
	const currentStyle = editorState.getCurrentInlineStyle();

	return (
		<div className="RichEditor-controls">
			{INLINE_STYLES.map((type) => (
				<StyleButton
					key={type.label}
					active={currentStyle.has(type.style)}
					label={type.label}
					onToggle={onToggle}
					style={type.style}
				/>
			))}
		</div>
	);
};
