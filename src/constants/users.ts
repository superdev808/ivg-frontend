export enum USER_ROLES {
    ADMIN = 'Admin',
    USER = 'User',
    GUEST = 'Guest',
}

export const USER_ROLES_OPTIONS = [
    { label: 'Admin', value: USER_ROLES.ADMIN },
    { label: 'User', value: USER_ROLES.USER },
    { label: 'Guest', value: USER_ROLES.GUEST },
];

export const USER_VERIFIED_OPTIONS = [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
];