import jwt from 'jsonwebtoken';
export const Token = (tk) => {
    return jwt.sign({
        _id: tk.id,
        username: tk.username,
        fullName: tk.fullName,
        avatar: tk.avatar,
        role: tk.role,
    }, process.env.JWT_BIMAT,
    {
        expiresIn: '1d',
    });
}