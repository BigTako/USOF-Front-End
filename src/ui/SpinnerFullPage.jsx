function SpinnerFullPage() {
  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{ height: "60rem" }}
    >
      <div className="d-flex justify-content-center">
        <div
          className="spinner-border"
          style={{ height: "11.2rem", width: "11.2rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
}
export default SpinnerFullPage;
