import { AboutMeData } from './types';

export const DEFAULT_ABOUT_ME_DATA: AboutMeData = {
  spot1: {
    spotNumber: 1,
    spotTitle: 'Add Title',
    fullName: '',
    role: '',
    avatarInitials: '',
    profileImage: '',
    statusBadge: '',
    bioStory: '',
  },
  spot2: {
    spotNumber: 2,
    spotTitle: 'Add Title',
    subtitle: '',
    categories: [
      {
        id: 'c1',
        name: '',
        skills: [],
      },
      {
        id: 'c2',
        name: '',
        skills: [],
      },
      {
        id: 'c3',
        name: '',
        skills: [],
      },
    ],
  },
  spot3: {
    spotNumber: 3,
    spotTitle: 'Add Title',
    subtitle: '',
    items: [
      {
        id: 'e1',
        role: '',
        organization: '',
        period: '',
        description: '',
      },
    ],
  },
  spot4: {
    spotNumber: 4,
    spotTitle: 'Add Title',
    subtitle: '',
    items: [
      {
        id: 'p1',
        title: '',
        tag: '',
        description: '',
      },
    ],
  },
  spot5: {
    spotNumber: 5,
    spotTitle: 'Add Title',
    subtitle: '',
    facts: [
      { id: 'f1', label: '', value: '' },
      { id: 'f2', label: '', value: '' },
    ],
  },
};
