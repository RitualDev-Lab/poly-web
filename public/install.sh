#!/bin/sh
# ⚡ Poly Universal Installer for Linux & macOS
# Hosted at https://poly.ritualdev.in/install.sh
# Usage: curl -fsSL https://poly.ritualdev.in/install.sh | sh

set -e

# Color definitions
BOLD="$(tput bold 2>/dev/null || printf '')"
GREEN="$(tput setaf 2 2>/dev/null || printf '')"
BLUE="$(tput setaf 4 2>/dev/null || printf '')"
YELLOW="$(tput setaf 3 2>/dev/null || printf '')"
RED="$(tput setaf 1 2>/dev/null || printf '')"
RESET="$(tput sgr0 2>/dev/null || printf '')"

banner() {
  printf "%s\n" "${BLUE}${BOLD}"
  printf "   ___       __      \n"
  printf "  / _ \___  / /_ __  \n"
  printf " / ___/ _ \/ / // /  \n"
  printf "/_/   \___/_/\_, /   \n"
  printf "            /___/    \n"
  printf "%s\n" "${RESET}"
  printf "%s⚡ The Universal Polyglot CLI Package & Dependency Orchestrator%s\n\n" "${BOLD}" "${RESET}"
}

banner

# Detect Operating System
OS="$(uname -s | tr '[:upper:]' '[:lower:]')"
case "$OS" in
  linux*)
    OS="linux"
    ;;
  darwin*)
    OS="darwin"
    ;;
  msys*|mingw*|cygwin*)
    printf "%s==> Windows environment detected.%s\n" "${YELLOW}" "${RESET}"
    printf "Please use the official PowerShell installer instead:\n\n"
    printf "   %sirm https://poly.ritualdev.in/install.ps1 | iex%s\n\n" "${GREEN}${BOLD}" "${RESET}"
    exit 0
    ;;
  *)
    printf "%sError: Unsupported operating system '%s'.%s\n" "${RED}" "$OS" "${RESET}"
    printf "Poly standalone binaries are available for Linux, macOS, and Windows.\n"
    exit 1
    ;;
esac

# Detect Architecture
ARCH="$(uname -m)"
case "$ARCH" in
  x86_64|amd64)
    ARCH="x64"
    ;;
  arm64|aarch64)
    ARCH="arm64"
    ;;
  *)
    printf "%sError: Unsupported architecture '%s'.%s\n" "${RED}" "$ARCH" "${RESET}"
    printf "Poly standalone binaries currently support x86_64 (x64) and ARM64.\n"
    exit 1
    ;;
esac

printf "%s==> Detected Platform:%s %s-%s\n" "${BLUE}" "${RESET}" "$OS" "$ARCH"

# Determine Latest Release Version
LATEST_TAG=""
if command -v curl >/dev/null 2>&1; then
  LATEST_TAG="$(curl -fsSL https://api.github.com/repos/RitualDev-Lab/poly/releases/latest 2>/dev/null | grep '"tag_name":' | head -n 1 | cut -d '"' -f 4 || true)"
elif command -v wget >/dev/null 2>&1; then
  LATEST_TAG="$(wget -qO- https://api.github.com/repos/RitualDev-Lab/poly/releases/latest 2>/dev/null | grep '"tag_name":' | head -n 1 | cut -d '"' -f 4 || true)"
fi

if [ -z "$LATEST_TAG" ]; then
  LATEST_TAG="v0.5.1"
fi

printf "%s==> Resolving Release:%s %s\n" "${BLUE}" "${RESET}" "$LATEST_TAG"

ASSET_NAME="poly-${OS}-${ARCH}.tar.gz"
DOWNLOAD_URL="https://github.com/RitualDev-Lab/poly/releases/download/${LATEST_TAG}/${ASSET_NAME}"
CHECKSUMS_URL="https://github.com/RitualDev-Lab/poly/releases/download/${LATEST_TAG}/checksums.txt"

# Create Temporary Directory
TMP_DIR="$(mktemp -d 2>/dev/null || mktemp -d -t 'poly-install')"
cleanup() {
  rm -rf "$TMP_DIR"
}
trap cleanup EXIT INT TERM

printf "%s==> Downloading %s...%s\n" "${BLUE}" "$ASSET_NAME" "${RESET}"
if command -v curl >/dev/null 2>&1; then
  curl -fsSL "$DOWNLOAD_URL" -o "${TMP_DIR}/${ASSET_NAME}"
  curl -fsSL "$CHECKSUMS_URL" -o "${TMP_DIR}/checksums.txt" 2>/dev/null || true
elif command -v wget >/dev/null 2>&1; then
  wget -qO "${TMP_DIR}/${ASSET_NAME}" "$DOWNLOAD_URL"
  wget -qO "${TMP_DIR}/checksums.txt" "$CHECKSUMS_URL" 2>/dev/null || true
else
  printf "%sError: Neither 'curl' nor 'wget' was found on your system.%s\n" "${RED}" "${RESET}"
  exit 1
fi

# Checksum Verification
if [ -f "${TMP_DIR}/checksums.txt" ]; then
  printf "%s==> Verifying SHA-256 integrity...%s\n" "${BLUE}" "${RESET}"
  EXPECTED_HASH="$(grep "${ASSET_NAME}" "${TMP_DIR}/checksums.txt" | awk '{print $1}' || true)"
  if [ -n "$EXPECTED_HASH" ]; then
    if command -v sha256sum >/dev/null 2>&1; then
      ACTUAL_HASH="$(sha256sum "${TMP_DIR}/${ASSET_NAME}" | awk '{print $1}')"
    elif command -v shasum >/dev/null 2>&1; then
      ACTUAL_HASH="$(shasum -a 256 "${TMP_DIR}/${ASSET_NAME}" | awk '{print $1}')"
    else
      ACTUAL_HASH=""
    fi

    if [ -n "$ACTUAL_HASH" ]; then
      if [ "$EXPECTED_HASH" != "$ACTUAL_HASH" ]; then
        printf "%sError: Checksum verification failed!%s\n" "${RED}" "${RESET}"
        printf "Expected: %s\nActual:   %s\n" "$EXPECTED_HASH" "$ACTUAL_HASH"
        exit 1
      fi
      printf "%s✔ Checksum verified successfully.%s\n" "${GREEN}" "${RESET}"
    fi
  fi
fi

# Determine Destination Directory
DEST_DIR="/usr/local/bin"
USE_SUDO=""

if [ ! -w "$DEST_DIR" ]; then
  if [ "$(id -u)" -eq 0 ]; then
    USE_SUDO=""
  elif command -v sudo >/dev/null 2>&1 && [ -t 0 ]; then
    USE_SUDO="sudo"
  else
    DEST_DIR="$HOME/.local/bin"
    mkdir -p "$DEST_DIR"
  fi
fi

printf "%s==> Installing poly into %s...%s\n" "${BLUE}" "$DEST_DIR" "${RESET}"
tar -xzf "${TMP_DIR}/${ASSET_NAME}" -C "${TMP_DIR}"
chmod +x "${TMP_DIR}/poly"

if [ -n "$USE_SUDO" ]; then
  $USE_SUDO mv "${TMP_DIR}/poly" "${DEST_DIR}/poly"
else
  mv "${TMP_DIR}/poly" "${DEST_DIR}/poly"
fi

printf "\n%s✔ Successfully installed poly (%s)!%s\n\n" "${GREEN}${BOLD}" "$LATEST_TAG" "${RESET}"

# Verify PATH
case ":$PATH:" in
  *":$DEST_DIR:"*) ;;
  *)
    printf "%sNotice: %s is not in your \$PATH.%s\n" "${YELLOW}" "$DEST_DIR" "${RESET}"
    printf "Add the following line to your ~/.bashrc, ~/.zshrc, or profile:\n\n"
    printf "   %sexport PATH=\"%s:\$PATH\"%s\n\n" "${BOLD}" "$DEST_DIR" "${RESET}"
    ;;
esac

# Test execution
if command -v poly >/dev/null 2>&1; then
  poly --version || true
elif [ -x "${DEST_DIR}/poly" ]; then
  "${DEST_DIR}/poly" --version || true
fi

printf "\n%s🚀 Get started:%s\n" "${BOLD}" "${RESET}"
printf "   poly doctor           Diagnose toolchains & compilers\n"
printf "   poly add npm:zod      Add polyglot dependencies\n"
printf "   poly --help           Explore full command suite\n\n"
printf "Documentation: %shttps://poly.ritualdev.in%s\n" "${BLUE}" "${RESET}"
