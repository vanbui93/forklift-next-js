export const ADMIN_ROUTES = [
    {
        path: '/dashboard/main',
        name: 'Trang quản trị',
    },
    {
        path: '/dashboard/order',
        name: 'Đơn hàng',
    },
    {
        path: '/dashboard/contact',
        name: 'Danh sách liên hệ',
    },
    {
        path: '/dashboard/product',
        name: 'Sản phẩm',
    },
    {
        path: '/dashboard/collection',
        name: 'Nhóm sản phẩm',
    },
    {
        path: '/dashboard/page',
        name: 'Page',
    },
    {
        path: '/dashboard/blogs',
        name: 'Bài viết',
    },
    {
        path: '/dashboard/menu',
        name: 'Menu',
    },
    {
        path: '/dashboard/home_slide',
        name: 'Hình slide trang chủ',
    },
    {
        path: '/dashboard/video',
        name: 'Video',
    },
    {
        path: '/dashboard/user',
        name: 'Tài khoản',
    },
    {
        path: '/dashboard/media',
        name: 'Tệp tin - hình ảnh đã tải',
    },
]

export const RULES = [
    {
        field: 'contact_email',
        method: 'isEmpty',
        validWhen: false,
        message: 'This field is required',
    },
    {
        field: 'contact_message',
        method: 'isEmpty',
        validWhen: false,
        message: 'This field is required',
    },
]
