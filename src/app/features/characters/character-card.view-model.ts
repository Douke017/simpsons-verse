export interface CharacterCardViewModel {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  age: number | null;
  birthdate: string | null;
  gender: string;
  occupation: string;
  status: string;
  portraitPath: string;
  alt: string;
}
