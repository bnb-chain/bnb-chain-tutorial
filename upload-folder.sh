#!/bin/bash

print_usage() {
  echo "Usage: $0 [OPTIONS] FOLDER_PATH BUCKET_NAME GNFD_CMD_FILEPATH"
  echo ""
  echo "Upload files from a folder to a bucket using gnfd-cmd."
  echo ""
  echo "Positional Arguments:"
  echo "  FOLDER_PATH          Path to the folder containing files to upload"
  echo "  BUCKET_NAME          Name of the bucket to upload files to"
  echo "  GNFD_CMD_FILEPATH    Path to the gnfd-cmd executable"
  echo ""
  echo "Options:"
  echo "  -h, --help           Show this help message and exit"
  echo "  -v, --verbose        Enable verbose mode, echoing execution of each file and progress"
}

if [[ "$1" == "-h" || "$1" == "--help" ]]; then
  print_usage
  exit 0
fi

verbose=false

while [[ $# -gt 0 ]]; do
  key="$1"

  case $key in
    -v|--verbose)
      verbose=true
      shift
      ;;
    *)
      break
      ;;
  esac
done

if [ "$#" -ne 3 ]; then
  echo "Error: Invalid number of arguments."
  echo ""
  print_usage
  exit 1
fi

FOLDER_PATH="$1"
BUCKET_NAME="$2"
GNFD_CMD_FILEPATH="$3"

# Function to get the content type based on file extension
get_content_type() {
  case "$1" in
    *.html)
      echo "text/html"
      ;;
    *.css)
      echo "text/css"
      ;;
    *.js)
      echo "application/javascript"
      ;;
    *.jpg|*.jpeg)
      echo "image/jpeg"
      ;;
    *.png)
      echo "image/png"
      ;;
    # Add more file extensions and their corresponding content types if needed
    *)
      echo "application/octet-stream"
      ;;
  esac
}

# Function to calculate the total number of files
count_files() {
  local folder="$1"
  local count=0

  # Iterate over files in the current folder
  for file in "$folder"/*; do
    if [ -f "$file" ]; then
      count=$((count + 1))
    elif [ -d "$file" ]; then
      # Recursively count files in subfolders
      count_subfolder=$(count_files "$file")
      count=$((count + count_subfolder))
    fi
  done

  echo "$count"
}

# Function to process files recursively
process_files() {
  local folder="$1"
  local count="$2"
  local processed=0

  # Iterate over files in the current folder
  for file in "$folder"/*; do
    if [ -f "$file" ]; then
      filename=$(basename "$file")
      content_type=$(get_content_type "$filename")
      full_file_path=$(realpath "$file")
      gnfd_cmd="$GNFD_CMD_FILEPATH object put --visibility=public-read --contentType=$content_type $full_file_path gnfd://$BUCKET_NAME/$filename"

      if [ "$verbose" = true ]; then
        echo "Executing command: $gnfd_cmd"
      fi

      # Uncomment the line below to execute the command
      eval "$gnfd_cmd"

      processed=$((processed + 1))
      if [ "$verbose" = true ]; then
        progress=$((processed * 100 / count))
        echo "Progress: $progress% ($processed/$count)"
      fi
    elif [ -d "$file" ]; then
      # Recursively process subfolders
      process_files "$file" "$count"
    fi
  done
}

# Start processing files
if [ "$verbose" = true ]; then
  echo "Verbose mode enabled."
  total_files=$(count_files "$FOLDER_PATH")
  echo "Total files to process: $total_files"
fi

process_files "$FOLDER_PATH" "$total_files"

