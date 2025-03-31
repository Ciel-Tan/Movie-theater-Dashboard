import "@/styles/manage-account.css"

const ManageAccount = () => {
    return (
        <table className="container">
            <thead>
                <tr>
                    <th>Action</th>
                    <th>Restaurant Name</th>
                    <th>Invoice Frequency</th>
                    <th>Billing Type</th>
                    <th>Biller Name</th>
                    <th>Billing Email</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><span class="edit-icon">📝</span></td>
                    <td>CurryPizza Utah</td>
                    <td>Monthly</td>
                    <td>First day of the week</td>
                    <td>Parth Kansara Test</td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="edit-icon">📝</span></td>
                    <td>Texas Roadhouse</td>
                    <td>Weekly</td>
                    <td>Last date of every month</td>
                    <td>Parth Kansara</td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="edit-icon">📝</span></td>
                    <td>Olive Garden</td>
                    <td>Monthly</td>
                    <td>First date of every month</td>
                    <td>Parth Kansara</td>
                    <td>rajatsthakur@gmail.com</td>
                </tr>
                <tr>
                    <td><span class="edit-icon">📝</span></td>
                    <td>Namaste Markets</td>
                    <td>Weekly</td>
                    <td>Last date of every month</td>
                    <td>Parth Kansara</td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="edit-icon">📝</span></td>
                    <td>Haveli</td>
                    <td>Monthly</td>
                    <td>First day of the week</td>
                    <td>Parth Kansara</td>
                    <td>rajatsthakur@gmail.com</td>
                </tr>
                <tr>
                    <td><span class="edit-icon">📝</span></td>
                    <td>Royal India</td>
                    <td>Monthly</td>
                    <td>First day of the week</td>
                    <td>Parth Kansara</td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="edit-icon">📝</span></td>
                    <td>Royal India Bountiful</td>
                    <td>Weekly</td>
                    <td>Last day of the week</td>
                    <td>Parth Kansara</td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="edit-icon">📝</span></td>
                    <td>Anupam</td>
                    <td>Monthly</td>
                    <td>First date of every month</td>
                    <td>Parth Kansara</td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="edit-icon">📝</span></td>
                    <td>Stan's Restaurant</td>
                    <td>Weekly</td>
                    <td>Last date of every month</td>
                    <td>Parth Kansara</td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="edit-icon">📝</span></td>
                    <td>Pozzetto Italian Dining</td>
                    <td>Weekly</td>
                    <td>Last day of the week</td>
                    <td>Parth Kansara</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    );
}
 
export default ManageAccount;