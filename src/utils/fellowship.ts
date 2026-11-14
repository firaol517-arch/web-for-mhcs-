import { PublicationItem } from '../types/fellowship';

/**
 * Validates Ethiopian and international phone numbers.
 * Supports: 09xxxxxxxx, 07xxxxxxxx, +2519xxxxxxxx, +2517xxxxxxxx
 */
export function isValidPhoneNumber(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-()]/g, '');
  if (!cleaned) return false;
  const localRegex = /^(09|07)\d{8}$/;
  const intlEthRegex = /^\+251(9|7)\d{8}$/;
  const genericIntl = /^\+?[0-9]{9,15}$/;

  return localRegex.test(cleaned) || intlEthRegex.test(cleaned) || genericIntl.test(cleaned);
}

/**
 * Validates standard email address.
 */
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
}

/**
 * Explains Ethiopian Local Time (LT) relative to standard international clock time.
 */
export function formatEthiopianTimeGuide(localTimeHours: number): {
  localTimeString: string;
  standardTimeString: string;
  description: string;
} {
  const standardHour = (localTimeHours + 6) % 12 || 12;
  const isAfternoon = localTimeHours >= 6 && localTimeHours <= 11;
  const period = isAfternoon ? 'PM' : 'AM';

  return {
    localTimeString: `${localTimeHours}:00 LT (Ethiopian Local Time)`,
    standardTimeString: `${standardHour}:00 ${period}`,
    description: `${localTimeHours}:00 Local Ethiopian Time corresponds to ${standardHour}:00 ${period} standard time.`
  };
}

/**
 * Converts a positive integer to Ge'ez numeral representation.
 */
export function numberToGeez(num: number): string {
  if (num <= 0 || num > 9999) return num.toString();

  const ones = ['', '፩', '፪', '፫', '፬', '፭', '፮', '፯', '፰', '፱'];
  const tens = ['', '፲', '፳', '፴', '፵', '፶', '፷', '፸', '፹', '፺'];

  if (num >= 100 && num < 200) {
    const remainder = num - 100;
    const tenDigit = Math.floor(remainder / 10);
    const oneDigit = remainder % 10;
    return '፻' + tens[tenDigit] + ones[oneDigit];
  }

  if (num < 100) {
    const tenDigit = Math.floor(num / 10);
    const oneDigit = num % 10;
    return tens[tenDigit] + ones[oneDigit];
  }

  return num.toString();
}

/**
 * Filter and search publications.
 */
export function filterPublicationsList(
  pubs: PublicationItem[],
  selectedCategory: string,
  searchQuery: string
): PublicationItem[] {
  const query = searchQuery.trim().toLowerCase();
  return pubs.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesQuery = !query || 
      item.title.toLowerCase().includes(query) ||
      (item.amharicTitle && item.amharicTitle.toLowerCase().includes(query)) ||
      item.excerpt.toLowerCase().includes(query) ||
      item.author.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });
}

export function buildDetailHash(kind: 'photo' | 'event' | 'publication' | 'ministry', id: string): string {
  return `#detail/${kind}/${encodeURIComponent(id)}`;
}

export function parseDetailHash(hash: string): { kind: 'photo' | 'event' | 'publication' | 'ministry'; id: string } | null {
  const cleaned = hash.replace(/^#/, '');
  const parts = cleaned.split('/');
  if (parts.length !== 3 || parts[0] !== 'detail') return null;
  const kind = parts[1];
  if (kind !== 'photo' && kind !== 'event' && kind !== 'publication' && kind !== 'ministry') {
    return null;
  }
  const id = decodeURIComponent(parts[2] || '').trim();
  if (!id) return null;
  return { kind, id };
}

