import { useState } from "react";
import { MdOutlineAccountCircle } from "react-icons/md";

const ProfileRightCard = () => {
    const [clickChangePassword, setClickChangePassword] = useState(false);

    return (
        <div className="rightLogoutSec">
            <div className="topAccountBox">
                <h2 className="flex flex-sb">
                    My Account <MdOutlineAccountCircle />
                </h2>
                <hr />
                <div className="flex flex-sb mt-1">
                    <h3>Active Account <br /><span></span></h3>
                    <button onClick={() => setClickChangePassword(!clickChangePassword)}>
                        {clickChangePassword ? "Save" : "Change Password"}
                    </button>
                </div>

                {clickChangePassword && (
                    <div className="flex flex-sb mt-2">
                        <h3>Current Password:</h3>
                        <input type="password" placeholder="Current Password" className="inputPassword" />
                    </div>
                )}

                {clickChangePassword && (
                    <div className="flex flex-sb mt-2">
                        <h3>New Password:</h3>
                        <input type="password" placeholder="New Password" className="inputPassword" />
                    </div>
                )}

                {clickChangePassword && (
                    <div className="flex flex-sb mt-2">
                        <h3>Confirm Password:</h3>
                        <input type="password" placeholder="Confirm Password" className="inputPassword" />
                    </div>
                )}
            </div>
        </div>
    );
}
 
export default ProfileRightCard;