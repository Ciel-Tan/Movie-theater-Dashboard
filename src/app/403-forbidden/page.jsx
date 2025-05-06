import '@/styles/403forbidden.css';

const UnauthorizedPage = () => {
    return (
        <div className="forbidden">
            <div className="lock"></div>
            <div className="message">
                <h1 className="forbidden-text">Access to this page is restricted</h1>
                <p>Please check with the site admin if you believe this is a mistake.</p>
            </div>
        </div>
    );
}
 
export default UnauthorizedPage;