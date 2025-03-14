import { accountContext } from "@/context/accountContext";
import { useGetAccount } from "@/hooks/useGetAccount";
import { useContext } from "react";
import Spinner from "../layout/Spinner";

const ProfileLeftCard = () => {
    const account_id = useContext(accountContext);
    const { account, loading, error } = useGetAccount(account_id);

    return ( 
        loading ? <Spinner/> : error ? <span className="error">{error}</span> : (
            <div className="leftProfile_details flex">
                <img src="/image/ZeroTwo-copy.jpg" alt="profile" />
                <div className="w-100">
                    <div className="flex flex-sb flex-left mt-2">
                        <h2>My Profile</h2>
                        <h3>CielTan <br />002 CielTan</h3>
                    </div>
                    <div className="flex flex-sb mt-2">
                        <h3>Phone</h3>
                        <input type="text" value={account.phone_number} onChange={(e) => console.log(e.target.value)}/>
                    </div>
                    <div className="mt-3">
                        <input type="email" value={account.email} onChange={(e) => console.log(e.target.value)}/>
                    </div>
                    <div className="flex flex-center w-100 mt-2">
                        <button>Save</button>
                    </div>
                </div>
            </div>
        )
    );
}

export default ProfileLeftCard;