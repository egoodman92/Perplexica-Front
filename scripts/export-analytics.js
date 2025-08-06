#!/usr/bin/env node

const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const DATA_DIR = process.env.DATA_DIR || process.cwd();
const dbPath = path.join(DATA_DIR, './data/db.sqlite');

if (!fs.existsSync(dbPath)) {
  console.log('❌ Database not found at:', dbPath);
  process.exit(1);
}

const db = new Database(dbPath, { readonly: true });

try {
  console.log('📊 User Analytics Report\n');
  
  // Total conversations
  const totalChats = db.prepare('SELECT COUNT(*) as count FROM chats').get();
  console.log(`💬 Total conversations: ${totalChats.count}`);
  
  // Total messages
  const totalMessages = db.prepare('SELECT COUNT(*) as count FROM messages WHERE role = "user"').get();
  console.log(`📝 Total user queries: ${totalMessages.count}\n`);
  
  // Recent queries (last 50)
  console.log('🔍 Recent user queries:');
  console.log('─'.repeat(80));
  
  const recentQueries = db.prepare(`
    SELECT content, chatId, 
           JSON_EXTRACT(metadata, '$.createdAt') as created_at
    FROM messages 
    WHERE role = "user" 
    ORDER BY id DESC 
    LIMIT 50
  `).all();
  
  recentQueries.forEach((query, index) => {
    const date = new Date(query.created_at).toLocaleString();
    const preview = query.content.substring(0, 100) + (query.content.length > 100 ? '...' : '');
    console.log(`${index + 1}. [${date}] ${preview}`);
  });
  
  console.log('\n📈 Query statistics:');
  const avgLength = db.prepare('SELECT AVG(LENGTH(content)) as avg FROM messages WHERE role = "user"').get();
  console.log(`Average query length: ${Math.round(avgLength.avg)} characters`);
  
} catch (error) {
  console.error('❌ Error:', error.message);
} finally {
  db.close();
} 