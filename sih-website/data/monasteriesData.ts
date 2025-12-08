export interface Monastery {
  id: string;
  name: string;
  location: string;
  established: string;
  overview: string;
  digitalArchive: {
    description: string;
    items: Array<{
      title: string;
      type: string;
      description: string;
    }>;
  };
  audioTour: {
    description: string;
    duration: string;
    audioFile: string;
  };
  culturalCalendar: {
    description: string;
    events: Array<{
      name: string;
      date: string;
      description: string;
    }>;
  };
  virtualTour: {
    description: string;
    videoFile: string;
    features: string[];
  };
}

export const monasteries: Monastery[] = [
  {
    id: 'dubdi',
    name: 'Dubdi Monastery',
    location: 'Yuksom, West Sikkim',
    established: '1701 CE',
    overview: `Dubdi Monastery, also known as the Hermit's Cell, stands as Sikkim's oldest monastery, perched atop a hill in Yuksom. Founded in 1701 CE by Lhatsun Chempo, one of the three lamas who consecrated the first Chogyal of Sikkim, this sacred site marks the spiritual birthplace of Buddhism in the region. The monastery's serene location offers panoramic views of the surrounding Himalayan landscape, providing a perfect setting for meditation and contemplation.`,
    digitalArchive: {
      description: 'Explore rare manuscripts, ancient murals, and historical artifacts from Dubdi Monastery dating back to the early 18th century.',
      items: [
        {
          title: 'Ancient Buddhist Manuscripts',
          type: 'Document',
          description: 'Original Buddhist texts and scriptures preserved since 1701'
        },
        {
          title: 'Traditional Murals',
          type: 'Artwork',
          description: 'Sacred wall paintings depicting Buddhist cosmology and teachings'
        },
        {
          title: 'Religious Artifacts',
          type: 'Artifact',
          description: 'Prayer wheels, ritual objects, and ceremonial items used in daily worship'
        }
      ]
    },
    audioTour: {
      description: 'Listen to the stories and history of Dubdi Monastery, from its founding by Lhatsun Chempo to its role as Sikkim\'s first monastery.',
      duration: '15:30',
      audioFile: '/dubdi/WhatsApp Audio 2025-12-06 at 6.46.22 PM.mp4'
    },
    culturalCalendar: {
      description: 'Annual festivals and ceremonies celebrated at Dubdi Monastery throughout the year.',
      events: [
        {
          name: 'Losar (Tibetan New Year)',
          date: 'February-March',
          description: 'Celebration of the Tibetan New Year with prayers, rituals, and cultural performances'
        },
        {
          name: 'Saga Dawa',
          date: 'May-June',
          description: 'Commemoration of Buddha\'s birth, enlightenment, and parinirvana'
        },
        {
          name: 'Guru Padmasambhava Anniversary',
          date: 'July',
          description: 'Honoring the great master who established Buddhism in the Himalayas'
        }
      ]
    },
    virtualTour: {
      description: 'Experience a 3D virtual walkthrough of Dubdi Monastery, exploring its prayer halls, sacred chambers, and scenic surroundings.',
      videoFile: '/dubdi/dubdi 3d.mp4',
      features: [
        'Interactive 360° views',
        'High-resolution imagery',
        'Guided audio narration',
        'Historical hotspots'
      ]
    }
  },
  {
    id: 'tashiding',
    name: 'Tashiding Monastery',
    location: 'Geyzing, West Sikkim',
    established: '1717 CE',
    overview: `Tashiding Monastery, meaning "The Devoted Central Glory," is one of Sikkim's most sacred Buddhist pilgrimage sites. Built in 1717 CE and perched on a hilltop between the Rathong and Rangeet rivers, the monastery commands breathtaking views of the Kanchenjunga range. The site is renowned for the Bumchu festival, during which sacred water is revealed from a pot sealed the previous year, believed to predict the coming year's fortune for Sikkim.`,
    digitalArchive: {
      description: 'Discover the sacred artifacts and historical documents that make Tashiding one of the most revered monasteries in Sikkim.',
      items: [
        {
          title: 'Bumchu Sacred Vase',
          type: 'Artifact',
          description: 'The legendary vase containing holy water that predicts the future'
        },
        {
          title: 'Thongwa Rangdol Stupa',
          type: 'Monument',
          description: 'The sacred stupa believed to cleanse sins of all who see it'
        },
        {
          title: 'Ancient Thangkas',
          type: 'Artwork',
          description: 'Traditional Buddhist scroll paintings depicting deities and mandalas'
        }
      ]
    },
    audioTour: {
      description: 'Immerse yourself in the spiritual atmosphere of Tashiding through narrated stories of the Bumchu festival and monastery legends.',
      duration: '18:45',
      audioFile: '/tashiding audio.mp4'
    },
    culturalCalendar: {
      description: 'Experience the vibrant festivals that draw pilgrims from across the Himalayas to Tashiding Monastery.',
      events: [
        {
          name: 'Bhumchu Festival',
          date: 'February-March',
          description: 'The most sacred festival where the holy vase is opened to reveal predictions for the year ahead'
        },
        {
          name: 'Saga Dawa',
          date: 'May-June',
          description: 'Pilgrims circumambulate the monastery and offer prayers on Buddha\'s enlightenment day'
        },
        {
          name: 'Lhabab Düchen',
          date: 'October-November',
          description: 'Celebrating Buddha\'s descent from the heavenly realms'
        }
      ]
    },
    virtualTour: {
      description: 'Navigate through Tashiding\'s sacred spaces including the main temple, the Thongwa Rangdol stupa, and breathtaking valley views.',
      videoFile: '/virtual tour video.mp4',
      features: [
        'Panoramic mountain views',
        '360° monastery exploration',
        'Sacred stupa walkthrough',
        'Festival recreations'
      ]
    }
  },
  {
    id: 'tsuk',
    name: 'Tsuk Lhakhang Monastery',
    location: 'Gangtok, East Sikkim',
    established: 'Early 18th century',
    overview: `Tsuk Lhakhang Monastery, also known as the Royal Chapel, is a historic monastery located in the heart of Gangtok. Built in the early 18th century, it served as the royal family's place of worship and continues to be an important spiritual center in Sikkim's capital. Despite its urban location, Tsuk Lhakhang maintains a peaceful ambiance, offering visitors and devotees a tranquil space for prayer and meditation.`,
    digitalArchive: {
      description: 'Explore the royal heritage and religious treasures housed within Sikkim\'s historic Royal Chapel.',
      items: [
        {
          title: 'Royal Family Scriptures',
          type: 'Document',
          description: 'Sacred texts commissioned by the Sikkimese royal family'
        },
        {
          title: 'Traditional Frescoes',
          type: 'Artwork',
          description: 'Exquisite wall paintings depicting Buddhist deities and royal patronage'
        },
        {
          title: 'Ceremonial Objects',
          type: 'Artifact',
          description: 'Royal ritual items and prayer instruments'
        }
      ]
    },
    audioTour: {
      description: 'Listen to the stories and history of the Tsuk Monastery, from its time as a royal chapel to its current role as a center of Buddhist learning.',
      duration: '12:20',
      audioFile: '/tsuk/tsuk audio guide.wav'
    },
    culturalCalendar: {
      description: 'Annual religious ceremonies and cultural events at the historic Royal Chapel.',
      events: [
        {
          name: 'Losar (Tibetan New Year)',
          date: 'February',
          description: 'Traditional New Year celebrations with prayers and offerings'
        },
        {
          name: 'Saga Dawa',
          date: 'May-June',
          description: 'Commemoration of Buddha\'s birth, enlightenment, and passing'
        },
        {
          name: 'Drukpa Tsechi',
          date: 'July',
          description: 'Celebration of Guru Rinpoche\'s birth anniversary'
        }
      ]
    },
    virtualTour: {
      description: 'Virtual exploration of the Royal Chapel, showcasing its unique architecture and serene urban setting.',
      videoFile: '/virtual tour video.mp4',
      features: [
        'Royal chapel interior',
        'Sacred altar views',
        'Prayer hall experience',
        'Historical context'
      ]
    }
  },
  {
    id: 'rumtek',
    name: 'Rumtek Monastery',
    location: 'Rumtek, East Sikkim',
    established: '1960s (original from 1740)',
    overview: `Rumtek Monastery, officially known as the Dharma Chakra Centre, is the largest monastery in Sikkim and serves as the seat-in-exile of the Karmapa, the head of the Karma Kagyu lineage of Tibetan Buddhism. Originally built in the mid-18th century, it was rebuilt in the 1960s by the 16th Karmapa after he fled Tibet. The monastery is a masterpiece of traditional Tibetan architecture, featuring a grand main shrine hall adorned with elaborate murals, thangkas, and a magnificent golden stupa.`,
    digitalArchive: {
      description: 'Access the extensive collection of sacred texts, ritual objects, and historical records from the Karma Kagyu lineage.',
      items: [
        {
          title: 'Golden Stupa',
          type: 'Monument',
          description: 'Magnificent golden stupa containing relics of the 16th Karmapa'
        },
        {
          title: 'Ancient Manuscripts',
          type: 'Document',
          description: 'Vast collection of Buddhist scriptures and teachings'
        },
        {
          title: 'Thangka Collection',
          type: 'Artwork',
          description: 'Elaborate scroll paintings depicting Buddhist cosmology and deities'
        }
      ]
    },
    audioTour: {
      description: 'Walk through the courtyards of Rumtek as this guided audio takes you past the golden stupa, mural-lined corridors, and chanting halls, revealing stories of the Karmapa lineage.',
      duration: '22:15',
      audioFile: '/rumtek audio.mp4'
    },
    culturalCalendar: {
      description: 'Experience the grand festivals and ceremonies that showcase the living traditions of Tibetan Buddhism at Rumtek.',
      events: [
        {
          name: 'Losar Festival',
          date: 'February',
          description: 'Tibetan New Year celebrated with masked dances and rituals'
        },
        {
          name: 'Kagyu Monlam',
          date: 'March',
          description: 'International prayer festival attracting practitioners worldwide'
        },
        {
          name: 'Saga Dawa',
          date: 'May-June',
          description: 'Month-long observance of Buddha\'s life with daily prayers and teachings'
        }
      ]
    },
    virtualTour: {
      description: 'Immersive 3D tour of Sikkim\'s largest monastery, featuring the golden stupa, main shrine hall, and monastic courtyards.',
      videoFile: '/rumtek/WhatsApp Video 2025-12-08 at 7.14.23 AM.mp4',
      features: [
        'Main shrine hall',
        'Golden stupa chamber',
        'Monastery courtyards',
        'Monk residence areas'
      ]
    }
  }
];
