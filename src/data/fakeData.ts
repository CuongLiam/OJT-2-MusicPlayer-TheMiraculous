
import { type Banner, type Statistics } from '../types/admin.types';
import { type ApiResponse } from '../types/api.types';
import { type User, type AuthResponse, RoleName, UserStatus } from '../types/auth.types';
import { type SongHistory } from '../types/history.types';
import { type Playlist, type Comment, type Wishlist } from '../types/interaction.types';
import { type Genre, type Song, type Album, AlbumType } from '../types/music.types';
import { type Payment, PaymentMethod, PaymentStatus } from '../types/payment/payment.types';
import { type Subscription, SubscriptionPlan, SubscriptionStatus } from '../types/payment/subscription.types';

export const fakeBanners: Banner[] = [
  { id: 1, url: 'https://example.com/banner1.jpg', position: 'top' },
  { id: 2, url: 'https://example.com/banner2.jpg', position: 'bottom' },
];

export const fakeStatistics: Statistics = {
  totalUsers: 1000,
  activeUsers: 800,
  blockedUsers: 50,
  totalSongs: 5000,
  totalAlbums: 500,
  revenue: 10000,
};

export const fakeUsers: User[] = [
  {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    profile_image: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    bio: 'Music lover',
    status: UserStatus.ACTIVE,
    roles: [RoleName.ROLE_USER],
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
  },
  {
    id: 2,
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane.smith@example.com',
    profile_image: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    bio: 'Artist and singer',
    status: UserStatus.ACTIVE,
    roles: [RoleName.ROLE_ARTIST, RoleName.ROLE_USER],
    created_at: '2023-02-01T00:00:00Z',
    updated_at: '2023-02-01T00:00:00Z',
  },
    {
    id: 3,
    first_name: 'Admin',
    last_name: 'User',
    email: 'admin@example.com',
    profile_image: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
    bio: 'Administrator',
    status: UserStatus.ACTIVE,
    roles: [RoleName.ROLE_ADMIN],
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
  },
];

export const fakeAuthResponse: AuthResponse = {
  accessToken: 'fake-jwt-token',
  user: fakeUsers[0],
};


export const fakeGenres: Genre[] = [
    { id: 1, genre_name: 'Rock' },
    { id: 2, genre_name: 'Pop' },
    { id: 3, genre_name: 'Jazz' },
    { id: 4, genre_name: 'Classical' },
];

export const fakeAlbums: Album[] = [
    {
        id: 1,
        title: 'Rock Anthems',
        release_date: '2022-01-01',
        artist_id: 2,
        cover_image: 'https://picsum.photos/seed/picsum/200/200',
        type: AlbumType.PREMIUM,
        created_at: '2022-01-01T00:00:00Z',
        updated_at: '2022-01-01T00:00:00Z',
    },
    {
        id: 2,
        title: 'Pop Hits',
        release_date: '2023-05-10',
        artist_id: 2,
        cover_image: 'https://picsum.photos/seed/picsum/200/200',
        type: AlbumType.FREE,
        created_at: '2023-05-10T00:00:00Z',
        updated_at: '2023-05-10T00:00:00Z',
    }
]

export const fakeSongs: Song[] = [
  {
    id: 1,
    title: 'Bohemian Rhapsody',
    duration: '00:05:55',
    album_id: 1,
    file_url: 'https://example.com/bohemian-rhapsody.mp3',
    views: 1000000,
    created_at: '2022-01-01T00:00:00Z',
    updated_at: '2022-01-01T00:00:00Z',
    genres: [fakeGenres[0]],
    artist_name: 'Jane Smith',
  },
  {
    id: 2,
    title: 'Stairway to Heaven',
    duration: '00:08:02',
    album_id: 1,
    file_url: 'https://example.com/stairway-to-heaven.mp3',
    views: 900000,
    created_at: '2022-01-01T00:00:00Z',
    updated_at: '2022-01-01T00:00:00Z',
    genres: [fakeGenres[0]],
    artist_name: 'Jane Smith',
  },
  {
    id: 3,
    title: 'Shape of You',
    duration: '00:03:53',
    album_id: 2,
    file_url: 'https://example.com/shape-of-you.mp3',
    views: 1500000,
    created_at: '2023-05-10T00:00:00Z',
    updated_at: '2023-05-10T00:00:00Z',
    genres: [fakeGenres[1]],
    artist_name: 'Jane Smith',
  },
];


export const fakeSongHistory: SongHistory[] = [
  { user_id: 1, song_id: 1, played_at: '2023-10-01T10:00:00Z' },
  { user_id: 1, song_id: 2, played_at: '2023-10-01T10:05:55Z' },
  { user_id: 2, song_id: 3, played_at: '2023-10-02T11:00:00Z' },
];

export const fakePlaylists: Playlist[] = [
  {
    id: 1,
    name: 'My Rock Favorites',
    user_id: 1,
    is_public: true,
    created_at: '2023-03-01T00:00:00Z',
    updated_at: '2023-03-01T00:00:00Z',
    songs: [fakeSongs[0], fakeSongs[1]],
  },
  {
    id: 2,
    name: 'Pop Party',
    user_id: 2,
    is_public: false,
    created_at: '2023-06-01T00:00:00Z',
    updated_at: '2023-06-01T00:00:00Z',
    songs: [fakeSongs[2]],
  },
];

export const fakeComments: Comment[] = [
  {
    id: 1,
    user_id: 1,
    song_id: 1,
    content: 'This is a masterpiece!',
    created_at: '2023-10-01T12:00:00Z',
    user_name: 'John Doe',
  },
  {
    id: 2,
    user_id: 2,
    song_id: 1,
    content: 'I agree!',
    parent_id: 1,
    created_at: '2023-10-01T12:05:00Z',
    user_name: 'Jane Smith',
  },
];

export const fakeWishlist: Wishlist[] = [
    { user_id: 1, song_id: 3 },
    { user_id: 2, song_id: 1 },
]

export const fakePayments: Payment[] = [
  {
    id: 1,
    user_id: 1,
    plan_id: 1,
    transaction_id: 'txn_123456789',
    amount: 9.99,
    payment_method: PaymentMethod.CREDIT_CARD,
    payment_status: PaymentStatus.COMPLETED,
    payment_date: '2023-09-01T00:00:00Z',
  },
  {
    id: 2,
    user_id: 2,
    plan_id: 2,
    transaction_id: 'txn_987654321',
    amount: 19.99,
    payment_method: PaymentMethod.PAYPAL,
    payment_status: PaymentStatus.COMPLETED,
    payment_date: '2023-08-15T00:00:00Z',
  },
];

export const fakeSubscriptions: Subscription[] = [
  {
    id: 1,
    user_id: 1,
    plan: SubscriptionPlan.PREMIUM,
    start_time: '2023-09-01T00:00:00Z',
    end_time: '2024-09-01T00:00:00Z',
    status: SubscriptionStatus.ACTIVE,
  },
  {
    id: 2,
    user_id: 2,
    plan: SubscriptionPlan.ARTIST,
    start_time: '2023-08-15T00:00:00Z',
    end_time: '2024-08-15T00:00:00Z',
    status: SubscriptionStatus.ACTIVE,
  },
    {
    id: 3,
    user_id: 3,
    plan: SubscriptionPlan.FREE,
    start_time: '2023-01-01T00:00:00Z',
    end_time: '9999-12-31T23:59:59Z',
    status: SubscriptionStatus.ACTIVE,
  },
];

export const fakeApiResponse: ApiResponse<Song[]> = {
    data: fakeSongs,
    message: 'Success',
    status: 200,
    pagination: {
        currentPage: 1,
        totalPages: 1,
        pageSize: 10,
    }
}
