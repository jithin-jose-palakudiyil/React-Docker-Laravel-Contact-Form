 

function Input({ label,InputId,ErrID ,handleChange,importInput=null}) {
  
  return (
    <div className="form-label-group">
      <label>{label} <span className='star'>*</span></label>
      <input 
      type="text" 
      id={InputId}
      name={InputId}
      className="form-control"
      placeholder="" 
      onChange={(e) => handleChange(e)}
      />
      
      <div id={ErrID} className="form-error "></div>
    </div>  
  );
}

export default Input;
