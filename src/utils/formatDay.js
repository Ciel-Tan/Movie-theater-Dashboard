const formatDay = ({ date }) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    
    return `${year}-${month}-${day}`; // ISO format for input type="date"
    // const formattedDate = new Date(date);
    // return formattedDate.toLocaleDateString("en-GB")
}

export default formatDay;