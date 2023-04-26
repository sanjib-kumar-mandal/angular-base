export enum Language {
  English = 'en',
  Hindi = 'hi',
  Bengali = 'bn',
}

export const LanguageNames = {
  [Language.English]: 'English',
  [Language.Hindi]: 'Hindi',
  [Language.Bengali]: 'Bengali',
};

export const LanguageDetails = [
  { value: Language.English, name: LanguageNames[Language.English] },
  { value: Language.Hindi, name: LanguageNames[Language.Hindi] },
  { value: Language.Bengali, name: LanguageNames[Language.Bengali] },
];
