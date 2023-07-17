import Role from './role';

type User = {
    id?: number,
    username: string,
    password: string,
    role?: Role
}

export default User