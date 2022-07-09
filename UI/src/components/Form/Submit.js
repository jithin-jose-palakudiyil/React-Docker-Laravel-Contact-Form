
function Submit({ disabledAction,buttonText,onClickAction}) {

  return (
    <div>
      <input type="submit" disabled={disabledAction} value={buttonText} onClick={onClickAction} />
    </div>
  );
}

export default Submit;
