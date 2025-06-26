# jump-key README

This extension is *HEAVILY* based on `jump` extension from Wenfang Du. I adjusted functionality a bit to suit my coding style more.

## Features

- Jump to the start of character groups and empty pairs (`""`, `''`, `()`, `[]`, `{}`) with character-codes inserted in those jumpable places. `Alt+,`
- Jump to the end of character groups and empty pairs (`""`, `''`, `()`, `[]`, `{}`) with character-codes inserted in those jumpable places. `Alt+.`
- Select to the start of character groups with character-codes inserted in those jumpable places. `Alt+shift+,`
- Select to the end of character groups with character-codes inserted in those jumpable places. `Alt+shift+.`
- Now support multi-cursor!!: Add a new multi-cursor to another location
- Add a cursor to the start of a word. `Alt+ctrl+,`
- Add a cursor to the end of a word. `Alt+ctrl+.`
- Empty lines matching -> Now you can jump to any empty lines

The character-codes inserted use color and background color that are nice to the eyes, and match my favorite color theme: Catppuccin Frappe.

## Known Issues

The only issue I might improve in the future is the key tracking while in jump mode.

Now if you mess up or want to change keys you pressed, it doesn't work.

## Release Notes

### 0.3.1
- Fix bug that the regex matches `")` and similar sorts of mismatched pairs
- Change to use raw text to display with no shift in original text
- Adjust margin
- Add empty lines matching

### 0.3.0
- Add jump to empty matching pairs like: `""`, `''`, `()`, `[]`, `{}` there can be spaces inside those pairs.
- Jump to start -> jump to inside of the empty pair
- Jump to end -> Jump to after the closing empty pair

### 0.2.0
- Add multi-cursor support

### 0.1.2
- Update overlay display

### 0.1.1
- Update default colors

### 0.1.0

First version of my version of `jump-key`

---
