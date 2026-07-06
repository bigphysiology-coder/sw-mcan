import type { Lodge } from '@/features/lodges/types'

const LODGES_KEY = 'mcan-lodges'
const delay = () => new Promise<void>((r) => setTimeout(r, 600))

const P = {
  dome: '/photos/mosque-dome.jpg',
  block: '/photos/mosque-block.jpg',
  hall: '/photos/lecture-hall.jpg',
  group: '/photos/corps-group.jpg',
  member: '/photos/member-story.jpg',
  parade: '/photos/parade.jpg',
}

function seed() {
  if (localStorage.getItem(LODGES_KEY)) return
  const lodges: Lodge[] = [
    { id: 'l1', name: "Surulere Brothers' Lodge", photo: P.block, address: '14 Ojuelegba Road, Surulere, Lagos', state: 'Lagos', capacity: 28, status: 'Available', coordinator: 'Br. Yusuf Adelaja', phone: '0803 221 7740', map: 'MCAN Surulere Lagos mosque' },
    { id: 'l2', name: "Ikeja Sisters' Lodge", photo: P.member, address: '7 Allen Avenue, Ikeja, Lagos', state: 'Lagos', capacity: 22, status: 'Limited', coordinator: 'Sr. Khadijah Ogundele', phone: '0816 559 0021', map: 'Allen Avenue Ikeja Lagos' },
    { id: 'l3', name: 'Badagry Outreach Lodge', photo: P.hall, address: '3 Marina Road, Badagry, Lagos', state: 'Lagos', capacity: 18, status: 'Available', coordinator: 'Br. Ismail Salaudeen', phone: '0905 778 1132', map: 'Badagry Lagos' },
    { id: 'l4', name: 'Abeokuta Central Lodge', photo: P.dome, address: '21 Kuto Crescent, Abeokuta, Ogun', state: 'Ogun', capacity: 32, status: 'Available', coordinator: 'Br. Tawfeeq Abiola', phone: '0802 410 3398', map: 'Kuto Abeokuta Ogun' },
    { id: 'l5', name: "Sagamu Brothers' Lodge", photo: P.group, address: '9 Akarigbo Street, Sagamu, Ogun', state: 'Ogun', capacity: 20, status: 'Full', coordinator: 'Br. Hamzah Onikoyi', phone: '0813 226 7781', map: 'Sagamu Ogun' },
    { id: 'l6', name: "Ijebu-Ode Sisters' Lodge", photo: P.member, address: '5 Folagbade Street, Ijebu-Ode, Ogun', state: 'Ogun', capacity: 24, status: 'Limited', coordinator: 'Sr. Maryam Bankole', phone: '0907 552 4419', map: 'Folagbade Street Ijebu Ode' },
    { id: 'l7', name: 'Ibadan Bodija Lodge', photo: P.hall, address: '18 Awolowo Avenue, Bodija, Ibadan, Oyo', state: 'Oyo', capacity: 36, status: 'Available', coordinator: 'Br. Abdulrahman Lawal', phone: '0805 119 6620', map: 'Bodija Ibadan Oyo' },
    { id: 'l8', name: "Ogbomoso Brothers' Lodge", photo: P.block, address: '12 Owode Road, Ogbomoso, Oyo', state: 'Oyo', capacity: 22, status: 'Limited', coordinator: 'Br. Saheed Akintola', phone: '0814 903 2257', map: 'Ogbomoso Oyo' },
    { id: 'l9', name: "Oyo Town Sisters' Lodge", photo: P.member, address: '6 Sabo Quarters, Oyo Town, Oyo', state: 'Oyo', capacity: 19, status: 'Available', coordinator: 'Sr. Halimah Adeyemi', phone: '0903 661 8870', map: 'Sabo Oyo town' },
    { id: 'l10', name: 'Osogbo Central Lodge', photo: P.dome, address: '4 Gbongan Road, Osogbo, Osun', state: 'Osun', capacity: 30, status: 'Available', coordinator: 'Br. Mubarak Oyelaran', phone: '0816 224 7013', map: 'Gbongan Road Osogbo Osun' },
    { id: 'l11', name: "Ile-Ife Brothers' Lodge", photo: P.group, address: '11 OAU Road, Ile-Ife, Osun', state: 'Osun', capacity: 26, status: 'Limited', coordinator: 'Br. Faruq Adebayo', phone: '0802 778 5540', map: 'OAU Road Ile Ife Osun' },
    { id: 'l12', name: "Ilesa Sisters' Lodge", photo: P.parade, address: '8 Ereja Square, Ilesa, Osun', state: 'Osun', capacity: 18, status: 'Full', coordinator: 'Sr. Aisha Olabisi', phone: '0907 330 9912', map: 'Ereja Square Ilesa Osun' },
    { id: 'l13', name: 'Akure Alagbaka Lodge', photo: P.hall, address: '15 Alagbaka GRA, Akure, Ondo', state: 'Ondo', capacity: 28, status: 'Available', coordinator: 'Br. Lukman Aderibigbe', phone: '0805 442 1198', map: 'Alagbaka Akure Ondo' },
    { id: 'l14', name: "Ondo Town Brothers' Lodge", photo: P.block, address: '3 Yaba Street, Ondo Town, Ondo', state: 'Ondo', capacity: 20, status: 'Available', coordinator: 'Br. Nasir Olufemi', phone: '0813 905 6674', map: 'Ondo town' },
    { id: 'l15', name: "Owo Sisters' Lodge", photo: P.member, address: '9 Oke-Mapo Road, Owo, Ondo', state: 'Ondo', capacity: 16, status: 'Limited', coordinator: 'Sr. Zainab Adeoti', phone: '0903 118 4452', map: 'Owo Ondo' },
    { id: 'l16', name: 'Ado-Ekiti Central Lodge', photo: P.dome, address: '22 Fajuyi Road, Ado-Ekiti, Ekiti', state: 'Ekiti', capacity: 30, status: 'Available', coordinator: 'Br. Ridwan Ojo', phone: '0816 770 3325', map: 'Fajuyi Road Ado Ekiti' },
    { id: 'l17', name: "Ikere Brothers' Lodge", photo: P.group, address: '6 Afao Road, Ikere-Ekiti, Ekiti', state: 'Ekiti', capacity: 18, status: 'Limited', coordinator: 'Br. Habib Ogunlade', phone: '0802 559 7741', map: 'Ikere Ekiti' },
    { id: 'l18', name: "Ikole Sisters' Lodge", photo: P.member, address: '4 Oja-Oba Street, Ikole-Ekiti, Ekiti', state: 'Ekiti', capacity: 15, status: 'Available', coordinator: 'Sr. Fatimah Bamidele', phone: '0907 224 6638', map: 'Ikole Ekiti' },
  ]
  localStorage.setItem(LODGES_KEY, JSON.stringify(lodges))
}

seed()

function getStored(): Lodge[] {
  try {
    return JSON.parse(localStorage.getItem(LODGES_KEY) || '[]') as Lodge[]
  } catch {
    return []
  }
}

function save(data: Lodge[]) {
  localStorage.setItem(LODGES_KEY, JSON.stringify(data))
}

export const lodgesApi = {
  async getLodges(): Promise<Lodge[]> {
    await delay()
    return getStored()
  },

  async getLodge(id: string): Promise<Lodge | undefined> {
    await delay()
    return getStored().find((l) => l.id === id)
  },

  async createLodge(data: Omit<Lodge, 'id'>): Promise<Lodge> {
    await delay()
    const item: Lodge = { ...data, id: `l${Date.now()}` }
    const list = getStored()
    list.push(item)
    save(list)
    return item
  },

  async updateLodge(id: string, data: Partial<Lodge>): Promise<Lodge> {
    await delay()
    const list = getStored()
    const idx = list.findIndex((l) => l.id === id)
    if (idx === -1) throw new Error('Lodge not found')
    list[idx] = { ...list[idx], ...data }
    save(list)
    return list[idx]
  },

  async deleteLodge(id: string): Promise<void> {
    await delay()
    save(getStored().filter((l) => l.id !== id))
  },
}
