import { randomUUID } from 'node:crypto';

function generateInviteCode() {
  return randomUUID().replace(/-/g, '').substring(0, 8);
}

function generateTaskCode() {
  return `task-${randomUUID().replace(/-/g, '').substring(0, 3)}`;
}

export { generateInviteCode, generateTaskCode };
