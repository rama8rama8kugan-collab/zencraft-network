import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json();

    if (!username) {
      return NextResponse.json({ error: 'Username required' }, { status: 400 });
    }

    // Fetch player data from Mojang API
    const profileRes = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
    if (!profileRes.ok) {
      return NextResponse.json({ error: 'Player not found' }, { status: 404 });
    }

    const profileData = await profileRes.json();
    const { id: uuid, name: minecraftUsername } = profileData;

    // Get or create user
    let user = await prisma.user.findUnique({
      where: { uuid },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          minecraftUsername,
          uuid,
          head: `https://crafatar.com/avatars/${uuid}`,
          skin: `https://crafatar.com/skins/${uuid}`,
          profile: {
            create: {
              joinDate: new Date(),
            },
          },
          settings: {
            create: {},
          },
        },
        include: {
          profile: true,
          rank: true,
        },
      });
    }

    // Create session token
    const token = Buffer.from(JSON.stringify({ userId: user.id, uuid })).toString('base64');

    const response = NextResponse.json(
      {
        user: {
          id: user.id,
          minecraftUsername: user.minecraftUsername,
          uuid: user.uuid,
          head: user.head,
          coins: user.coins,
        },
      },
      { status: 200 }
    );

    response.cookies.set('zencraft_token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
