/**
 * Normalizes a string for comparison by:
 * - Converting to lowercase
 * - Removing extra whitespace
 * - Trimming edges
 */
const normalizeString = (str) => {
  if (!str || typeof str !== "string") return "";
  return str.toLowerCase().trim().replace(/\s+/g, " ");
};

/**
 * Calculates the Levenshtein distance between two strings
 * Optimized with early exit for exact matches
 * @param {string} a - First string
 * @param {string} b - Second string
 * @returns {number} - Levenshtein distance (0 = identical, higher = more different)
 */
export const levenshteinDistance = (a, b) => {
  // Normalize inputs
  const str1 = normalizeString(a);
  const str2 = normalizeString(b);

  // Handle edge cases
  if (str1 === str2) return 0; // Early exit for exact matches
  if (str1.length === 0) return str2.length;
  if (str2.length === 0) return str1.length;

  // Use optimized algorithm with space-efficient approach
  // For better performance with longer strings, swap if needed
  let s1 = str1;
  let s2 = str2;
  if (str1.length > str2.length) {
    s1 = str2;
    s2 = str1;
  }

  const len1 = s1.length;
  const len2 = s2.length;

  // Create matrix (only need previous row, not full matrix for optimization)
  let prevRow = Array.from({ length: len2 + 1 }, (_, i) => i);
  let currRow = new Array(len2 + 1);

  for (let i = 1; i <= len1; i++) {
    currRow[0] = i;
    for (let j = 1; j <= len2; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      currRow[j] = Math.min(
        prevRow[j] + 1, // deletion
        currRow[j - 1] + 1, // insertion
        prevRow[j - 1] + cost // substitution
      );
    }
    [prevRow, currRow] = [currRow, prevRow]; // Swap rows
  }

  return prevRow[len2];
};

/**
 * Internal function to calculate Levenshtein distance without normalization
 * (assumes inputs are already normalized)
 */
const levenshteinDistanceInternal = (s1, s2) => {
  if (s1 === s2) return 0;
  if (s1.length === 0) return s2.length;
  if (s2.length === 0) return s1.length;

  let str1 = s1;
  let str2 = s2;
  if (s1.length > s2.length) {
    str1 = s2;
    str2 = s1;
  }

  const len1 = str1.length;
  const len2 = str2.length;

  let prevRow = Array.from({ length: len2 + 1 }, (_, i) => i);
  let currRow = new Array(len2 + 1);

  for (let i = 1; i <= len1; i++) {
    currRow[0] = i;
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      currRow[j] = Math.min(
        prevRow[j] + 1,
        currRow[j - 1] + 1,
        prevRow[j - 1] + cost
      );
    }
    [prevRow, currRow] = [currRow, prevRow];
  }

  return prevRow[len2];
};

/**
 * Calculates similarity percentage between two strings
 * @param {string} a - First string
 * @param {string} b - Second string
 * @returns {number} - Similarity percentage (0-100, 100 = identical)
 */
export const calculateSimilarity = (a, b) => {
  const normalizedA = normalizeString(a);
  const normalizedB = normalizeString(b);

  if (normalizedA === normalizedB) return 100;
  if (normalizedA.length === 0 || normalizedB.length === 0) return 0;

  const maxLen = Math.max(normalizedA.length, normalizedB.length);
  const distance = levenshteinDistanceInternal(normalizedA, normalizedB);

  // Calculate similarity as percentage
  return Math.round(((maxLen - distance) / maxLen) * 100);
};

/**
 * Checks if a string matches a query using fuzzy matching
 * @param {string} text - Text to search in
 * @param {string} query - Search query
 * @param {number} minSimilarity - Minimum similarity percentage (0-100), default 50
 * @returns {boolean} - True if match is found
 */
export const fuzzyMatch = (text, query, minSimilarity = 50) => {
  const normalizedText = normalizeString(text);
  const normalizedQuery = normalizeString(query);

  // Early exit for empty query
  if (!normalizedQuery) return true;

  // 1. Exact substring match (fastest - e.g., "shirt" contains "shirt")
  if (normalizedText.includes(normalizedQuery)) return true;

  // 2. Check if query is substring of any word in text (e.g., "shirt" contains "shir")
  // Also check if any word starts with the query (e.g., "shirt" starts with "shrt" - fuzzy prefix match)
  const words = normalizedText.split(/\s+/);
  for (const word of words) {
    if (word.includes(normalizedQuery)) return true;
    // Check if word starts with query (for prefix matching like "shrt" -> "shirt")
    if (word.startsWith(normalizedQuery) && normalizedQuery.length >= 3)
      return true;
    // Check if query starts with word (for cases like "shirt" -> "sh")
    if (normalizedQuery.startsWith(word) && word.length >= 3) return true;
  }

  // 3. Fuzzy match each word individually (handles typos like "shrt" -> "shirt")
  for (const word of words) {
    if (word.length < 3) continue; // Skip very short words

    // Calculate distance-based similarity for each word
    const wordDistance = levenshteinDistanceInternal(normalizedQuery, word);
    const maxLen = Math.max(normalizedQuery.length, word.length);

    // For typos, be more lenient:
    // - Allow up to 2 character differences for words >= 4 chars
    // - Allow 1 character difference for words 3-4 chars
    // Lower threshold for better typo tolerance
    const maxAllowedDistance = word.length >= 4 ? 2 : 1;

    if (wordDistance <= maxAllowedDistance) {
      // Calculate similarity - lower threshold to 50% for better typo tolerance
      const wordSimilarity = Math.round(
        ((maxLen - wordDistance) / maxLen) * 100
      );
      // Lower threshold from 60% to 50% to catch more typos
      if (wordSimilarity >= 50) return true;
    }

    // Also check if the query is very close to the word (distance of 1-2)
    // This catches cases like "shrt" -> "shirt" even if lengths differ slightly
    if (wordDistance <= 2 && normalizedQuery.length >= 3) {
      const wordSimilarity = Math.round(
        ((maxLen - wordDistance) / maxLen) * 100
      );
      // For very close matches (distance 1-2), use even lower threshold
      if (wordSimilarity >= 45) return true;
    }
  }

  // 4. Overall fuzzy match with relaxed threshold
  // Use a more lenient threshold - 50% for overall match
  // This helps when query is similar to the entire product name
  const overallSimilarity = calculateSimilarity(
    normalizedText,
    normalizedQuery
  );
  const relaxedThreshold = normalizedQuery.length <= 4 ? 55 : minSimilarity;

  return overallSimilarity >= relaxedThreshold;
};
