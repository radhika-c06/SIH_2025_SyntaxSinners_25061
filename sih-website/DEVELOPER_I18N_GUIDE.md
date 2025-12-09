# 6-Language Support - Quick Developer Reference

## Language Codes and Usage

```typescript
// Available language codes
const LANGUAGES = {
  en: 'English',
  hi: 'हिन्दी',
  ne: 'नेपाली',
  bo: 'བོད་ཡིག', // Tibetan
  lep: 'Lepcha',
  lim: 'लिम्बु'  // Limbu
};
```

## Component Usage

### In any React component:

```tsx
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/components/LanguageProvider';

export default function MyComponent() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  return (
    <div>
      <p>{t('nav.home')}</p> {/* Renders "Home" or equivalent */}
      
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        {/* Language selector */}
      </select>
    </div>
  );
}
```

## Translation Key Structure

```
t('section.subsection.key')

Examples:
- t('brand.name')                    → "Sangha"
- t('nav.language')                  → "Language" or equivalent
- t('hero.tagline')                  → "Preserving sacred stories forever."
- t('monasteryPage.sections.overview') → "Overview" or equivalent
- t('monasteryPage.common.locationMap') → "Location Map" or equivalent
- t('map.monasteries.tashiding.name')   → "Tashiding Monastery" or equivalent
```

## File Locations

| File | Purpose |
|------|---------|
| `lib/i18n.ts` | Main i18n configuration with all 6 languages |
| `components/LanguageProvider.tsx` | Context provider for language state |
| `components/LanguageSwitcher.tsx` | UI component for language selection |

## Adding New Translations

### Step 1: Add key to all 6 language sections in `lib/i18n.ts`

```typescript
const resources = {
  en: {
    translation: {
      newSection: {
        newKey: "New content in English"
      }
    }
  },
  hi: {
    translation: {
      newSection: {
        newKey: "नई सामग्री हिंदी में"
      }
    }
  },
  // ... repeat for ne, bo, lep, lim
}
```

### Step 2: Use in component

```tsx
{t('newSection.newKey')}
```

## Currently Translated Sections

- ✅ Brand
- ✅ Introduction/Landing
- ✅ Navigation
- ✅ Hero section
- ✅ Footer
- ✅ Slideshow/Monastery cards
- ✅ Map and monastery details
- ✅ Monastery page sections (all 4 monasteries)

## Language Detection

The system automatically detects:
1. **Stored preference** (localStorage) - if user has selected before
2. **Browser language** - if first visit and browser language matches
3. **Fallback** - English if no match found

```typescript
// From LanguageProvider.tsx
function resolveInitialLanguage(): SupportedLanguage {
  if (typeof window !== "undefined") {
    const stored = window.localStorage.getItem("language");
    if (stored && supportedLanguages.some((entry) => entry.code === stored)) {
      return stored;
    }

    const browserCode = window.navigator.language?.slice(0, 2).toLowerCase();
    const browserMatch = supportedLanguages.find((entry) => entry.code === browserCode);
    if (browserMatch) return browserMatch.code;
  }
  return "en";
}
```

## Unicode Support

All languages use proper Unicode:
- **Tibetan**: U+0F00–U+0FFF (Tibetan block)
- **Devanagari**: U+0900–U+097F (for Hindi, Nepali, Limbu)
- **Lepcha**: Uses Latin alphabet (ASCII compatible)

## Browser Compatibility

- ✅ All modern browsers
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Testing Translation Keys

To verify a translation key exists in all languages:

```bash
# Check if key is missing in any language
grep -r "key_name" lib/i18n.ts
```

## Performance Notes

- Translations are loaded at build time
- No runtime API calls
- Minimal bundle impact (~5KB gzipped for all 6 languages)
- Language switching is instant (no page reload needed)

## Common Gotchas

1. **Make sure to use `t()` function** - Don't just hardcode strings
2. **Always add translations to ALL 6 languages** - Even if you only add English, add placeholder translations for others
3. **Use template literals** - For interpolation: `t('key', { variable: value })`
4. **Check character encoding** - UTF-8 required for proper display

## Example: Complete Translation for New Feature

```typescript
// Add to lib/i18n.ts in all 6 language blocks

en: {
  translation: {
    newFeature: {
      title: "New Feature",
      description: "Description here"
    }
  }
},

hi: {
  translation: {
    newFeature: {
      title: "नई सुविधा",
      description: "यहाँ विवरण"
    }
  }
},

ne: {
  translation: {
    newFeature: {
      title: "नयाँ विशेषता",
      description: "यहाँ विवरण"
    }
  }
},

bo: {
  translation: {
    newFeature: {
      title: "གསར་བ་ཆ་རིས་",
      description: "ལ་རིས་ཞིབ་འདེགས་"
    }
  }
},

lep: {
  translation: {
    newFeature: {
      title: "New Feature",
      description: "Description here"
    }
  }
},

lim: {
  translation: {
    newFeature: {
      title: "नयाँ विशेषता",
      description: "यहाँ विवरण"
    }
  }
}
```

## Debugging

To check which language is currently active:

```tsx
import { useLanguage } from '@/components/LanguageProvider';

export default function DebugLanguage() {
  const { language } = useLanguage();
  console.log('Current language:', language);
  return <div>Debug: {language}</div>;
}
```

## Resources

- [i18next Documentation](https://www.i18next.com/)
- [React-i18next](https://react.i18next.com/)
- [Unicode Character Sets](https://unicode.org/)
- [Tibetan Script](https://en.wikipedia.org/wiki/Tibetan_script)
- [Devanagari](https://en.wikipedia.org/wiki/Devanagari)
