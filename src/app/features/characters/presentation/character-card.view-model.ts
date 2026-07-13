export interface CharacterCardViewModel {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  age: number | null;
  firstAppearanceTitle: string | null;
  firstAppearanceDate: string | null;
  portraitPath: string;
  alt: string;
}
