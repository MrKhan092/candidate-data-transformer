#!/usr/bin/env python
"""
Multi-Source Candidate Data Transformer Entrypoint
"""
import sys

def main():
    try:
        from app.cli.main import app
        app()
    except ImportError as e:
        print(f"Error: Could not import app modules. Please make sure the app directory is in your PYTHONPATH. {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
