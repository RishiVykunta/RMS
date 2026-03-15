'use server';

import { prisma } from '@/lib/prisma';
import * as bcrypt from 'bcryptjs';
import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

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

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { error: 'Invalid credentials' };
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

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return { error: 'User already exists' };

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const session = await encrypt({ user: { id: user.id, name: user.name, role: user.role }, expires });
  (await cookies()).set('session', session, { expires, httpOnly: true });

  redirect('/dashboard');
}

export async function logout() {
  (await cookies()).set('session', '', { expires: new Date(0) });
  redirect('/login');
}
