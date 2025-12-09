import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const supportedLanguages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "ne", label: "नेपाली" },
] as const;

export type SupportedLanguage = (typeof supportedLanguages)[number]["code"];

const resources = {
  en: {
    translation: {
      brand: { name: "Sangha" },
      intro: {
        title: "Sangha",
        subtitle: "A digital window into Sikkim's monasteries",
        enter: "Enter",
        explore: "Explore",
      },
      nav: {
        contributions: "Contributions",
        mediaContribution: "Media Contribution",
        dataContribution: "Data Contribution",
        bookings: "Bookings",
        retreat: "Sangha Retreat",
        searchPlaceholder: "Search…",
        home: "Home",
        overview: "Overview",
        map: "Map",
        monasteries: "Monasteries",
        archive: "Digital Archive",
        language: "Language",
        adminLogin: "Login as Admin",
      },
      hero: {
        headingTop: "DIGITALIZING",
        headingBottom: "SIKKIM",
        tagline: "Preserving sacred stories forever.",
        scroll: "Scroll To Explore",
      },
      footer: {
        title: "Treasures of Sikkim",
        rights: "© 2025 All rights reserved",
      },
      slideshow: {
        heading: "Sacred Monasteries",
        subtitle: "Explore the spiritual heart of Sikkim through its ancient monasteries.",
        cta: "Slide in",
        founded: "Founded in {{year}}",
        monasteries: {
          tashiding: {
            name: "Tashiding Monastery",
            location: "West Sikkim",
            description:
              "Revered as the 'Venerated Central Glory', Tashiding is vital to Sikkimese monasticism, its sublime mountain site and stupa are iconic. A single image is said to cleanse one's sins.",
          },
          tsuk: {
            name: "Tsuk La Khang Monastery",
            location: "Gangtok, East Sikkim",
            description:
              "Tsuk La Khang Monastery, located in the heart of Gangtok, is the former royal chapel of the Chogyal dynasty and one of Sikkim’s most significant centres of Buddhist learning.",
          },
          dubdi: {
            name: "Dubdi Monastery",
            location: "Yuksom, West Sikkim",
            description:
              "The 'Hermit's Cell', Dubdi, is Sikkim's first monastery, its stone chapel marking the crowning of the kingdom's Buddhist order.",
          },
          rumtek: {
            name: "Rumtek Monastery",
            location: "East Sikkim",
            description:
              "Grand and imposing, Rumtek is the Dharma Chakra Centre, stunning, alive with ritual, color, and living tradition.",
          },
        },
      },
    },
  },
  hi: {
    translation: {
      brand: { name: "Sangha" },
      intro: {
        title: "Sangha",
        subtitle: "सिक्किम के मठों की डिजिटल झलक",
        enter: "प्रवेश करें",
        explore: "अन्वेषण करें",
      },
      nav: {
        contributions: "योगदान",
        mediaContribution: "मीडिया योगदान",
        dataContribution: "डेटा योगदान",
        bookings: "बुकिंग",
        retreat: "संघ रिट्रीट",
        searchPlaceholder: "खोजें...",
        home: "होम",
        overview: "सारांश",
        map: "मानचित्र",
        monasteries: "मठ",
        archive: "डिजिटल अभिलेखागार",
        language: "भाषा",
        adminLogin: "प्रशासक के रूप में लॉगिन करें",
      },
      hero: {
        headingTop: "डिजिटलाइजिंग",
        headingBottom: "सिक्किम",
        tagline: "पवित्र कहानियों को सदा के लिए संजोना",
        scroll: "और देखने के लिए नीचे स्क्रॉल करें",
      },
      footer: {
        title: "सिक्किम के खजाने",
        rights: "© 2025 सर्वाधिकार सुरक्षित",
      },
      slideshow: {
        heading: "पवित्र मठ",
        subtitle: "सिक्किम के प्राचीन मठों के आध्यात्मिक हृदय की खोज करें।",
        cta: "अंदर देखें",
        founded: "स्थापित {{year}}",
        monasteries: {
          tashiding: {
            name: "ताशिडिंग मठ",
            location: "पश्चिम सिक्किम",
            description:
              "'वेनरेटेड सेंट्रल ग्लोरी' के रूप में पूजित ताशिडिंग मठ सिक्किम के मठवाद का मूल है; इसका पर्वतीय स्थल और स्तूप प्रतीकात्मक हैं। माना जाता है कि इसकी एक झलक पापों को शुद्ध करती है।",
          },
          tsuk: {
            name: "त्सुक ला खांग मठ",
            location: "गंगटोक, पूर्व सिक्किम",
            description:
              "गंगटोक के केंद्र में स्थित त्सुक ला खांग पूर्व चोग्याल वंश का शाही प्रार्थनालय था और सिक्किम के सबसे महत्वपूर्ण बौद्ध शिक्षण केंद्रों में एक है।",
          },
          dubdi: {
            name: "दुब्दी मठ",
            location: "युकसोम, पश्चिम सिक्किम",
            description:
              "'हरमिट्स सेल' के नाम से प्रसिद्ध दुब्दी सिक्किम का पहला मठ है; इसका पत्थर का चैपल राज्य के बौद्ध क्रम के उदय को दर्शाता है।",
          },
          rumtek: {
            name: "रूमटेक मठ",
            location: "पूर्व सिक्किम",
            description:
              "भव्य रूमटेक धर्म चक्र केंद्र है—रंग, अनुष्ठान और जीवंत परंपरा से परिपूर्ण।",
          },
        },
      },
    },
  },
  ne: {
    translation: {
      brand: { name: "Sangha" },
      intro: {
        title: "Sangha",
        subtitle: "सिक्किमका गुम्बाहरूको डिजिटल झ्याल",
        enter: "प्रवेश गर्नुहोस्",
        explore: "अन्वेषण गर्नुहोस्",
      },
      nav: {
        contributions: "योगदान",
        mediaContribution: "मिडिया योगदान",
        dataContribution: "डेटा योगदान",
        bookings: "बुकिङ",
        retreat: "सङ्घ रिट्रिट",
        searchPlaceholder: "खोज्नुहोस्...",
        home: "गृहपृष्ठ",
        overview: "अवलोकन",
        map: "नक्सा",
        monasteries: "गुम्बा",
        archive: "डिजिटल अभिलेख",
        language: "भाषा",
        adminLogin: "प्रशासकको रूपमा लगइन गर्नुहोस्",
      },
      hero: {
        headingTop: "डिजिटलाइज गर्दै",
        headingBottom: "सिक्किम",
        tagline: "पवित्र कथाहरू सधैंका लागि संरक्षण",
        scroll: "अन्वेषण गर्न तल स्क्रोल गर्नुहोस्",
      },
      footer: {
        title: "सिक्किमका सम्पदा",
        rights: "© 2025 सबै अधिकार सुरक्षित",
      },
      slideshow: {
        heading: "पवित्र गुम्बा",
        subtitle: "सिक्किमका प्राचीन गुम्बाहरूको आध्यात्मिक केन्द्रको अन्वेषण गर्नुहोस्।",
        cta: "भित्र जानुहोस्",
        founded: "स्थापित {{year}}",
        monasteries: {
          tashiding: {
            name: "ताशिडिङ गुम्बा",
            location: "पश्चिम सिक्किम",
            description:
              "'मध्य महिमा' को रुपमा सम्मानित ताशिडिङ सिक्किमेली गुम्बा परम्पराको मूल हो; यसको पर्वतीय स्थान र स्तूप प्रतीकात्मक छन्। एउटा दर्शनले पाप शुद्ध हुने विश्वास छ।",
          },
          tsuk: {
            name: "त्सुक ला खाङ्ग गुम्बा",
            location: "गन्तोक, पूर्व सिक्किम",
            description:
              "गन्तोकको मुटुमा रहेको त्सुक ला खाङ्ग पहिले चोग्याल राजपरिवारको प्रार्थना गृह थियो र सिक्किमका महत्वपूर्ण बौद्ध शिक्षण केन्द्रमध्ये एक हो।",
          },
          dubdi: {
            name: "दुब्दी गुम्बा",
            location: "युक्सोम, पश्चिम सिक्किम",
            description:
              "'हरमिट्स सेल' भनेर चिनिने दुब्दी सिक्किमको पहिलो गुम्बा हो; यसको ढुंगाको चैपलले राज्यको बौद्ध क्रमको उदय देखाउँछ।",
          },
          rumtek: {
            name: "रुमटेक गुम्बा",
            location: "पूर्व सिक्किम",
            description:
              "भव्य रुमटेक धर्म चक्र केन्द्र हो—रङ, अनुष्ठान र जीवित परम्पराले भरिपूर्ण।",
          },
        },
      },
    },
  },
} as const;

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    compatibilityJSON: "v4",
  });
}

export default i18n;
