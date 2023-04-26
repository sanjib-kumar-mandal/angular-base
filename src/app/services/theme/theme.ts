export enum Theme {
    Light = 'light',
    Dark = 'dark'
}

export const AvailableThemes: Array<Theme> = [
    Theme.Dark,
    Theme.Light
];

export const ThemeColors = {
    [Theme.Dark]: '#292826',
    [Theme.Light]: '#f5f5f5'
}