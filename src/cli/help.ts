// src/cli/help.ts
export function printHelp(): void {
  console.log(`
  📦 coremcp CLI
  
  Usage:
    coremcp [options]
  
  Options:
    -i, --init      Initialize configuration
    -v, --version   Show CLI version
    -h, --help      Show help info
  
  Examples:
    coremcp --init
    coremcp --version
    coremcp
    `);
}