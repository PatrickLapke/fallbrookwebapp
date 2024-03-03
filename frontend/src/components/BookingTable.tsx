export default function BookingTable() {
  return (
    <div className="container">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Wed 03/02</th>
            <th>Thur 03/03</th>
            <th>Fri 04/04</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="available-cell">8:00 AM</td>
            <td>8:00 AM</td>
            <td>8:00 AM</td>
          </tr>
          <tr>
            <td className="booked-cell">8:00 AM</td>
            <td>8:00 AM</td>
            <td>8:00 AM</td>
          </tr>
          <tr>
            <td>8:00 AM</td>
            <td>8:00 AM</td>
            <td>8:00 AM</td>
          </tr>
          <tr>
            <td>8:00 AM</td>
            <td>8:00 AM</td>
            <td>8:00 AM</td>
          </tr>
          <tr>
            <td>8:00 AM</td>
            <td>8:00 AM</td>
            <td>8:00 AM</td>
          </tr>
          <tr>
            <td>8:00 AM</td>
            <td>8:00 AM</td>
            <td>8:00 AM</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
