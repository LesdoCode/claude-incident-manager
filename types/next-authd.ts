import NextAuth from 'next-auth';

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
	 */
	interface Session {
		user: {
			id: number;
			username: string;
			email: string;
			provider: string;
			confirmed: boolean;
			blocked: boolean;
			createdAt: string;
			updatedAt: string;
			jwt: string;
		};
	}
	/**
	 * The shape of the user object returned in the OAuth providers' `profile` callback,
	 * or the second parameter of the `session` callback, when using a database.
	 */
	interface User {
		id: number;
		username: string;
		email: string;
		provider: string;
		confirmed: boolean;
		blocked: boolean;
		createdAt: string;
		updatedAt: string;
		jwt: string;
	}
	/**
	 * Usually contains information about the provider being used
	 * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
	 */
	interface Account {}
	/** The OAuth profile returned from your provider */
	interface Profile {}

	interface Token {
		id: number;
		username: string;
		email: string;
		provider: string;
		confirmed: boolean;
		blocked: boolean;
		createdAt: string;
		updatedAt: string;
		jwt: string;
	}
}
