import styled from 'styled-components';

function Input({ label, type = "text", name, value, onChange }) {
  return (
    <StyledWrapper>
      <div className="wave-group">
        <input
          required
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="input"
        />
        <span className="bar" />
        <label className="label">
          {label.split("").map((char, index) => (
            <span
              className="label-char"
              key={index}
              style={{ "--index": index }}
            >
              {char}
            </span>
          ))}
        </label>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .wave-group {
    position: relative;
    margin-bottom: 2rem;
  }

  .wave-group .input {
    font-size: 16px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 100%;
    border: none;
    border-bottom: 2px solid #ff971d;
    background: transparent;
  }

  .wave-group .input:focus {
    outline: none;
  }

  .wave-group .label {
    color: #999;
    font-size: 18px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    display: flex;
  }

  .wave-group .label-char {
    transition: 0.2s ease all;
    transition-delay: calc(var(--index) * 0.05s);
  }

  .wave-group .input:focus ~ .label .label-char,
  .wave-group .input:valid ~ .label .label-char {
    transform: translateY(-20px);
    font-size: 14px;
    color: #ff971d;
  }

  .wave-group .bar {
    position: relative;
    display: block;
    width: 100%;
  }

  .wave-group .bar:before,
  .wave-group .bar:after {
    content: "";
    height: 2px;
    width: 0;
    bottom: 1px;
    position: absolute;
    background: #ff971d;
    transition: 0.2s ease all;
  }

  .wave-group .bar:before {
    left: 50%;
  }

  .wave-group .bar:after {
    right: 50%;
  }

  .wave-group .input:focus ~ .bar:before,
  .wave-group .input:focus ~ .bar:after {
    width: 50%;
  }
`;

export default Input;
