import test from 'node:test';
import assert from 'node:assert/strict';
import { 
  isValidPhoneNumber, 
  isValidEmail, 
  formatEthiopianTimeGuide, 
  numberToGeez, 
  filterPublicationsList,
  buildDetailHash,
  parseDetailHash
} from './fellowship';
import { PublicationItem } from '../types/fellowship';

test('phone number validator supports Ethiopian local and international formats', () => {
  assert.equal(isValidPhoneNumber('0911223344'), true);
  assert.equal(isValidPhoneNumber('0712345678'), true);
  assert.equal(isValidPhoneNumber('+251911223344'), true);
  assert.equal(isValidPhoneNumber('0911 22 33 44'), true);
  assert.equal(isValidPhoneNumber('123'), false);
  assert.equal(isValidPhoneNumber(''), false);
});

test('email validator verifies standard formats', () => {
  assert.equal(isValidEmail('student@gmail.com'), true);
  assert.equal(isValidEmail('info@mcsffellow.org'), true);
  assert.equal(isValidEmail('invalid-email'), false);
  assert.equal(isValidEmail(''), false);
});

test('Ethiopian time guide correctly translates 8:00 LT to 2:00 PM', () => {
  const result = formatEthiopianTimeGuide(8);
  assert.equal(result.localTimeString.includes('8:00 LT'), true);
  assert.equal(result.standardTimeString.includes('2:00 PM'), true);
});

test('Ge\'ez numeral converter correctly represents 150 as ፻፶', () => {
  assert.equal(numberToGeez(150), '፻፶');
  assert.equal(numberToGeez(25), '፳፭');
});

test('publication filtering filters by category and search query', () => {
  const samplePubs: PublicationItem[] = [
    {
      id: '1',
      slug: 'christ-in-icu',
      category: 'Medical Ethics',
      title: 'Christ in the Adult ICU',
      amharicTitle: 'በአይሲዩ ክፍል ውስጥ ክርስቶስን ማየት',
      excerpt: 'Reflections on critical care',
      author: 'Dr. Yared',
      authorRole: 'Clinical Medicine',
      date: '2026-10-10',
      readTime: '4 min',
      likes: 12,
      content: ['Text']
    },
    {
      id: '2',
      slug: 'the-stethoscopes-calling',
      category: 'Poem',
      title: 'The Stethoscope and the Cross',
      amharicTitle: 'ስቴተስኮፑና መስቀሉ',
      excerpt: 'A poetic reflection',
      author: 'Ruth B.',
      authorRole: 'Pharmacy',
      date: '2026-10-12',
      readTime: '3 min',
      likes: 8,
      content: ['Poem text']
    }
  ];

  const poems = filterPublicationsList(samplePubs, 'Poem', '');
  assert.equal(poems.length, 1);
  assert.equal(poems[0].id, '2');

  const searched = filterPublicationsList(samplePubs, 'all', 'Stethoscope');
  assert.equal(searched.length, 1);
  assert.equal(searched[0].id, '2');
});

test('Telegram link builders generate prefilled deep links for registration, family circle, and prayer desk', async () => {
  const {
    TELEGRAM_REGISTRATION_BOT,
    buildTelegramRegistrationLink,
    buildFamilyRequestLink,
    buildPrayerMessageLink,
  } = await import('../data/fellowshipData.js');

  assert.equal(TELEGRAM_REGISTRATION_BOT, 'https://t.me/McsfFellowshipBot');

  const regLink = buildTelegramRegistrationLink({
    fullName: 'Ruth Bekele',
    department: 'Pharmacy',
    academicYear: 'Year 2',
    teams: ['Prayer & Intercession'],
    phone: '0911223344',
    email: 'ruth@gmail.com',
    notes: 'Acoustic guitar',
  });
  assert.equal(regLink.startsWith('https://t.me/Gedion98?text='), true);
  assert.equal(regLink.includes(encodeURIComponent('Ruth Bekele')), true);
  assert.equal(regLink.includes(encodeURIComponent('Pharmacy')), true);
  assert.equal(regLink.includes(encodeURIComponent('Acoustic guitar')), true);

  const famLink = buildFamilyRequestLink({
    fullName: 'Martha Haile',
    department: 'Nursing & Adult ICU',
    academicYear: 'Year 3 (Clerkship)',
    phone: '0944556677',
    email: 'martha@gmail.com',
    dutyShiftNotes: 'Tuesday evenings',
  });
  assert.equal(famLink.startsWith('https://t.me/Gedion98?text='), true);
  assert.equal(famLink.includes(encodeURIComponent('Martha Haile')), true);
  assert.equal(famLink.includes(encodeURIComponent('Tuesday evenings')), true);

  const prayerLink = buildPrayerMessageLink({
    type: 'prayer-request',
    message: 'Please pray for ICU patients',
    name: 'Selam',
  });
  assert.equal(prayerLink.startsWith('https://t.me/Bemnet1961?text='), true);
  assert.equal(prayerLink.includes(encodeURIComponent('Please pray for ICU patients')), true);
});

test('detail hash helpers round-trip detail routes and reject malformed hashes', () => {
  const h = buildDetailHash('photo', 'hero-group');
  assert.equal(h, '#detail/photo/hero-group');
  assert.deepEqual(parseDetailHash(h), { kind: 'photo', id: 'hero-group' });
  assert.equal(parseDetailHash('#gallery'), null);
  assert.equal(parseDetailHash('#detail/unknown/123'), null);
});
