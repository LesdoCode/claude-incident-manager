import { CMS_URL } from '@/helpers/consstants';
import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
	providers: [
		Credentials({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'jsmith@example.com',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				const response: RegistrationResponseDTO = await fetch(
					`${CMS_URL}/api/auth/local`,
					{
						method: 'POST',
						body: JSON.stringify({
							identifier: credentials?.email ?? '',
							password: credentials?.password ?? '',
						}),
						headers: new Headers({
							'content-type': 'application/json',
						}),
					}
				).then((res) => res.json());

				if (response?.user) {
					return {
						...response.user,
						jwt: response.jwt,
					};
				}

				return null;
			},
		}),
	],
	callbacks: {
		async jwt({ token, account, user }) {
			if (user) {
				return {
					...token,
					id: user.id,
					username: user.username,
					email: user.email,
					provider: user.provider,
					confirmed: user.confirmed,
					blocked: user.blocked,
					createdAt: user.createdAt,
					updatedAt: user.updatedAt,
					jwt: user.jwt,
				};
			}

			return token;
		},

		async session({ session, token }) {
			return {
				...session,
				user: {
					...session.user,
					id: token.id,
					username: token.username,
					email: token.email,
					provider: token.provider,
					confirmed: token.confirmed,
					blocked: token.blocked,
					createdAt: token.createdAt,
					updatedAt: token.updatedAt,
					jwt: token.jwt,
				},
			};
		},
	},
	pages: {
		signIn: '/login',
		newUser: '/register',
	},
	session: {
		strategy: 'jwt',
	},
	secret: process.env.JWT_SECRET,
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
