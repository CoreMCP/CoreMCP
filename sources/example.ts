/**
 * Sanitize a string to remove or escape potential prompt injection patterns
 * 
 * @param input The input string to sanitize
 * @param options Sanitization options
 * @returns A sanitized, safe string
 */
function sanitizeString(
  input: string, 
  options: {
    maxLength?: number,         // Maximum allowed length
    strictMode?: boolean,       // Strict mode (more aggressive filtering)
    allowMarkdown?: boolean,    // Whether to allow markdown syntax
    escapeQuotes?: boolean      // Whether to escape quotes instead of removing them
  } = {}
): string {
  // Set default values
  const {
    maxLength = 500,
    strictMode = true,
    allowMarkdown = false,
    escapeQuotes = true
  } = options;
  
  if (!input || typeof input !== 'string') {
    return '';
  }
  
  let sanitized = input;
  
  // 1. Remove potential code blocks and formatted text
  if (!allowMarkdown) {
    // Remove code blocks
    sanitized = sanitized.replace(/```[\s\S]*?```/g, "[code block removed]");
    // Remove inline code
    sanitized = sanitized.replace(/`[^`]*`/g, "[code removed]");
  }
  
  // 2. Handle closing symbols and potential command patterns

  // Remove HTML/XML tags
  sanitized = sanitized.replace(/<[^>]*>/g, "");

  // Remove various bracketed content
  sanitized = sanitized.replace(/\{[\s\S]*?\}/g, "[content filtered]"); // Curly braces
  sanitized = sanitized.replace(/$begin:math:display$[\\s\\S]*?$end:math:display$/g, "[content filtered]"); // Square brackets
  sanitized = sanitized.replace(/$begin:math:text$[\\s\\S]*?$end:math:text$/g, "[content filtered]"); // Parentheses

  // 3. Handle potential prompt injection keywords
  const aiKeywords = [
    "system", "user", "assistant", "model", "prompt", "instruction", 
    "context", "token", "function", "completion", "response", "davinci", 
    "claude", "gpt", "llm", "api", "openai", "anthropic"
  ];
  
  const keywordPattern = new RegExp(`\\b(${aiKeywords.join('|')})\\b`, 'gi');
  sanitized = sanitized.replace(keywordPattern, (match) => `_${match}_`);
  
  // 4. Handle quotes (escape or remove)
  if (escapeQuotes) {
    // Escape quotes
    sanitized = sanitized.replace(/"/g, '\\"').replace(/'/g, "\\'");
  } else {
    // Remove quotes
    sanitized = sanitized.replace(/["']/g, "");
  }
  
  // 5. Extra handling for strict mode
  if (strictMode) {
    // Remove control characters and special symbols
    sanitized = sanitized.replace(/[\u0000-\u001F\u007F-\u009F\u2000-\u200F\u2028-\u202F]/g, "");
    
    // Replace common injection-related patterns
    sanitized = sanitized.replace(/\.\.\./g, "…"); // Ellipsis
    sanitized = sanitized.replace(/\-\-\-+/g, "—"); // Em dash
    sanitized = sanitized.replace(/={2,}/g, "==");  // Equal signs
    
    // Remove URLs or link-like patterns
    sanitized = sanitized.replace(/(https?:\/\/[^\s]+)/g, "[link removed]");
  }
  
  // 6. Handle potential JSON syntax indicators
  sanitized = sanitized
    .replace(/(\s*"\w+"\s*:)/g, "【property】:")  // JSON property names
    .replace(/($begin:math:display$\\s*$end:math:display$|\{\s*\})/g, "【empty】"); // Empty arrays or objects
  
  // 7. Trim to max length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength) + "...";
  }
  
  return sanitized;
}

/**
 * Recursively sanitize all string values in an object
 * 
 * @param data The input data object to sanitize
 * @param options Options to pass into sanitizeString
 * @param maxDepth Maximum depth for recursion
 * @param currentDepth Current depth during recursion
 * @returns Sanitized data object
 */
function sanitizeData(
  data: any,
  options = {},
  maxDepth = 5,
  currentDepth = 0
): any {
  // Enforce recursion depth limit
  if (currentDepth >= maxDepth) {
    return typeof data === 'object' && data !== null 
      ? "[nested object simplified]" 
      : data;
  }
  
  // Return primitive types as-is
  if (data === null || data === undefined) {
    return data;
  }
  
  // Sanitize strings
  if (typeof data === 'string') {
    return sanitizeString(data, options);
  }
  
  // Return numbers and booleans as-is
  if (typeof data === 'number' || typeof data === 'boolean') {
    return data;
  }
  
  // Sanitize arrays
  if (Array.isArray(data)) {
    return data.map(item => sanitizeData(item, options, maxDepth, currentDepth + 1));
  }
  
  // Sanitize objects
  if (typeof data === 'object') {
    const result: Record<string, any> = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        // Clean up the property key
        const safeKey = key.replace(/[<>{}$begin:math:display$$end:math:display$]/g, "");
        result[safeKey] = sanitizeData(data[key], options, maxDepth, currentDepth + 1);
      }
    }
    return result;
  }
  
  // Fallback for unknown types
  return String(data);
}

// Example usage:
// Sanitize API response before returning it
function safeApiResponse(apiData: any): any {
  const sanitizedData = sanitizeData(apiData, {
    strictMode: true,
    maxLength: 200,
    allowMarkdown: false
  });
  
  return sanitizedData;
}
