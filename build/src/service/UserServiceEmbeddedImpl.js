export class UserServiceEmbeddedImpl {
    constructor() {
        this.users = [{ id: 1, userName: "Bond" }];
    }
    addUser(user) {
        if (this.users.findIndex((u) => u.id === user.id) === -1) {
            this.users.push(user);
            return true;
        }
        return false;
    }
    getAllUsers() {
        return [...this.users];
    }
    getUser(userId) {
        return this.users.find(user => user.id === userId) || null;
    }
    removeUser(userId) {
        const index = this.users.findIndex(user => user.id === userId);
        if (index !== -1) {
            const res = this.users.splice(index, 1);
            return res[0];
        }
        return null;
    }
    updateUser(newUserData) {
        const index = this.users.findIndex(user => user.id === newUserData.id);
        if (index !== -1) {
            this.users[index] = newUserData;
            return true;
        }
        return false;
    }
}
;
