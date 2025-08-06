import db from '@/lib/db';
import { messages, chats } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const totalChats = await db.select().from(chats);
    const totalUserMessages = await db
      .select()
      .from(messages)
      .where(eq(messages.role, 'user'));

    return Response.json({
      status: 'Database connected ✅',
      stats: {
        totalConversations: totalChats.length,
        totalUserQueries: totalUserMessages.length,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    // If tables don't exist yet, return a different message
    if (error instanceof Error && error.message.includes('no such table')) {
      return Response.json({
        status: 'Database connected (tables not created yet) ⚠️',
        stats: {
          totalConversations: 0,
          totalUserQueries: 0,
        },
        note: 'No user activity yet - database tables will be created on first chat',
        timestamp: new Date().toISOString(),
      });
    }
    
    return Response.json({ 
      status: 'Database error ❌',
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
} 