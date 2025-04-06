const HeaderTitle = (props) => {
    const { status, movieInfo } = props;
    
    return ( 
        <div className={`titleDashboard flex flex-sb`}>
            <div className="mb-2">
                <h2>{status} movie: <span>{movieInfo?.title}</span></h2>
                <h3>ADMIN PANEL</h3>
            </div>
        </div>
    );
}
 
export default HeaderTitle;