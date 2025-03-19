import { decodeToken } from "@/utils/decodeToken";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

const accountContext = createContext();

export function useAccountContext() {
    return useContext(accountContext);
}

export function AccountProvider({ children }) {
    const [account_id, setAccountId] = useState(null);

    useEffect(() => {
        const fetchAccountId = async () => {
            const token = Cookies.get("token");
            if (token) {
                try {
                    const payload = await decodeToken(token);
                    setAccountId(payload.account_id);
                }
                catch (error) {
                    console.error("Token decoding failed:", error);
                    setAccountId(null);
                }
            }
        };
        fetchAccountId();
    }, []);

    return (
        <accountContext.Provider value={account_id}>
            {children}
        </accountContext.Provider>
    );
}