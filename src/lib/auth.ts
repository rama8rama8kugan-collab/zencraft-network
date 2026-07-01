import { NextRequest } from 'next/server';

export async function getUserFromToken(request: NextRequest) {
  try {
    const token = request.cookies.get('zencraft_token')?.value;
    if (!token) return null;

    const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
    return decoded;
  } catch (error) {
    return null;
  }
}

export function generateToken(data: any): string {
  return Buffer.from(JSON.stringify(data)).toString('base64');
}

export function verifyToken(token: string): any {
  try {
    return JSON.parse(Buffer.from(token, 'base64').toString());
  } catch (error) {
    return null;
  }
}
