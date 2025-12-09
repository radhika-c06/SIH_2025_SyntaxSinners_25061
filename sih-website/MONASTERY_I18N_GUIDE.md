# Monastery Pages Multilingual Implementation Guide

This guide shows how to add multilingual support to the monastery pages (Rumtek, Tashiding, Tsuk, Dubdi).

## ✅ Completed

1. **Translation structure added to `lib/i18n.ts`** with keys for:
   - Section names (Overview, Digital Archive, Cultural Calendar, Audio Tour, Virtual Tour)
   - Common UI elements (Location Map, Explore, View Details, Close, Download, Play/Pause Audio)

2. **Partial implementation done for**:
   - All 4 monastery pages now import `useTranslation` hook
   - Rumtek page: Section navigation buttons and Location Map title are translated

## 🔄 To Complete

Apply the following pattern to all remaining hardcoded text in each monastery page.

### Pattern 1: Section Navigation Buttons

**FIND (in all 4 monastery pages):**
```tsx
const sidebarItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'digital-archive', label: 'Digital Archive' },
  { id: 'cultural-calendar', label: 'Cultural Calendar' },
  { id: 'audio-tour', label: 'Audio Tour' },
  { id: 'virtual-tour', label: 'Virtual Tour' },
];
```

**REPLACE WITH:**
```tsx
const sidebarItems = [
  { id: 'overview', labelKey: 'overview' },
  { id: 'digital-archive', labelKey: 'digitalArchive' },
  { id: 'cultural-calendar', labelKey: 'culturalCalendar' },
  { id: 'audio-tour', labelKey: 'audioTour' },
  { id: 'virtual-tour', labelKey: 'virtualTour' },
];
```

**THEN UPDATE the rendering:**
```tsx
// OLD:
{item.label}

// NEW:
{t(`monasteryPage.sections.${item.labelKey}`)}
```

### Pattern 2: Common UI Elements

Replace these hardcoded strings throughout each file:

| Hardcoded Text | Translation Key |
|---------------|-----------------|
| `"Location Map"` | `t('monasteryPage.common.locationMap')` |
| `"Explore"` | `t('monasteryPage.common.explore')` |
| `"View Details"` | `t('monasteryPage.common.viewDetails')` |
| `"Close"` | `t('monasteryPage.common.close')` |
| `"Download"` | `t('monasteryPage.common.download')` |
| `"Play Audio"` or similar | `t('monasteryPage.common.playAudio')` |
| `"Pause Audio"` or similar | `t('monasteryPage.common.pauseAudio')` |

### Example: Updating Section Headers

**FIND:**
```tsx
<h2 className="...">
  DIGITAL ARCHIVE
</h2>
```

**REPLACE WITH:**
```tsx
<h2 className="...">
  {t('monasteryPage.sections.digitalArchive').toUpperCase()}
</h2>
```

## 📋 Files to Update

Apply the patterns above to:
- ✅ `app/rumtek/page.tsx` (partially done)
- 🔄 `app/tashiding/page.tsx` (hook added, needs content updates)
- 🔄 `app/tsuk/page.tsx` (hook added, needs content updates)
- 🔄 `app/dubdi/page.tsx` (hook added, needs content updates)

## 🌍 Available Translations

The following translations are already available in `lib/i18n.ts`:

### English (en)
- Overview, Digital Archive, Cultural Calendar, Audio Tour, Virtual Tour
- Location Map, Explore, View Details, Close, Download, Play Audio, Pause Audio

### Hindi (hi)
- सारांश, डिजिटल अभिलेखागार, सांस्कृतिक कैलेंडर, ऑडियो टूर, वर्चुअल टूर
- स्थान मानचित्र, अन्वेषण करें, विवरण देखें, बंद करें, डाउनलोड, ऑडियो चलाएं, ऑडियो रोकें

### Nepali (ne)
- अवलोकन, डिजिटल अभिलेख, सांस्कृतिक पात्रो, अडियो टूर, भर्चुअल टूर
- स्थान नक्सा, अन्वेषण गर्नुहोस्, विवरण हेर्नुहोस्, बन्द गर्नुहोस्, डाउनलोड, अडियो चलाउनुहोस्, अडियो रोक्नुहोस्

## 🚀 Next Steps

1. Search for hardcoded English text in each monastery page
2. Add the appropriate translation key from the available translations
3. For monastery-specific content (descriptions, historical text), add new translation keys to `i18n.ts` following the existing structure
4. Test language switching to ensure all text updates correctly

## 💡 Tips

- Use VS Code's Find and Replace (Ctrl+H) to batch update similar patterns
- Search for common patterns like `className="..." style={{...}}>Hardcoded Text</`
- Test each monastery page after updates to ensure no visual regression
- Keep the same styling and structure, only replace text content with translation keys
