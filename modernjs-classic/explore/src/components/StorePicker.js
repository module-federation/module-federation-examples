import data from '../database/index';
import { src, srcset } from '../utils';
import Button from './Button';
import './StorePicker.css';

const StorePicker = () => {
  return (
    <div className="e_StorePicker">
      <div
        className="e_StorePicker_control"
        data-boundary="explore-storepicker"
      >
        <div className="e_StorePicker_selected"></div>
        <Button className="e_StorePicker_choose" type="button">
          choose a store
        </Button>
      </div>
      <dialog
        className="e_StorePicker_dialog"
        data-boundary="explore-storepicker (dialog)"
      >
        <div className="e_StorePicker_wrapper">
          <h2>Stores</h2>
          <ul className="e_StorePicker_list">
            {data.stores.map(s => (
              <li className="e_StorePicker_entry" key={s.id}>
                <div className="e_StorePicker_content">
                  <img
                    className="e_StorePicker_image"
                    src={src(s.image, 200)}
                    srcSet={srcset(s.image, [200, 400])}
                    width="200"
                    height="200"
                    alt={s.name}
                  />
                  <p className="e_StorePicker_address">
                    {s.name}
                    <br />
                    {s.street}
                    <br />
                    {s.city}
                  </p>
                </div>
                <Button
                  className="e_StorePicker_select"
                  type="button"
                  data-id={s.id}
                >
                  select
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </div>
  );
};

export default StorePicker;
