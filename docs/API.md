# MuCMS API Documentation

## Overview

MuCMS provides REST APIs for web functionality and Socket.io for real-time chat.

**Base URL:** `http://localhost:3000/api`

**Authentication:** JWT Bearer Token (except where noted)

---

## REST API Endpoints

### Authentication

#### POST `/auth/register`
Register new account.

**Request:**
```json
{
  "username": "string",
  "password": "string",
  "email": "string"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "jwt_token",
  "user": { "id": 1, "username": "string" }
}
```

#### POST `/auth/login`
Login with credentials.

**Request:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "jwt_token",
  "user": { "id": 1, "username": "string" }
}
```

#### POST `/auth/logout`
Logout (invalidate token on client).

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{ "success": true, "message": "Logged out" }
```

---

### Chat Messages

#### GET `/chat/messages`
Get chat messages with pagination.

**Headers:** `Authorization: Bearer <token>`

**Query Params:**
- `page` (number, default: 1)
- `limit` (number, default: 50)
- `channel` (string, default: "global")

**Response (200):**
```json
{
  "success": true,
  "messages": [
    {
      "id": 1,
      "characterId": "test_char",
      "characterName": "TestPlayer",
      "message": "Hello world",
      "channel": "global",
      "timestamp": "2026-02-06T12:00:00Z"
    }
  ],
  "pagination": { "page": 1, "limit": 50, "total": 100 }
}
```

#### POST `/chat/messages`
Send chat message (also sent via Socket.io).

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "message": "string",
  "channel": "string"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": { "id": 1, "message": "string", "timestamp": "..." }
}
```

#### GET `/chat/channels`
Get available chat channels.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "channels": ["global", "trade", "guild", "support"]
}
```

---

### Rankings

#### GET `/rankings/characters`
Get character rankings.

**Headers:** `Authorization: Bearer <token>`

**Query Params:**
- `page` (number, default: 1)
- `limit` (number, default: 20)
- `class` (number, optional)
- `sortBy` (string: "resets", "level", "strength", etc.)

**Response (200):**
```json
{
  "success": true,
  "rankings": [
    {
      "rank": 1,
      "name": "PlayerName",
      "class": 1,
      "resets": 100,
      "level": 400,
      "strength": 32767,
      "dexterity": 32767,
      "vitality": 32767,
      "energy": 32767
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 500 }
}
```

#### GET `/rankings/guilds`
Get guild rankings.

**Headers:** `Authorization: Bearer <token>`

**Query Params:**
- `page` (number, default: 1)
- `limit` (number, default: 20)
- `sortBy` (string: "score", "members", "wins")

**Response (200):**
```json
{
  "success": true,
  "rankings": [
    {
      "rank": 1,
      "name": "GuildName",
      "master": "GuildMaster",
      "score": 50000,
      "members": 50,
      "wins": 100
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 100 }
}
```

---

### Admin Dashboard

#### GET `/admin/stats`
Get server statistics.

**Headers:** `Authorization: Bearer <token>` (Admin required)

**Response (200):**
```json
{
  "success": true,
  "stats": {
    "onlinePlayers": 150,
    "totalAccounts": 5000,
    "totalCharacters": 12000,
    "totalGuilds": 300
  }
}
```

#### GET `/admin/online-players`
Get online players list.

**Headers:** `Authorization: Bearer <token>` (Admin required)

**Response (200):**
```json
{
  "success": true,
  "players": [
    {
      "name": "PlayerName",
      "class": 1,
      "level": 400,
      "map": "Lorencia",
      "connectTime": "2026-02-06T10:00:00Z"
    }
  ]
}
```

#### POST `/admin/ban`
Ban a player.

**Headers:** `Authorization: Bearer <token>` (Admin required)

**Request:**
```json
{
  "characterId": "string",
  "reason": "string",
  "duration": "24h"
}
```

**Response (200):**
```json
{ "success": true, "message": "Player banned" }
```

---

### News

#### GET `/news`
Get news articles.

**Response (200):**
```json
{
  "success": true,
  "news": [
    {
      "id": 1,
      "title": "Server Update",
      "content": "...",
      "author": "Admin",
      "createdAt": "2026-02-06T12:00:00Z"
    }
  ]
}
```

#### GET `/news/:id`
Get single news article.

**Response (200):**
```json
{
  "success": true,
  "article": {
    "id": 1,
    "title": "Server Update",
    "content": "...",
    "author": "Admin",
    "createdAt": "2026-02-06T12:00:00Z"
  }
}
```

---

### Downloads

#### GET `/downloads`
Get available downloads.

**Response (200):**
```json
{
  "success": true,
  "downloads": [
    {
      "id": 1,
      "name": "Full Client",
      "version": "1.0.0",
      "size": "1.5GB",
      "url": "https://..."
    }
  ]
}
```

---

## Socket.io Events

### Connection

```typescript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {
  auth: { token: 'jwt_token' }
});
```

### Events

#### Client → Server

**Event:** `sendMessage`
```typescript
socket.emit('sendMessage', {
  message: 'Hello',
  channel: 'global'
});
```

**Event:** `joinChannel`
```typescript
socket.emit('joinChannel', { channel: 'trade' });
```

**Event:** `leaveChannel`
```typescript
socket.emit('leaveChannel', { channel: 'trade' });
```

#### Server → Client

**Event:** `message`
```typescript
socket.on('message', (data) => {
  console.log(data.message, data.characterName, data.timestamp);
});
```

**Event:** `onlineCount`
```typescript
socket.on('onlineCount', (count) => {
  console.log('Online:', count);
});
```

---

## Error Responses

All endpoints return consistent error format:

```json
{
  "success": false,
  "error": "Error message"
}
```

**Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## Rate Limits

- Auth endpoints: 5 requests/minute
- Chat messages: 10/minute per user
- Rankings: 30/minute
- Admin: 60/minute

Rate limit headers included:
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1675728000
```
