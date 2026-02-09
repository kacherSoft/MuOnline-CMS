/**
 * MuOnline Character Class Utilities
 * Helpers for character class names, colors, and icons
 */

export type CharacterClass =
  | 'DarkKnight'
  | 'DarkWizard'
  | 'FairyElf'
  | 'MagicGladiator'
  | 'DarkLord'
  | 'Summoner'
  | 'RageFighter';

export interface ClassInfo {
  id: CharacterClass;
  name: string;
  shortCode: string;
  color: string;
  bgColor: string;
  description: string;
  icon: string;
}

const CLASS_INFO: Record<CharacterClass, ClassInfo> = {
  DarkKnight: {
    id: 'DarkKnight',
    name: 'Dark Knight',
    shortCode: 'DK',
    color: '#ff4444',
    bgColor: 'rgba(255, 68, 68, 0.1)',
    description: 'Fearless warrior with high strength and agility',
    icon: '⚔️',
  },
  DarkWizard: {
    id: 'DarkWizard',
    name: 'Dark Wizard',
    shortCode: 'DW',
    color: '#a855f7',
    bgColor: 'rgba(168, 85, 247, 0.1)',
    description: 'Master of magical arts with staff-type weapons',
    icon: '🔮',
  },
  FairyElf: {
    id: 'FairyElf',
    name: 'Fairy Elf',
    shortCode: 'Elf',
    color: '#22c55e',
    bgColor: 'rgba(34, 197, 94, 0.1)',
    description: 'Elven character from Noria with ranged combat expertise',
    icon: '🏹',
  },
  MagicGladiator: {
    id: 'MagicGladiator',
    name: 'Magic Gladiator',
    shortCode: 'MG',
    color: '#06b6d4',
    bgColor: 'rgba(6, 182, 212, 0.1)',
    description: 'Fusion of Dark Knight and Dark Wizard',
    icon: '⚡',
  },
  DarkLord: {
    id: 'DarkLord',
    name: 'Dark Lord',
    shortCode: 'DL',
    color: '#ffd700',
    bgColor: 'rgba(255, 215, 0, 0.1)',
    description: 'Supreme ruler with commanding presence',
    icon: '👑',
  },
  Summoner: {
    id: 'Summoner',
    name: 'Summoner',
    shortCode: 'Sum',
    color: '#ec4899',
    bgColor: 'rgba(236, 72, 153, 0.1)',
    description: 'Mystical conjurer of dark creatures',
    icon: '🌙',
  },
  RageFighter: {
    id: 'RageFighter',
    name: 'Rage Fighter',
    shortCode: 'RF',
    color: '#f97316',
    bgColor: 'rgba(249, 115, 22, 0.1)',
    description: 'Fierce melee combat specialist',
    icon: '💥',
  },
};

/**
 * Get class information by class name
 */
export function getClassInfo(classType: string): ClassInfo | null {
  const normalizedClass = classType.replace(/\s/g, '') as CharacterClass;
  return CLASS_INFO[normalizedClass] || null;
}

/**
 * Get class color for styling
 */
export function getClassColor(classType: string): string {
  const info = getClassInfo(classType);
  return info?.color || '#00d4ff';
}

/**
 * Get class background color for styling
 */
export function getClassBgColor(classType: string): string {
  const info = getClassInfo(classType);
  return info?.bgColor || 'rgba(0, 212, 255, 0.1)';
}

/**
 * Get class icon/emoji
 */
export function getClassIcon(classType: string): string {
  const info = getClassInfo(classType);
  return info?.icon || '❓';
}

/**
 * Get class short code (e.g., DK, DW, Elf)
 */
export function getClassShortCode(classType: string): string {
  const info = getClassInfo(classType);
  return info?.shortCode ?? classType.substring(0, 3);
}

/**
 * Format character name with class prefix
 */
export function formatCharacterName(name: string, classType: string): string {
  const shortCode = getClassShortCode(classType);
  return `[${shortCode}] ${name}`;
}

/**
 * Get CSS class name for class badge
 */
export function getClassBadgeClass(classType: string): string {
  const normalizedClass = classType.replace(/\s/g, '').toLowerCase();
  const mapping: Record<string, string> = {
    darkknight: 'class-badge-dk',
    darkwizard: 'class-badge-dw',
    fairyelf: 'class-badge-elf',
    magicgladiator: 'class-badge-mg',
    darklord: 'class-badge-dl',
    summoner: 'class-badge-sum',
    ragefighter: 'class-badge-rf',
  };
  return mapping[normalizedClass] || 'class-badge-dk';
}

/**
 * Get all available classes
 */
export function getAllClasses(): ClassInfo[] {
  return Object.values(CLASS_INFO);
}

/**
 * Validate if a class is valid
 */
export function isValidClass(classType: string): boolean {
  const normalizedClass = classType.replace(/\s/g, '') as CharacterClass;
  return CLASS_INFO[normalizedClass] !== undefined;
}

/**
 * Format number with commas (e.g., 1,234,567)
 */
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Format stat display with color coding based on value
 */
export function getStatColor(value: number, max: number = 32767): string {
  const ratio = value / max;
  if (ratio >= 0.8) return 'text-green-400';
  if (ratio >= 0.5) return 'text-yellow-400';
  if (ratio >= 0.3) return 'text-orange-400';
  return 'text-red-400';
}

/**
 * Calculate stat percentage for progress bars
 */
export function getStatPercentage(value: number, max: number = 32767): number {
  return Math.min((value / max) * 100, 100);
}
