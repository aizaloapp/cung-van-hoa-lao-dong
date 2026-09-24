const fs = require('fs');
const path = require('path');

const courses = [
  'ban-cung',
  'boxing-kids-nguoi-lon',
  'yoga-tri-lieu',
  'cau-long',
  'taekwondo',
  'nhay-hien-dai-thieu-nhi',
  'yoga-an-do',
  'bong-ro',
  'mua-dan-vu',
  'yoga-song-khoe-1',
  'yoga-song-khoe-2',
  'dance-kids-ballet-kids',
  'patin',
  'lan-su-rong',
  'bong-da'
];

async function checkAll() {
  console.log('Auditing all 15 course articles on http://127.0.0.1:8788 ...\n');
  let totalPass = 0;
  for (const slug of courses) {
    const url = 'http://127.0.0.1:8788/lop-hoc/' + slug + '/';
    try {
      const res = await fetch(url);
      const html = await res.text();
      
      const hasCanonical = html.includes('rel="canonical" href="https://cungvanhoalaodong.com/lop-hoc/' + slug + '/"');
      const hasSchemaFAQ = html.includes('FAQPage');
      const hasAccordion = html.includes('<details') && html.includes('<summary');
      const hasZalo = html.includes('zalo.me/');
      const hasTel = html.includes('href="tel:');
      
      const pass = res.status === 200 && hasCanonical && hasSchemaFAQ && hasAccordion && hasZalo && hasTel;
      if (pass) {
        totalPass++;
        console.log(`[PASS] ${slug.padEnd(25)} -> Status 200 | Canonical | Schema FAQ | Accordion UI | Zalo/Tel`);
      } else {
        console.error(`[FAIL] ${slug}`, { status: res.status, hasCanonical, hasSchemaFAQ, hasAccordion, hasZalo, hasTel });
      }
    } catch (e) {
      console.error(`[ERR] ${slug}:`, e.message);
    }
  }
  console.log(`\nTổng kết: ${totalPass}/${courses.length} bài viết đạt chuẩn 100%!`);
}

checkAll();
