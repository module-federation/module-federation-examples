#!/bin/bash

# Directory containing the original PNG images
input_directory="./full"
# Array of target widths
declare -a sizes=(200 400 800)

# Iterate through each file in the input directory
for file in "$input_directory"/*.png; do
    # Extract filename without extension
    filename=$(basename -- "$file")
    filename="${filename%.*}"

    # Iterate through each size
    for size in "${sizes[@]}"; do
        # Create output directory if it doesn't exist
        output_directory="./$size"
        mkdir -p "$output_directory"

        # Define output filename
        output_file="$output_directory/${filename}.webp"

        # Convert and resize the image
        convert "$file" -resize "${size}x${size}" - | cwebp -m 6 -q 80 -o "$output_file" -- -
    done
done

echo "Conversion completed."
