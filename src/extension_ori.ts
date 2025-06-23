// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// set up
let currentOverlay: vscode.TextEditorDecorationType | null = null;

// function findMatches(editor: vscode.TextEditor, mode: 'symbol' | 'word' | 'eol' | 'blank', symbolChar = '=') {
// 	const matches: vscode.Position[] = [];

// 	for (const range of editor.visibleRanges) {
// 		for (let line = range.start.line; line <= range.end.line; line++) {
// 			const text = editor.document.lineAt(line).text;

// 			if (mode === 'symbol') {
// 				const regex = new RegExp(`\\${symbolChar}`, 'g');
// 				let match: RegExpExecArray | null;
// 				while ((match = regex.exec(text)) !== null) {
// 					matches.push(new vscode.Position(line, match.index));
// 				}
// 			} else if (mode === 'word') {
// 				const regex = /\b\w/g;
// 				let match: RegExpExecArray | null;
// 				while ((match = regex.exec(text)) !== null) {
// 					matches.push(new vscode.Position(line, match.index));
// 				}
// 			} else if (mode === 'eol') {
// 				matches.push(new vscode.Position(line, text.length));
// 			} else if (mode === 'blank' && text.trim() === '') {
// 				matches.push(new vscode.Position(line, 0));
// 			}
// 		}
// 	}

// 	return matches;
// }

function findMatches(editor: vscode.TextEditor, mode: 'symbol' | 'word'): vscode.Position[] {
	const matches: vscode.Position[] = [];
	const SYMBOLS_REGEX = /[=()[\]{}"'`]/g;
	const WORD_REGEX = /\b\w/g;

	for (const range of editor.visibleRanges) {
		for (let line = range.start.line; line <= range.end.line; line++) {
			const text = editor.document.lineAt(line).text;

			// Symbols
			if (mode === 'symbol') {
				let match: RegExpExecArray | null;
				while ((match = SYMBOLS_REGEX.exec(text)) !== null) {
					matches.push(new vscode.Position(line, match.index));
				}
			} else if (mode === 'word') {
				// Word beginnings
				let match: RegExpExecArray | null;
				while ((match = WORD_REGEX.exec(text)) !== null) {
					matches.push(new vscode.Position(line, match.index));
				}
			}
		}
	}

	return matches;
}

function generateLabels(count: number): string[] {
	const chars = 'asdfghjklqwertyuiopzxcvbnm'; // can customize
	const labels: string[] = [];

	for (let i = 0; i < count; i++) {
		if (i < chars.length) {
			labels.push(chars[i]);
		} else {
			const first = chars[Math.floor(i / chars.length) - 1];
			const second = chars[i % chars.length];
			labels.push(first + second);
		}
	}

	return labels;
}


function showOverlays(editor: vscode.TextEditor, positions: vscode.Position[], labels: string[]) {
	const decorations: vscode.DecorationOptions[] = [];

	for (let i = 0; i < positions.length; i++) {
		decorations.push({
			range: new vscode.Range(positions[i], positions[i]),
			// renderOptions: {
			// 	before: {
			// 		contentText: labels[i],
			// 		color: '#ffffff',
			// 		backgroundColor: '#ff0066',
			// 		fontWeight: 'bold',
			// 		margin: '0 4px 0 0'
			// 	}
			// }
			// renderOptions: {
			// 	before: {
			// 		contentText: labels[i],
			// 		color: '#a6d189',
			// 		backgroundColor: '#567899',
			// 		fontWeight: 'bold',
			// 		margin: '0',
			// 		textDecoration: 'none; position: absolute; z-index: 1000; pointer-events: none;',
			// 	}
			// }

			renderOptions: {
				after: {
					contentText: labels[i],
					backgroundColor: '#ff0066',
					color: '#fff',
					fontWeight: 'regular',
					margin: '0 0 0 2px',
					textDecoration: 'none; position: absolute; z-index: 1000; pointer-events: none;',
				}
			}
		});
	}

	const decorationType = vscode.window.createTextEditorDecorationType({
		before: { textDecoration: 'none' }
	});

	editor.setDecorations(decorationType, decorations);

	currentOverlay = decorationType;
	// return decorationType;
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const jumpToWord = vscode.commands.registerCommand('jump-key.jumpToWord', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;
		const matches = findMatches(editor, "word");
		const labels = generateLabels(matches.length);
		showOverlays(editor, matches, labels);
	});

	const jumpToSymbol = vscode.commands.registerCommand('jump-key.jumpToSymbol', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;
		const matches = findMatches(editor, "symbol");
		const labels = generateLabels(matches.length);
		showOverlays(editor, matches, labels);
	});

	const exitJump = vscode.commands.registerCommand('jump-key.exitJump', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;
		if (currentOverlay) {
			currentOverlay.dispose();
			currentOverlay = null;
		}
	});

	context.subscriptions.push(jumpToWord);
	context.subscriptions.push(exitJump);
}



// This method is called when your extension is deactivated
export function deactivate() { }
