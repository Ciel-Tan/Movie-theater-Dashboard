import { MdOutlineAccountCircle } from "react-icons/md";

const ProfileRightCard = () => {
    return (
        <div className="rightLogoutSec">
            <div className="topAccountBox">
                <h2 className="flex flex-sb">
                    My Account <MdOutlineAccountCircle />
                </h2>
                <hr />
                <div className="flex flex-sb mt-1">
                    <h3>Active Account <br /><span></span></h3>
                    <button
                        // onClick={signOut}
                    >
                        Change password
                    </button>
                </div>
            </div>
        </div>
    );
}
 
export default ProfileRightCard;