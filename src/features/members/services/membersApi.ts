import { membersApi as api } from '@/api'
import type { Member } from '@/features/members/types'

export const membersApi = {
  async getMembers(): Promise<Member[]> {
    const res = await api.getAll()
    const data = 'data' in res ? (res as unknown as { data: Member[] }).data : (res as unknown as Member[])
    return Array.isArray(data) ? data : []
  },

  async getMember(id: string): Promise<Member | undefined> {
    try {
      return await api.getById(id)
    } catch {
      return undefined
    }
  },

  async createMember(_data: import('@/features/members/types').CreateMemberPayload): Promise<Member> {
    throw new Error('Create member is handled via registration endpoint')
  },

  async updateMember(id: string, data: Partial<Member>): Promise<Member> {
    return api.update(id, data as unknown as Partial<import('@/types').Member>) as unknown as Promise<Member>
  },

  async deleteMember(id: string): Promise<void> {
    return api.delete(id)
  },

  async approveMember(id: string): Promise<Member> {
    return api.updateStatus(id, 'active') as unknown as Promise<Member>
  },

  async rejectMember(id: string, reason?: string): Promise<Member> {
    return api.updateStatus(id, 'deactivated', reason) as unknown as Promise<Member>
  },
}
