# Claude Notes

Notes for future Claude sessions working on this project.

## Code Quality Requirements

**IMPORTANT**: This project enforces strict code quality standards.

### Before Committing

```bash
ruff check .           # Lint
ruff check . --fix     # Auto-fix
ruff format .          # Format
mypy app run.py        # Type check
```

### Code Style

- Type hints for all function parameters and return types
- Docblocks for all functions
- Automated tests written for all code
- Avoid deorecated APIs

## Project Structure

```
stretchfoldrepeat/
├── ios/				 # iosApplication
│   ├── database.py      # SQLite operations
├── docs/
│   ├── DATA_MODEL.md    # Source of truth for system design
│   ├── PROJECT_PLAN.md  # Implementation phases
│   └── BANK_IMPORT_PLAN.md
├── receipts/            # Receipt images
├── static/              # CSS, JS
└── run.py               # Entry point
```

## Environment Variables

- `GEMINI_API_KEY` - Required for receipt processing
- `USDA_API_KEY` - Optional for USDA FoodData Central lookups

## Running

```bash
python run.py                      # Start web interface
python run.py --process receipt.jpg    # Process single receipt
python run.py --process-dir ./receipts # Process directory
```

See `docs/DATA_MODEL.md` for schema details.
