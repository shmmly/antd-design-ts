import { MenuType } from './../../typeing/index'
import { getFlatMenuKeys } from './utils';
const menu: MenuType[] = [
  {
    path: '/dashboard',
    children: [
      {
        path: '/dashboard/name'
      }
    ]
  },
  {
    path: '/userInfo',
    children: [
      {
        path: '/userInfo/:id',
        children: [
          {
            path: '/userInfo/:id/info'
          }
        ]
      }
    ]
  }
]

const flatMenKeys = getFlatMenuKeys(menu)

describe('test convert nested menu to flat menu',()=>{
    it('flat menu',()=>{
        expect(flatMenKeys).toEqual([
            '/dashboard',
            '/dashboard/name',
            '/userInfo',
            '/userInfo/:id',
            '/userInfo/:id/info'
        ])
    })
})
