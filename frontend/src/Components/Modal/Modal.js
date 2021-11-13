import './modal.css';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className="container">
      <div className={showHideClassName}>
        <section className="modal-main">
        <i className="fa fa-times addToCartSymbol" onClick={handleClose} style={{color:"#255900",fontSize: "24px" }}></i>
          {children}
          {/* <button type="button" onClick={handleClose} className="">
            Close
          </button> */}
        </section>
      </div>
    </div>
    
  );
};

export default Modal;