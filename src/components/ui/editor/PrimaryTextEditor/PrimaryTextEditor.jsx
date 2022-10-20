import React, { useState, useRef } from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js';
import { styleMap } from 'Constants/textEditorConstants';
import { BlockStyleControls } from './BlockStyleControls ';
import { InlineStyleControls } from './InlineStyleControls';
import 'draft-js/dist/Draft.css';
import './PrimaryTextEditor.scss';

export const PrimaryTextEditor = () => {
	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty()
	);

	const ref = useRef();

	let cls = 'RichEditor-editor';
	const contentState = editorState.getCurrentContent();
	if (!contentState.hasText()) {
		if (contentState.getBlockMap().first().getType() !== 'unstyled') {
			cls += ' RichEditor-hidePlaceholder';
		}
	}

	const getBlockStyle = (block) => {
		switch (block.getType()) {
			case 'blockquote':
				return 'RichEditor-blockquote';
			default:
				return null;
		}
	};

	const handleChange = (newEditorState) => setEditorState(newEditorState);
	const handleFocus = () => ref.current.focus();

	const _handleKeyCommand = (command, newEditorState) => {
		const newState = RichUtils.handleKeyCommand(newEditorState, command);
		if (newState) {
			handleChange(newState);
			return true;
		}
		return false;
	};

	const _mapKeyToEditorCommand = (e) => {
		if (e.keyCode === 9 /* TAB */) {
			const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
			if (newEditorState !== editorState) {
				handleChange(newEditorState);
			}
			return;
		}
		return getDefaultKeyBinding(e);
	};

	const _toggleBlockType = (blockType) => {
		handleChange(RichUtils.toggleBlockType(editorState, blockType));
	};

	const _toggleInlineStyle = (inlineStyle) => {
		handleChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
	};

	const handleBlur = () => {
		console.log(editorState.getCurrentContent());
		console.log(editorState.getCurrentContent().getPlainText('\u0001'));
	};

	return (
		<div className="RichEditor-root">
			<BlockStyleControls
				editorState={editorState}
				onToggle={_toggleBlockType}
			/>
			<InlineStyleControls
				editorState={editorState}
				onToggle={_toggleInlineStyle}
			/>
			<div className={cls} onClick={handleFocus}>
				<Editor
					blockStyleFn={getBlockStyle}
					customStyleMap={styleMap}
					editorState={editorState}
					handleKeyCommand={_handleKeyCommand}
					keyBindingFn={_mapKeyToEditorCommand}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder="Tell a story..."
					ref={ref}
					spellCheck
				/>
			</div>
		</div>
	);
};
