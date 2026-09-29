#!/usr/bin/env python3
"""
Extract flower images from PDF files in the flowers_pictures_types directory.
Extracts the first page of each PDF as a PNG image.
"""

import os
import sys
import pymupdf  # PyMuPDF
from pathlib import Path


def normalize_flower_name(filename: str) -> str:
    """Extract and normalize flower variety name from PDF filename."""
    # Remove .pdf extension
    name = Path(filename).stem
    
    # Fix "Floer" typo -> "Flower"
    name = name.replace("Floer", "Flower")
    
    # Normalize spaces - replace multiple spaces with single space
    name = " ".join(name.split())
    
    return name


def extract_first_page(pdf_path: str, output_path: str) -> bool:
    """Extract the first page of a PDF as an image."""
    try:
        # Open the PDF
        doc = pymupdf.open(pdf_path)
        
        # Get the first page
        page = doc[0]
        
        # Convert page to image with high resolution
        pix = page.get_pixmap(matrix=pymupdf.Matrix(300/72))  # 300 DPI
        
        # Save as PNG
        pix.save(output_path)
        
        # Close the document
        doc.close()
        
        return True
        
    except Exception as e:
        print(f"  Error extracting image from {pdf_path}: {str(e)}")
        return False


def main():
    # Define paths
    input_dir = Path("d:/hn/flowers_pictures_types")
    output_dir = Path("d:/hn/assets/flowers")
    
    # Create output directory if it doesn't exist
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Get all PDF files
    pdf_files = sorted(input_dir.glob("*.pdf"))
    
    if not pdf_files:
        print(f"No PDF files found in {input_dir}")
        sys.exit(1)
    
    print(f"Found {len(pdf_files)} PDF files to process")
    print("-" * 50)
    
    success_count = 0
    fail_count = 0
    
    for pdf_path in pdf_files:
        # Get normalized flower name from filename
        flower_name = normalize_flower_name(pdf_path.name)
        output_filename = f"{flower_name}.png"
        output_path = output_dir / output_filename
        
        print(f"Processing: {pdf_path.name} -> {output_filename}")
        
        if extract_first_page(str(pdf_path), str(output_path)):
            success_count += 1
        else:
            fail_count += 1
    
    print("-" * 50)
    print(f"Complete: {success_count} images extracted, {fail_count} errors")


if __name__ == "__main__":
    main()
