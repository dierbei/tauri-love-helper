import { User, ChatPreview, SocialPost } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: '小雨',
    avatar: '/images/avatar-1.png', //'https://randomuser.me/api/portraits/women/1.jpg',
    gender: 'female',
    age: 24,
    description: '温柔善良，喜欢阅读和烹饪',
    tags: ['文学', '烹饪', '音乐'],
    images: [
      '/images/photo-1.jpg', // 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      '/images/photo-2.jpg' // 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg'
    ]
  },
  {
    id: '2',
    name: '阳阳',
    avatar: '/images/avatar-3.png', //'https://randomuser.me/api/portraits/men/2.jpg',
    gender: 'male',
    age: 27,
    description: '阳光开朗，热爱运动和旅行',
    tags: ['健身', '旅行', '摄影'],
    images: [
      '/images/photo-3.jpg', // 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg',
      '/images/photo-2.jpg' // 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg'
    ]
  },
  {
    id: '3',
    name: '小楠',
    avatar: '/images/avatar-2.png', //'https://randomuser.me/api/portraits/women/3.jpg',
    gender: 'female',
    age: 23,
    description: '活泼可爱，喜欢动漫和游戏',
    tags: ['动漫', '游戏', '电影'],
    images: [
      '/images/post-1.jpg', // 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg',
      '/images/post-2.jpg' // 'https://images.pexels.com/photos/1090387/pexels-photo-1090387.jpeg'
    ]
  },
  {
    id: '4',
    name: '亮亮',
    avatar: '/images/avatar-4.png', //'https://randomuser.me/api/portraits/men/4.jpg',
    gender: 'male',
    age: 26,
    description: '稳重可靠，喜欢音乐和电影',
    tags: ['音乐', '电影', '咖啡'],
    images: [
      '/images/post-3.jpg', // 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
      '/images/post-4.jpg' // 'https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg'
    ]
  },
  {
    id: '5',
    name: '甜甜',
    avatar: '/images/avatar-2.png', //'https://randomuser.me/api/portraits/women/5.jpg',
    gender: 'female',
    age: 25,
    description: '甜美可人，喜欢美食和旅行',
    tags: ['美食', '旅行', '购物'],
    images: [
      '/images/post-2.jpg', // 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg',
      '/images/post-3.jpg' // 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg'
    ]
  },
  {
    id: '6',
    name: '小明',
    avatar: '/images/avatar-3.png', //'https://randomuser.me/api/portraits/men/6.jpg',
    gender: 'male',
    age: 29,
    description: '幽默风趣，喜欢运动和户外活动',
    tags: ['足球', '爬山', '摄影'],
    images: [
      '/images/post-1.jpg', // 'https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg',
      '/images/post-4.jpg' // 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'
    ]
  }
];

export const mockChatPreviews: ChatPreview[] = [
  {
    userId: '1',
    userName: '小雨',
    userAvatar: '/images/avatar-1.png', //'https://randomuser.me/api/portraits/women/1.jpg',
    lastMessage: '好的，明天见！',
    timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
    unread: 0
  },
  {
    userId: '3',
    userName: '小楠',
    userAvatar: '/images/avatar-2.png', //'https://randomuser.me/api/portraits/women/3.jpg',
    lastMessage: '你喜欢什么类型的游戏？',
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    unread: 2
  },
  {
    userId: '5',
    userName: '甜甜',
    userAvatar: '/images/avatar-2.png', //'https://randomuser.me/api/portraits/women/5.jpg',
    lastMessage: '我刚发现一家很棒的咖啡店！',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    unread: 1
  }
];

export const mockSocialPosts: SocialPost[] = [
  {
    id: '1',
    userId: '1',
    userName: '小雨',
    userAvatar: '/images/avatar-1.png', //'https://randomuser.me/api/portraits/women/1.jpg',
    content: '今天天气真好，去公园散步了~',
    images: ['https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    likes: 12,
    comments: [
      {
        id: 'c1',
        userId: '4',
        userName: '亮亮',
        userAvatar: '/images/avatar-4.png', //'https://randomuser.me/api/portraits/men/4.jpg',
        content: '照片拍得真美！',
        createdAt: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
      }
    ]
  },
  {
    id: '2',
    userId: '3',
    userName: '小楠',
    userAvatar: '/images/avatar-2.png', //'https://randomuser.me/api/portraits/women/3.jpg',
    content: '推荐一部超好看的动漫《间谍家家酒》！',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    likes: 8,
    comments: []
  },
  {
    id: '3',
    userId: '5',
    userName: '甜甜',
    userAvatar: '/images/avatar-2.png', //'https://randomuser.me/api/portraits/women/5.jpg',
    content: '尝试了一家新开的甜品店，超级好吃！强烈推荐~',
    images: [
      'https://images.pexels.com/photos/1291712/pexels-photo-1291712.jpeg'
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    likes: 15,
    comments: [
      {
        id: 'c2',
        userId: '1',
        userName: '小雨',
        userAvatar: '/images/avatar-1.png', //'https://randomuser.me/api/portraits/women/1.jpg',
        content: '看起来好美味！在哪里？',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4) // 4 hours ago
      },
      {
        id: 'c3',
        userId: '5',
        userName: '甜甜',
        userAvatar: '/images/avatar-2.png', //'https://randomuser.me/api/portraits/women/5.jpg',
        content: '在城市广场附近，下次一起去吧！',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3.5) // 3.5 hours ago
      }
    ]
  }
];