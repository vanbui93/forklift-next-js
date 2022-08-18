import React from "react";
import './../../assets/css/modal.scss';

export default function ModulePopup(props) {
  const { toggleModal } = props;

  return (
    <div className="modal-wrap"
      onClick={() => {
        // close modal when outside of modal is clicked
        toggleModal(false);
      }}
    >
      <div
        className="modal">
        <div className="modal__content"
          // do not close modal if anything inside modal content is clicked
          onClick={(e) => {
            e.stopPropagation();
          }}>
          <div className="modal__header">
            <h4 className="modal__title">Thông số kỹ thuật</h4>
            <button
              type="button"
              className="modal__close"
              onClick={toggleModal}
            >
              Đóng
            </button>
          </div>
          <div className="modal__body">
            <div className="box">
              <div className="box__item">
                <div className="box__title">
                  <strong className="box__title-text">Màn hình</strong>
                </div>
                <div className="box__content">
                  <table>
                    <tbody>
                      <tr>
                        <th>Kích thước màn hình</th>
                        <th>6.1 inches</th>
                      </tr>
                      <tr>
                        <th>Công nghệ màn hình</th>
                        <th>IPS LCD</th>
                      </tr>
                      <tr>
                        <th>Độ phân giải màn hình</th>
                        <th>1792 x 828 pixel</th>
                      </tr>
                      <tr>
                        <th>Tính năng màn hình</th>
                        <th>True-tone</th>
                      </tr>
                      <tr>
                        <th>Tần số quét</th>
                        <th>60Hz</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="box__item">
                <div className="box__title">
                  <strong className="box__title-text">Màn hình</strong>
                </div>
                <div className="box__content">
                  <table>
                    <tbody>
                      <tr>
                        <th>Kích thước màn hình</th>
                        <th>6.1 inches</th>
                      </tr>
                      <tr>
                        <th>Công nghệ màn hình</th>
                        <th>IPS LCD</th>
                      </tr>
                      <tr>
                        <th>Độ phân giải màn hình</th>
                        <th>1792 x 828 pixel</th>
                      </tr>
                      <tr>
                        <th>Tính năng màn hình</th>
                        <th>True-tone</th>
                      </tr>
                      <tr>
                        <th>Tần số quét</th>
                        <th>60Hz</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="box__item">
                <div className="box__title">
                  <strong className="box__title-text">Màn hình</strong>
                </div>
                <div className="box__content">
                  <table>
                    <tbody>
                      <tr>
                        <th>Kích thước màn hình</th>
                        <th>6.1 inches</th>
                      </tr>
                      <tr>
                        <th>Công nghệ màn hình</th>
                        <th>IPS LCD</th>
                      </tr>
                      <tr>
                        <th>Độ phân giải màn hình</th>
                        <th>1792 x 828 pixel</th>
                      </tr>
                      <tr>
                        <th>Tính năng màn hình</th>
                        <th>True-tone</th>
                      </tr>
                      <tr>
                        <th>Tần số quét</th>
                        <th>60Hz</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="box__item">
                <div className="box__title">
                  <strong className="box__title-text">Màn hình</strong>
                </div>
                <div className="box__content">
                  <table>
                    <tbody>
                      <tr>
                        <th>Kích thước màn hình</th>
                        <th>6.1 inches</th>
                      </tr>
                      <tr>
                        <th>Công nghệ màn hình</th>
                        <th>IPS LCD</th>
                      </tr>
                      <tr>
                        <th>Độ phân giải màn hình</th>
                        <th>1792 x 828 pixel</th>
                      </tr>
                      <tr>
                        <th>Tính năng màn hình</th>
                        <th>True-tone</th>
                      </tr>
                      <tr>
                        <th>Tần số quét</th>
                        <th>60Hz</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="modal__footer">
            <button
              type="button"
              className="btn-close"
              data-dismiss="modal"
              onClick={toggleModal}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
