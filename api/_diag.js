export default function handler(req, res) {
    res.status(200).json({
        hasHash: !!process.env.ADMIN_PASSWORD_HASH,
        hasAccess: !!process.env.JWT_ACCESS_SECRET,
        hasRefresh: !!process.env.JWT_REFRESH_SECRET
    });
}