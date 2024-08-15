import { Request, Response, Router } from "express";
import { createUser, getUsers, getUsersById, removeUser } from "./usersService";
import { UserDTO } from "./dtos/userDTO";
import { NotFoundExeception } from "@exceptions/notFoundException";
import { ReturnError } from "@exceptions/dtos/exceptionDTO";
import { UserModeles } from "./usersModules";
import { Console } from "console";
import { verifyToken } from "@utils/authUtils";
import { authMiddleware } from "src/middleware/authMiddleware";

const getUserList = async (req: Request, res: Response): Promise<void> => {
    const user = await getUsers().catch((error) => {
        if (error instanceof NotFoundExeception) {
            res.status(204);
        } else {
            new ReturnError(res, error);
        }
    });
    res.send(user);
};

const getUserById = async (
    req: Request<undefined, undefined, UserModeles>,
    res: Response
): Promise<void> => {
    const user = await getUsersById(req.body.id).catch((error) => {
        if (error instanceof NotFoundExeception) {
            res.status(204);
        } else {
            new ReturnError(res, error);
        }
    });
    res.send(user);
};

const insertUser = async (
    req: Request<undefined, undefined, UserDTO>,
    res: Response
): Promise<void> => {
    const user = await createUser(req.body).catch((error) => {
        new ReturnError(res, error);
    });
    res.send(user);
};

const deleteUser = async (
    req: Request<undefined, undefined, UserDTO>,
    res: Response
): Promise<void> => {
    const user = await removeUser(req.body).catch((error) => {
        new ReturnError(res, error);
    });
    res.send(user);
};

const userRouter = Router();

const router = Router();

userRouter.use("/users", router);

router.use(authMiddleware);

router.get("/userlist", getUserList);

router.get("/user", getUserById);

router.post("/create", insertUser);

router.delete("/delete", deleteUser);

export default userRouter;
