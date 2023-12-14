export function generateConversationId(username, coachUsername) {
  if (username < coachUsername) {
    return `conversation-${username}-${coachUsername}`;
  }
  return `conversation-${coachUsername}-${username}`;
}
