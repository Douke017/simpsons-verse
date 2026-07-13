export interface Character {
  id: number;
  name: string;
  age: number | null;
  birthdate: string | null;
  gender: string;
  occupation: string;
  portraitPath: string;
  phrases: string[];
  status: string;
}
