export interface User {
	id?: string;
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	password: string;
	agree: boolean;
	organizationName: string;
	organizationRole: string;
	organizationRoleOther?: string;
	dentalPracticeRole?: string;
	organizationState: string;
	organizationNumber: string;
	referralSource: string;
	referralSourceOther?: string;
}

export interface UserInfo {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
}


export interface CheckEmail {
    message: string;
    available: boolean;
}
