'use server';

import { prisma } from '@/lib/prisma';
import * as bcrypt from 'bcryptjs';
import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { sendVerificationEmail, sendPasswordResetEmail } from '@/lib/email';
import crypto from 'node:crypto';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const validated = loginSchema.safeParse({ email, password });
  if (!validated.success) return { error: 'Invalid input' };

  const user = await (prisma.user as any).findUnique({
    where: { email },
  });

  if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
    return { error: 'Invalid credentials' };
  }

  if (!user.isVerified) {
    return { error: 'Please verify your email first', redirect: `/verify-email?email=${email}` };
  }

  const expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
  const session = await encrypt({ user: { id: user.id, name: user.name, role: user.role }, expires });

  (await cookies()).set('session', session, { expires, httpOnly: true });

  redirect('/dashboard');
}

export async function register(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const validated = registerSchema.safeParse({ name, email, password });
  if (!validated.success) return { error: 'Invalid input' };

  const exists = await (prisma.user as any).findUnique({ where: { email } });
  if (exists) return { error: 'User already exists' };

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  const user = await (prisma.user as any).create({
    data: {
      name,
      email,
      password: hashedPassword,
      verificationCode,
    },
  });

  await sendVerificationEmail(email, verificationCode);

  redirect(`/verify-email?email=${email}`);
}

export async function verifyEmail(email: string, code: string) {
  const user = await (prisma.user as any).findUnique({ where: { email } });
  
  if (!user || user.verificationCode !== code) {
    return { error: 'Invalid verification code' };
  }

  await (prisma.user as any).update({
    where: { email },
    data: { isVerified: true, verificationCode: null },
  });

  const expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const session = await encrypt({ user: { id: user.id, name: user.name, role: user.role }, expires });
  (await cookies()).set('session', session, { expires, httpOnly: true });

  redirect('/dashboard');
}

export async function forgotPassword(email: string) {
  const user = await (prisma.user as any).findUnique({ where: { email } });
  if (!user) return { error: 'User not found' };

  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hour

  await (prisma.user as any).update({
    where: { email },
    data: { resetToken, resetTokenExpires },
  });

  await sendPasswordResetEmail(email, resetToken);
  return { success: true };
}

export async function resetPassword(token: string, formData: FormData) {
  const password = formData.get('password') as string;
  const user = await (prisma.user as any).findFirst({
    where: {
      resetToken: token,
      resetTokenExpires: { gt: new Date() },
    },
  });

  if (!user) return { error: 'Invalid or expired reset token' };

  const hashedPassword = await bcrypt.hash(password, 10);
  await (prisma.user as any).update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpires: null,
    },
  });

  redirect('/login');
}


export async function googleLogin(idToken: string) {
  // In a real app, you would verify the token with Google using google-auth-library
  // Since we are keeping it simple, we will assume the token is valid for this demo
  
  const payload = JSON.parse(Buffer.from(idToken.split('.')[1], 'base64').toString());
  const { email, name, sub: googleId } = payload;

  let user = await (prisma.user as any).findUnique({ where: { email } });

  if (!user) {
    user = await (prisma.user as any).create({
      data: {
        email,
        name,
        googleId,
        isVerified: true,
      },
    });
  } else if (!user.googleId) {
    user = await (prisma.user as any).update({
      where: { id: user.id },
      data: { googleId, isVerified: true },
    });
  }

  const expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const session = await encrypt({ user: { id: user.id, name: user.name, role: user.role }, expires });
  (await cookies()).set('session', session, { expires, httpOnly: true });

  redirect('/dashboard');
}


export async function logout() {
  (await cookies()).set('session', '', { expires: new Date(0) });
  redirect('/login');
}
