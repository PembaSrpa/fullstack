import { db } from "../database/db.js";
import bcrypt from "bcryptjs";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CRUD~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

export const postUser = (req, res) => {
    const { name, email, password, address, age, phone } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPw = bcrypt.hashSync(password, salt);
    const q =
        "insert into exampleusers ( name, email, password, address, age, phone) values (?, ?, ?, ?, ?, ?)";
    db.query(
        q,
        [name, email, hashedPw, address, age, phone],
        (error, result) => {
            if (error) return res.send(error);
            return res.send({
                message: "User has been created",
                result,
            });
        }
    );
};

export const getUser = (req, res) => {
    const r = "SELECT * FROM exampleusers";

    db.query(r, (error, result) => {
        if (error) return res.status(500).send(error);
        return res.status(200).send(result);
    });
};

export const getSingleUser = (req, res) => {
    const id = req.params.id;
    const r = "SELECT * FROM exampleusers WHERE id = ?";
    db.query(r, [id], (error, result) => {
        if (error) return res.status(500).send(error);
        return res.status(200).send(result[0]);
    });
}; // Get a single user by ID

export const deleteUser = (req, res) => {
    const id = req.params.id;
    const r = "DELETE FROM exampleusers WHERE id = ?";
    db.query(r, [id], (error, result) => {
        if (error) return res.status(500).send(error);
        return res.status(200).send("User has been deleted");
    });
};

export const updateUser = (req, res) => {
    const id = req.params.id;
    const { name, email, password, address, age, phone } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPw = bcrypt.hashSync(password, salt);
    const r =
        "UPDATE exampleusers SET name = ?, email = ?, password = ?, address = ?, age = ?, phone = ? WHERE id = ?";
    db.query(
        r,
        [name, email, hashedPw, address, age, phone, id],
        (error, result) => {
            if (error) return res.status(500).send(error);
            if (result.affectedRows === 0) {
                return res.status(404).send("User not found");
            }
            return res.status(200).send({
                message: "User has been updated",
                result,
            });
        }
    );
};

export const checkUserLogin = (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    const q = "SELECT * FROM exampleusers WHERE email = ?";
    db.query(q, [email], (error, result) => {
        if (error) return res.status(500).send(error);
        if (result.length === 0) {
            return res.status(401).send({
                message: "Login unsuccessful",
                error: "Email doesn't exist",
            });
        }
        const isPasswordCorrect = bcrypt.compareSync(
            password,
            result[0].password
        );
        if (isPasswordCorrect) {
            const { password, ...user } = result[0];
            return res.status(200).send({
                message: "Login successful",
                user: user,
            });
        }
        return res.status(401).send({
            message: "Login unsuccessful",
            error: "Invalid password",
        });
    });
}; // Check login
