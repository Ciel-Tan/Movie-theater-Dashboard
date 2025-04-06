'use client';

import Loader from "@/components/loading/Loader";
import TableManager from "@/components/table/TableManager";
import { useGetAccount } from "@/hooks/useGetAccount";
import "@/styles/accountManagement.css";
import { calculateAge } from "@/utils/calculateAge";

const AccountManagement = () => {
    const { account, loading, error } = useGetAccount();

    const data = account.map((item) => ({
        "Id": item.account_id,
        "Name": item.full_name,
        "Email": item.email,
        "Gender": item.gender,
        "Age": calculateAge(item.birthday),
        "Id_number": item.id_number,
        "Phone": item.phone_number,
        "Actions": "..."
    }));

    return (
        <div className="managementContainer">
            <div className="managementTitle">
                <h3>Account</h3>
                <p>Manage account settings</p>
            </div>

            <div className="managementTable">
                {loading ? (
                    <Loader />
                ) : error ? (
                    <p className="error">{error}</p>
                ) : (
                    <TableManager data={data} />
                )}
            </div>
        </div>
    );
}
 
export default AccountManagement;