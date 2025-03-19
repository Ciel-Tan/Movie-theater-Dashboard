import api from "@/utils/axios";

export const accountService = {
    async getAllAccounts() {
        try {
            const { data: accounts } = await api.get("/api/accounts/getAll");
            return accounts;
        }
        catch (error) {
            console.error("Error getting all accounts in getAllAccounts service:", error);
            throw error;
        }
    },
    
    async getAccountById(account_id) {
        try {
            const { data: account } = await api.get(`/api/accounts/${account_id}`);
            return account;
        }
        catch (error) {
            console.error("Error getting account by id in getAccount service:", error);
            throw error;
        }
    },

    async forgotPassword(email) {
        try {
            const { data: response } = await api.post("/api/accounts/forgot-password", { email });
            return response.message;
        }
        catch (error) {
            console.error("Error sending forgot password email in forgotPassword service:", error);
            throw error;
        }
    }
}