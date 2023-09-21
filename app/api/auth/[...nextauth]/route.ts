import { authOptions } from '@/helpers/auth/authOptions';
import NextAuth from 'next-auth';

const handler = NextAuth(authOptions);
export const GET: any = handler;
export const POST: any = handler;
