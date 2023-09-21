interface AuthUser {
	id: number;
	username: string;
	email: string;
	provider: string;
	confirmed: boolean;
	blocked: boolean;
	createdAt: string;
	updatedAt: string;
}

interface RegistrationResponseDTO {
	jwt: string;
	user: AuthUser;
}
