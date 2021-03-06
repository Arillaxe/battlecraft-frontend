import {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import './uploadImage.sass';

const UploadImage = (props, ref) => {
  const {
    id,
    label,
    onChange,
    multiple = false,
    className,
  } = props;
  const [file, setFile] = useState('');
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    clear: () => {
      inputRef.current.value = '';
      setFile('');
    },
  }));

  const onChangeLocal = (e) => {
    if (multiple) {
      setFile(e.target.files);
      onChange(e.target.files);
    } else {
      setFile(e.target.files[0]);
      onChange(e.target.files[0]);
    }
  };

  const name = file && file.length ? Array.from(file).map((f) => f.name).join(',') : (file ? file.name : '');
  const fileName = name ? (name.length > 20 ? `${name.slice(0, 20)}...` : name) : 'Выбрать';

  return (
    <div className={`uploadImage ${className}`}>
      <input ref={inputRef} id={id} type="file" accept="image/jpeg,image/png" onChange={onChangeLocal} multiple={multiple} />
      <label htmlFor={id}>
        <div className="uploadImage-button">{label}</div>
      </label>
    </div>
  );
};

export default forwardRef(UploadImage);
