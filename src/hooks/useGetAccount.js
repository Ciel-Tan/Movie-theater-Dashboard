'use client'

import { accountService } from "@/services/accountService";
import { useEffect, useState } from "react";

export const useGetAccount = (account_id) => {
    const [account, setAccount] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getAccounts = async () => {
        setLoading(true);
        try {
            const accounts = await accountService.getAllAccounts();
            setAccount(accounts);
        }
        catch (error) {
            console.error("Error get all accounts: ", error);
            setError("Failed to get all accounts");
        }
        finally {
            setLoading(false);
        }
    }

    const getAccountDetail = async () => {
        setLoading(true);
        try {
            const account = await accountService.getAccountById(account_id);
            setAccount(account);
        }
        catch (error) {
            console.error("Error get account by id: ", error);
            setError("Failed to get account by id");
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        account_id ? getAccountDetail() : getAccounts();
    }, []);

    return { account, loading, error };
}