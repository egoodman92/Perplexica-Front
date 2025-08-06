import db from '@/lib/db';
import { messages } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(req: Request) {
  try {
    // Simple auth check
    const authHeader = req.headers.get('authorization');
    if (!authHeader || authHeader !== 'Bearer admin123') {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get recent user messages
    const recentMessages = await db
      .select({
        content: messages.content,
        chatId: messages.chatId,
        metadata: messages.metadata,
      })
      .from(messages)
      .where(eq(messages.role, 'user'))
      .orderBy(desc(messages.id))
      .limit(50);

    return Response.json({
      recentQueries: recentMessages.map(msg => ({
        query: msg.content,
        chatId: msg.chatId,
        timestamp: msg.metadata ? JSON.parse(msg.metadata as string).createdAt : null,
        preview: msg.content.substring(0, 100) + (msg.content.length > 100 ? '...' : ''),
      })),
    });
  } catch (error) {
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
} 