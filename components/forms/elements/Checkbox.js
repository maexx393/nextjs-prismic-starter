import { useState } from "react";
import { Icons } from '@components/index';

const Checkbox = (props) => {
  const [validationState, setValidationState] = useState(null);
    
  const handleChange = e => {
    let valid = true;
    if(props.validation) {
        valid = props.validation(e.target.checked)
        setValidationState(valid)
    }
    props.handler(e, valid)
}



  return (
      <div className={`form-checkbox form-${[props.name]} checkbox-switch checkbox-marker`}>
        <label className={props.hasFormValidationError ? 'has-error' : ''}>
          <input 
            type="checkbox" 
            name={props.name}
            checked={props.checked}
            value={props.value}
            onChange={handleChange}
          
          />
          {/* <span className="switch"></span> */}
          <span className="marker">
              <Icons
                  name="check"
                  width="10"
                  height="10"
              />
          </span>
          {props.label}
        </label>
    
        {props.hasFormValidationError &&
              <>
                  <span className="input-error-message">
                      {props.errorMessage}
                  </span>
              </>
          }

      </div>
  )
}
export default Checkbox