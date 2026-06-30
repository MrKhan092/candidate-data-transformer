from app.parsers.pdf_parser import PDFParser

parser = PDFParser()

text = parser.extract_text(
    "inputs/resumes/f1.pdf"
)

print(text)