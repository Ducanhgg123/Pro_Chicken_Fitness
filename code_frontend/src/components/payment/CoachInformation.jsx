function CoachInformation({ coach }) {
  return (
    <div>
      <h2>Coach Information</h2>
      <ul>
        <li>
          <strong>Full Name:</strong> {coach?.fullname || "Empty"}
        </li>
        <li>
          <strong>Address:</strong> {coach?.address || "Empty"}
        </li>
        <li>
          <strong>Email:</strong> {coach?.email || "Empty"}
        </li>
        <li>
          <strong>Phone Number:</strong> {coach?.phoneNumber || "Empty"}
        </li>
        <li>
          <strong>Height:</strong> {coach?.height || "Empty"}
        </li>
        <li>
          <strong>Weight:</strong> {coach?.weight || "Empty"}
        </li>
        <li>
          <strong>Date of Birth:</strong> {coach?.date || "Empty"}
        </li>
        <li>
          <strong>Gender:</strong> {coach?.gender || "Empty"}
        </li>
        <li>
          <strong>Avatar:</strong> {coach?.avatar || "Empty"}
        </li>
        <li>
          <strong>Description:</strong> {coach?.description || "Empty"}
        </li>
        <li>
          <strong>Price:</strong> {coach?.price || "Empty"}
        </li>
      </ul>
    </div>
  );
}

export default CoachInformation;
