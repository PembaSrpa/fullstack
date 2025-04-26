export const checkUser = (req, res, next) => {
    const { name, address, email, password, age, phone } = req.body;
    if (!name || !email || !password || !address || !age || !phone) {
        return res.status(400).json({ message: "All fields are required" });
    } else {
        next();
    }
};
